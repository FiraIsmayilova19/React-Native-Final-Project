export interface NewsItem { id: number; title: string; body: string }

export async function fetchNews(page = 1, limit = 10): Promise<NewsItem[]> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    const data: NewsItem[] = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

