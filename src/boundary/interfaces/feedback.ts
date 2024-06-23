
export type UserFeedbackRequest = {
  email:string;
  rating:number;
  feedback: string;
}

export type UserFeedbackResponse = {
  id:number;
  email:string;
  rating:number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}