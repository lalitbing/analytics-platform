# Analytics Dashboard

A real-time analytics dashboard built with React, TypeScript, and Vite. Supports both REST API polling and real-time WebSocket updates via Supabase.

## Features

- Real-time event tracking with WebSocket support
- REST API fallback for traditional polling
- Toggle between real-time and polling modes
- Date range filtering
- Event statistics and visualizations
- CSV export functionality

## Environment Variables

Create a `.env.local` file in this directory with the following variables:

```bash
# API Configuration
VITE_API_URL=http://localhost:4000/api
VITE_API_KEY=your_api_key_here

# Supabase Configuration (for real-time features)
# Get these from your Supabase project settings
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Required Variables

- `VITE_API_URL`: The URL of your analytics API backend
- `VITE_API_KEY`: Your project API key (used for authentication)

### Optional Variables (for real-time mode)

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

**Note:** The dashboard works without Supabase configuration, but real-time features will be disabled. You can still use the REST API mode for fetching data.

## Real-Time Mode

The dashboard supports real-time updates via Supabase WebSocket connections:

1. **Enable Real-Time**: Toggle the "Real-time mode" switch in the sidebar
2. **Live Updates**: New events will automatically appear without manual refresh
3. **Automatic Sync**: Data updates instantly when events are tracked
4. **Date Filtering**: Real-time updates respect your selected date range

When real-time mode is enabled, you'll see a "Live" indicator with a pulsing dot on the dashboard.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Supabase** for real-time WebSocket connections
- **Axios** for REST API calls
