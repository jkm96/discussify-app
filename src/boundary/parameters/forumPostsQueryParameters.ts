import {RequestParameters} from '@/boundary/parameters/requestParameters';

export class ForumPostsQueryParameters extends RequestParameters {
  public searchTerm: string;
  public periodFrom: string;
  public periodTo: string;
  public forumSlug: string;

  constructor() {
    super(2, 1, 'createdOn desc');
    this.searchTerm = '';
    this.periodFrom = '';
    this.periodTo = '';
    this.forumSlug = '';
  }
}
