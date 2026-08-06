interface UserState {
  id: number | null;
  email: string | null;
  name: string | null;
  lastname: string | null;
}

interface ThemeState {
  darkMode: boolean;
}

interface RootState {
  user: UserState;
  theme: ThemeState;
}

interface UseInputReturn {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TMDBMovieSummary {
  id: number;
  title: string;
  poster_path: string;
}

interface TMDBMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  release_date: string;
  homepage: string | null;
}

interface Favorite {
  movieId: number;
}

declare module "*.css";
declare module "@vercel/analytics/react";