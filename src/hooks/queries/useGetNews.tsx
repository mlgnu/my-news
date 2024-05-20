import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import { ArticlesResponse, EverythingOptions } from "../../types/newsapi";
import { apiClient } from "../../utils/apiClient";

const getNews: QueryFunction<
  ArticlesResponse,
  [string, EverythingOptions],
  number
> = async ({ pageParam, queryKey: [, searchParams] }) => {
  const response = await apiClient.get("/everything", {
    params: { ...searchParams, page: pageParam },
  });

  return response.data;
};

export const useGetNews = (searchParams: EverythingOptions) => {
  return useInfiniteQuery({
    queryKey: ["search", searchParams],
    queryFn: getNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      // 100 is the defualt page size from the API
      const maxNumPages = Math.ceil(
        lastPage.totalResults / (searchParams.pageSize || 100),
      );
      if (currentPage < maxNumPages) {
        return currentPage + 1;
      }
    },
    enabled: searchParams.enabled,
  });
};
