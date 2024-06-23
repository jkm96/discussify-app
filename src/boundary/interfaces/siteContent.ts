export type SiteContentResponse = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  type: string;
}

export type CreateSiteContentRequest = {
  title: string;
  content: string;
  type: string;
}
