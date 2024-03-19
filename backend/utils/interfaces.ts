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
  teaser: string;
  articleBody: string;
  articleStatus?: number;
  created: Date;
}

export interface UserType {
  _id: string;
  username: string;
  password: string;
  articles: ArticleType[];
}
