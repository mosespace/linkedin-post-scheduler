export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  userHandle?: string;
  email: string;
  image?: string;
  password: string;
  tel?: string;
  bio?: string;
  links: ILink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILink {
  id: string;
  title: string;
  description?: string;
  callToAction?: string;
  image?: string;
  user: string; // Assuming userId here, change it to User type if needed
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
