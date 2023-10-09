export interface IStores {
  _id: string;
  name: string;
  logo: string;
  google: string;
  instagram: string;
  description: string;
  email: string;
  promotions: string[];
  rating: IRating[];
}

export interface IRating {
  userId: String;
  commentary: String;
  ratingValue: number;
}
