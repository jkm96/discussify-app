import {RequestParameters} from '@/boundary/parameters/requestParameters';

export class UserQueryParameters extends RequestParameters {
  public searchTerm: string;
  public periodFrom: string;
  public periodTo: string;

  constructor() {
    super(10, 1, 'createdOn desc');
    this.searchTerm = '';
    this.periodFrom = '';
    this.periodTo = '';
  }
}
