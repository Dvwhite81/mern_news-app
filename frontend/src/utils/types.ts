export interface UserType {
  _id: string;
  username: string;
  password: string;
  articles: ArticleType[];
  categories: string[];
}

export interface InputField {
  name: string;
  label: string;
  inputType: string;
  value: string;
  setValue: (value: string) => void;
}

export interface CheckboxField {
  name: string;
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
}

export interface UserResult {
  success: boolean;
  message: string;
}

export interface ArticleType {
  uuid: string;
  title: string;
  snippet: string;
  url: string;
  image_url: string;
}
