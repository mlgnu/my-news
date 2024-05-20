import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient.ts";
import { ArticlesResponse, TopHeadlinesOptions } from "../../types/newsapi";

const getHeadlines: QueryFunction<
  ArticlesResponse,
  [string, TopHeadlinesOptions],
  number
> = async ({ pageParam, queryKey: [, headlinesParams] }) => {
  const response = await apiClient.get("/top-headlines", {
    params: { ...headlinesParams, page: pageParam },
  });

  return response.data;
};

export const useGetHeadlines = (headlinesParams: TopHeadlinesOptions) => {
  return useInfiniteQuery({
    queryKey: ["headlines", headlinesParams],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const maxNumPages = Math.ceil(
        lastPage.totalResults / (headlinesParams.pageSize || 20),
      );
      // 20 is the defualt page size from the API
      if (currentPage < maxNumPages) {
        return currentPage + 1;
      }
    },
    queryFn: getHeadlines,
    enabled: headlinesParams.enabled,
  });
};
