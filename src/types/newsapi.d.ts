// custom module declaration for newsapi
export interface Source {
  id: string | null;
  name: string;
}

export interface FullSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface ArticleType {
  source: Source;
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date; // Specify that publishedAt is a Date object
  content: string | null;
}

export interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface SourcesResponse {
  status: string;
  sources: FullSource[];
}

export interface EverythingOptions {
  q?: string;
  qPlus?: string;
  qMinus?: string;
  qInTitle?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
  enabled?: boolean;
}

export interface TopHeadlinesOptions {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
  enabled?: boolean;
}

export interface SourcesOptions {
  category?: string;
  language?: string;
  country?: string;
}
