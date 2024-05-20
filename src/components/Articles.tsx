import { useCallback, useEffect, useRef, useState } from "react";
import { useGetHeadlines } from "../hooks/queries/useGetHeadlines";
import { ArticleType, EverythingOptions } from "../types/newsapi";
import { Article } from "./Article";
import Masonry from "react-masonry-css";
import { SearchModal } from "./SearchModal";
import { useAtom } from "jotai";
import { triggerSearchAtom } from "../atom";
import { searchAtom } from "../atom";
import { useGetNews } from "../hooks/queries/useGetNews";
// @ts-expect-error - lodash is not typed
import { debounce } from "lodash";

export const Articles = () => {
  const [triggerSearch] = useAtom(triggerSearchAtom);
  const [searchParams] = useAtom(searchAtom);

  const { data: headlinesArticles, fetchNextPage: headlinesFetchNextPage } =
    useGetHeadlines({
      enabled: !triggerSearch,
      country: "us",
      pageSize: 20,
      page: 1,
    });

  const structureQuery = useCallback(() => {
    let query = "";
    if (searchParams?.q) query += searchParams.q;
    if (searchParams?.qPlus) query += searchParams.qPlus;
    if (searchParams?.qMinus) query += searchParams.qMinus;
    return query;
  }, [searchParams]);

  const { data: searchArticles, fetchNextPage: searchFetchNextPage } =
    useGetNews({
      enabled: triggerSearch,
      q: structureQuery(),
      page: 1,
      pageSize: 20,
      from: searchParams?.from,
      to: searchParams?.to,
      language: searchParams?.language,
      sources: searchParams?.sources,
    });

  const articles = triggerSearch ? searchArticles : headlinesArticles;
  const fetchNextPage = triggerSearch
    ? searchFetchNextPage
    : headlinesFetchNextPage;

  const articlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchModalOpen] = useState(false);
  const articlesComps = articles?.pages.map((page, pageIndex) =>
    page.articles.map((article: ArticleType, articleIndex) => {
      articlesRef.current = [];
      const absoluteIndex = pageIndex * page.articles.length + articleIndex;
      if (article.title != "[Removed]") {
        return (
          <Article
            ref={(el) => articlesRef.current.push(el)}
            key={article.url + article.title + absoluteIndex}
            {...article}
          />
        );
      }
    }),
  );
  const initializeObservers = useCallback(() => {
    if (articlesRef.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, root: null },
    );

    articlesRef.current.forEach((article) => {
      if (article) observer.observe(article);
    });

    const lazyLoading = new IntersectionObserver(
      (entries) => {
        const lastArticle = entries[0];
        if (lastArticle.isIntersecting) {
          fetchNextPage();
          lazyLoading.unobserve(lastArticle.target);
        }
      },
      { threshold: 0.2, root: null },
    );

    if (articlesRef.current.length > 0) {
      const lastRef = articlesRef.current[articlesRef.current.length - 1];
      if (lastRef) lazyLoading.observe(lastRef);
    }

    return () => {
      observer.disconnect();
      lazyLoading.disconnect();
    };
  }, [fetchNextPage]);

  useEffect(() => {
    const cleanupObservers = initializeObservers();

    return () => {
      cleanupObservers?.();
    };
  }, [articles, initializeObservers]);

  const handleResize = useCallback(
    debounce(() => {
      initializeObservers();
    }, 500),
    [initializeObservers],
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  const masonryBreakPoints = {
    default: 4,
    1200: 3,
    1100: 2,
    700: 1,
    500: 1,
  };

  return (
    <div className="flex justify-center">
      {searchModalOpen && <SearchModal />}
      <Masonry
        breakpointCols={masonryBreakPoints}
        className="container ml-[-20px] flex justify-center"
      >
        {articlesComps}
      </Masonry>
    </div>
  );
};
