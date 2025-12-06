# Pokémon Explorer

A simple Next.js app to browse and explore Pokémon using the PokéAPI.

## Features

- Browse Pokémon with pagination
- Search Pokémon by name
- Filter by type
- Add favorites (saved in localStorage)
- View detailed Pokémon information
- Google OAuth authentication
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Google OAuth credentials:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14 (App Router)
- React
- Redux Toolkit
- Axios
- Framer Motion
- Tailwind CSS
- shadcn/ui
- NextAuth.js

