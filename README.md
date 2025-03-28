# Movie Search App

A React Native (expo) mobile application that allows users to search for movies, view details, and save their favorites. Built with Expo and using the OMDB API.

!['home page'](/assets/snapshot-1.png?raw=true "home page")
!['movies page'](/assets/snapshot-2.png?raw=true "movies page")

## Features

- Search movies by title
- View movie details including poster, title, year, genre, and ratings
- Load more movies functionality
- Save favorite movies
- Responsive design with proper error handling
- Infinite scrolling with load more button

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or newer)
- pnpm or npm or yarn or bun
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android emulator) iOS Simulator (Mac only) or 

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movies-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install 
    or yarn install or bun install
   ```


4. Start the development server:
   ```bash
   pnpm run android
   # or
   pnpm run ios
   ```

## Running the App

After starting the development server:

- Press `i` to run on iOS simulator (Mac only)
- Press `a` to run on Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
movies-app/
├── app/                    # App screens and navigation
│   ├── index.tsx          # Home screen with search
│   └── movie/[id].tsx     # Movie details screen
├── lib/                    # Shared utilities
│   ├── api.ts             # API calls
│   ├── hooks.ts           # Custom hooks
│   ├── types.ts           # TypeScript types
│   └── storage.ts         # Async Storage helper
├── components/            # Reusable components
└── assets/               # Images and other static files
```

## Technologies Used

- React Native
- Expo
- TypeScript
- NativeWind (TailwindCSS)
- AsyncStorage
- OMDB API

