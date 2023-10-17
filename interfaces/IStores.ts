export interface IStores {
  _id: string;
  name: string;
  logo: string;
  google: string;
  instagram: string;
  review: string;
  veggie: boolean;
  petFriendly: boolean;
  kids: boolean;
  accessibility: boolean;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  pix: string;
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
