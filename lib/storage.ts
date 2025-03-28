import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from './types'

const FAVORITES_KEY = '@movie_favorites'

export async function getFavorites(): Promise<Movie[]> {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('Error getting favorites:', error)
    return []
  }
}

export async function addFavorite(movie: Movie) {
  try {
    const favorites = await getFavorites()
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      favorites.push(movie)
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  } catch (error) {
    console.error('Error adding favorite:', error)
  }
}

export async function removeFavorite(imdbID: string) {
  try {
    const favorites = await getFavorites()
    const newFavorites = favorites.filter((f) => f.imdbID !== imdbID)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  } catch (error) {
    console.error('Error removing favorite:', error)
  }
} 