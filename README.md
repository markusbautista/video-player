# React Video Player

A modern React-based video player application that displays videos in a responsive grid layout. This app allows users to add videos from URLs or local files and displays them in an adaptive grid that maintains a 16:9 aspect ratio.

## Features

- **Responsive Grid Layout**: Automatically adjusts based on the number of videos
  - 1-2 videos: Horizontal layout
  - 3-4 videos: 2x2 grid
  - 5+ videos: 4-column grid with additional rows as needed
- **Multiple Video Sources**: Support for both URL-based videos (embedded iframes) and local video files
- **Floating Action Button (FAB)**: Easy access to add new videos
- **Modal Interface**: Clean popup for video input with both URL and file upload options
- **Auto-play & Loop**: Videos automatically play and loop when added
- **Responsive Design**: Maintains 16:9 aspect ratio across different screen sizes

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## Usage

1. Click the orange "+" button in the bottom-right corner to add a video
2. Enter a video URL or select a local video file
3. Click "Add" to add the video to the grid
4. The grid will automatically reorganize based on the number of videos

## Project Structure

```
src/
├── components/
│   ├── VideoGrid.jsx      # Main grid component for displaying videos
│   ├── VideoGrid.css      # Styles for the video grid
│   ├── FAB.jsx           # Floating Action Button component
│   ├── FAB.css           # FAB styles
│   ├── VideoModal.jsx    # Modal for adding videos
│   └── VideoModal.css    # Modal styles
├── App.jsx               # Main application component
├── App.css              # App-level styles
├── index.css            # Global styles
└── main.jsx             # Application entry point
```

## Technologies Used

- React 18 with Hooks (useState, useEffect, useCallback)
- Vite for fast development and building
- CSS Grid for responsive layouts
- HTML5 Video API for local files
- iframe embedding for URL-based videos

## Development

This project uses Vite for development with Hot Module Replacement (HMR) enabled. The following scripts are available:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
