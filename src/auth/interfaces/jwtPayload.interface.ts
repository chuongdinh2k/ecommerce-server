export interface IGenerateTokenProps {
  email: string;
  id: string;
}

export interface JwtPayload {
  exp?: number;
  email: string;
  id: string;
}
