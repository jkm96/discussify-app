export interface PagingMetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  lastPage: number;
  from: number;
  to: number;
}

export interface PagedResponse {
  data: any;
  pagingMetaData: PagingMetaData;
  statusCode: number;
  message: string;
  succeeded: boolean;
}