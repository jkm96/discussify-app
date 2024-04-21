export function getPostQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';
  const periodFrom = searchParams.periodFrom ?? '';
  const periodTo = searchParams.periodTo ?? '';
  const fetch = searchParams.fetch ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo, fetch };
}

export function getForumPostsQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';
  const periodFrom = searchParams.periodFrom ?? '';
  const periodTo = searchParams.periodTo ?? '';
  const forumSlug = searchParams.forumSlug ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo,forumSlug };
}

export function getUserQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm };
}