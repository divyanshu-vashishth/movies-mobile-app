import '../global.css';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ 
        title: "Home",
        headerTitle: "Home"
      }} />
      <Stack.Screen name="movie/[id]" options={{ 
        title: "Movie Details",
        headerTitle: "Movie Details"
      }} />
    </Stack>
  );
}

