import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ReqType extends Request {
  user: any;
  token: any;
}

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export interface ArticleType {
  title: string;
  snippet: string;
  url: string;
  image_url: string;
}

export interface UserType {
  _id: string;
  username: string;
  password: string;
  articles: ArticleType[];
  categories: string[];
}
