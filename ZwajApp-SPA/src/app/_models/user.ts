import { Photo } from "./Photo";

export interface User {
  id: number;
  userName: string;
  gender: string;
  email: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  city: string;
  country: string;
  photoURL: string;
  introduction?: string;
  lookingFor?: string;
  interests?: string;
  photos?:Photo[]
}
