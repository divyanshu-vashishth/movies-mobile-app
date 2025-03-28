import { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { searchMovies } from '@/lib/api'
import { useDebounce } from '@/lib/hooks'
import { Movie } from '@/lib/types'

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedSearch) {
      search(debouncedSearch)
    } else {
      setMovies([])
      setError(null)
    }
  }, [debouncedSearch])

  const search = useCallback(async (searchQuery: string, pageNum = 1) => {
    if (!searchQuery) {
      setMovies([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await searchMovies(searchQuery, pageNum)
      setMovies(pageNum === 1 ? data.Search : [...movies, ...data.Search])
      setHasMore(data.Search.length === 10)
      setPage(pageNum)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to search movies')
      setMovies([])
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [movies])

  const loadMore = () => {
    if (!loading && hasMore) {
      search(query, page + 1)
    }
  }

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/movie/[id]' as any,
        params: { id: item.imdbID }
      })}
      className="flex-row items-center p-4 border-b border-gray-200 bg-white"
    >
      <Image
        source={{ 
          uri: item.Poster && item.Poster !== 'N/A' 
            ? item.Poster 
            : 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&auto=format&fit=crop&q=60' 
        }}
        className="w-20 h-30 rounded-lg"
        resizeMode="cover"
        style={{ width: 80, height: 120 }}
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-gray-900" numberOfLines={2}>
          {item.Title}
        </Text>
        <Text className="text-gray-600">{item.Year}</Text>
        <Text className="text-gray-600 capitalize">{item.Type}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-gray-100">
      <View className="p-4 bg-white border-b border-gray-200">
        <TextInput
          className="h-12 px-4 bg-white border border-gray-300 rounded-lg text-gray-900"
          placeholder="Search movies..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.imdbID}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator className="mt-8" color="#3B82F6" />
          ) : error ? (
            <Text className="text-center text-red-500 mt-8">{error}</Text>
          ) : (
            <Text className="text-center text-gray-500 mt-8">
              {query ? 'No movies found' : 'Search for movies'}
            </Text>
          )
        }
        ListFooterComponent={
          movies.length > 0 && hasMore ? (
            <TouchableOpacity 
              onPress={loadMore}
              disabled={loading}
              className="m-4 p-3 bg-blue-500 rounded-lg opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold">
                  Load More Movies
                </Text>
              )}
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  )
}


