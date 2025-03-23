export interface User {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  user: User;
  space: string;
  rating: number;
  comment: string;
  createdAt: string;
  __v: number;
}

export interface Space {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  openTime: string;
  closeTime: string;
  averageRating: number;
  size: number;
  minSeats: number;
  maxSeats: number;
  picture: string;
  __v: number;
  reviews: Review[];
  id: string;
}
