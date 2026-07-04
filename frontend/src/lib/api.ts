const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function fetcher<T>(endpoint: string, options: FetcherOptions = {}): Promise<T> {
  const { params, ...init } = options;

  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export const auth = {
  login: (email: string, password: string) =>
    fetcher<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (username: string, email: string, password: string) =>
    fetcher<{ user: any; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),
  me: () => fetcher<any>("/auth/me"),
  logout: () => fetcher<{ message: string }>("/auth/logout", { method: "POST" }),
};

// Novels
export const novels = {
  list: (params?: { page?: number; limit?: number; q?: string; status?: string; genre?: string; genres?: string; genre_mode?: string; sort?: string; order?: string; min_chapters?: number; min_rating?: number; min_reviews?: number }) =>
    fetcher<{ data: any[]; page: number; limit: number; total: number; total_pages: number }>("/novels", { params: params as any }),
  get: (id: number | string) => fetcher<any>(`/novels/${id}`),
  chapters: (id: number | string, params?: { page?: number; limit?: number }) =>
    fetcher<{ data: any[]; page: number; limit: number; total: number }>(`/novels/${id}/chapters`, { params: params as any }),
  trending: () => fetcher<{ data: any[] }>("/novels/trending"),
  recommendations: () => fetcher<{ data: any[] }>("/novels/recommendations"),
  random: (limit?: number) => fetcher<{ data: any[] }>("/novels/random", { params: { limit } }),
};

// Chapters
export const chapters = {
  get: (id: number | string) => fetcher<any>(`/chapters/${id}`),
};

// Ranking
export const ranking = {
  get: (period: string = "daily") => fetcher<{ data: any[] }>(`/ranking/${period}`),
};

// Updates
export const updates = {
  recent: (limit?: number) => fetcher<{ data: any[] }>("/updates", { params: { limit } }),
};

// Search
export const search = {
  query: (q: string, params?: { page?: number; limit?: number }) =>
    fetcher<{ data: any[]; page: number; limit: number; total: number }>("/search", { params: { q, ...params } as any }),
};

// Genres
export const genres = {
  list: () => fetcher<{ data: any[] }>("/genres"),
};

// Leaderboard
export const leaderboard = {
  get: (sort?: string) => fetcher<{ data: any[] }>("/leaderboard", { params: { sort } }),
};

// News
export const news = {
  list: (params?: { type?: string; page?: number; limit?: number }) =>
    fetcher<{ data: any[]; page: number; limit: number; total: number }>("/news", { params: params as any }),
  get: (id: number | string) => fetcher<any>(`/news/${id}`),
};

// Votes (protected)
export const votes = {
  create: (novelId: number) =>
    fetcher<{ message: string }>("/votes", {
      method: "POST",
      body: JSON.stringify({ novel_id: novelId }),
    }),
};

// Requests (protected)
export const requests = {
  create: (data: { novel_title: string; novel_url?: string; source?: string }) =>
    fetcher<any>("/requests", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Library (protected)
export const library = {
  get: () => fetcher<{ follows: any[]; history: any[] }>("/library"),
};

// Author
export const author = {
  novels: (name: string) => fetcher<{ data: any[]; total: number }>(`/author/${encodeURIComponent(name)}/novels`),
};

// Profile
export const profile = {
  get: (id: string | number) => fetcher<any>(`/profile/${id}`),
};

// Stats
export const stats = {
  get: () => fetcher<{
    total_novels: number;
    total_chapters: number;
    total_users: number;
    total_views: number;
    total_votes: number;
    total_requests: number;
  }>("/stats"),
};

// Health
export const health = {
  check: () => fetcher<{ status: string }>("/health"),
};
