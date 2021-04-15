export interface PaginatedResponse<T> {
  returnedCount: number;
  totalCount: number;
  results: T[];
}
