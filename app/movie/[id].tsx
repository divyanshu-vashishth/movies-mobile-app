import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { getMovieDetails } from '@/lib/api'
import { MovieDetails } from '@/lib/types'
import { addFavorite, removeFavorite, getFavorites } from '@/lib/storage'

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    loadMovie()
    checkFavorite()
  }, [id])

  const loadMovie = async () => {
    try {
      if (!id) return
      const data = await getMovieDetails(id)
      setMovie(data)
    } catch (error) {
      console.error('Error loading movie:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkFavorite = async () => {
    const favorites = await getFavorites()
    setIsFavorite(favorites.some((f) => f.imdbID === id))
  }

  const toggleFavorite = async () => {
    if (!movie) return
    if (isFavorite) {
      await removeFavorite(movie.imdbID)
    } else {
      await addFavorite(movie)
    }
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    )
  }

  if (!movie) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Movie not found</Text>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600' }}
          className="w-full h-96"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={toggleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-2"
        >
          <Text className="text-2xl">{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold">{movie.Title}</Text>
        <Text className="text-gray-600">{movie.Year} • {movie.Rated}</Text>

        <View className="mt-4">
          <Text className="text-lg font-semibold">Plot</Text>
          <Text className="text-gray-700 mt-1">{movie.Plot}</Text>
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold">Details</Text>
          <View className="mt-2 space-y-1">
            <Text className="text-gray-700">Genre: {movie.Genre}</Text>
            <Text className="text-gray-700">Director: {movie.Director}</Text>
            <Text className="text-gray-700">Cast: {movie.Actors}</Text>
            <Text className="text-gray-700">Runtime: {movie.Runtime}</Text>
            <Text className="text-gray-700">Language: {movie.Language}</Text>
            <Text className="text-gray-700">Country: {movie.Country}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold">Ratings</Text>
          <View className="mt-2 space-y-1">
            <Text className="text-gray-700">IMDb: {movie.imdbRating}/10 ({movie.imdbVotes} votes)</Text>
            {movie.Ratings.map((rating, index) => (
              <Text key={index} className="text-gray-700">
                {rating.Source}: {rating.Value}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
} 