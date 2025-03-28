
const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = 'f401cecd'
export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  
  if (data.Error) {
    throw new Error(data.Error);
  }
  
  return data;
}

export async function getMovieDetails(id: string) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  
  if (data.Error) {
    throw new Error(data.Error);
  }
  
  return data;
} 
