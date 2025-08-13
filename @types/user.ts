export interface IUser {
  // Personal info
  _id: string;
  name: string;
  avatar: string;
  father?: string;
  nationalId?: string;
  mobile?: string;

  // Account info
  email: string;
  password: string;
  role: "USER" | "MEMBER" | "ADMIN";
  position: string;
  entryDate: Date;
  shares: number;
  refreshToken?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export interface IUserDocument extends IUser, IUserMethods {}
