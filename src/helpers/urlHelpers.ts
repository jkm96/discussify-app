export function getJournalQueryParams(queryParams: string) {
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

export function getContentQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const type = searchParams.type ?? '';

  return { type };
}

export function getMagicStudioQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';
  const periodFrom = searchParams.periodFrom ?? '';
  const periodTo = searchParams.periodTo ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo };
}

export function getUserQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm };
}