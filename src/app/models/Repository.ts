export interface Repository {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  subscribers_count: number;
  size: number;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
}
