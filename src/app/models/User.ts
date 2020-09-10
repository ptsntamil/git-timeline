export interface User {
  login: string;
  avatar_url?: string;
  name: string;
  location?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: Date;
  updated_at?: Date;
}
