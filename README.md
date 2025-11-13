# Mystery Notes - Educational Game Platform

A Notion-like interface for an educational mystery game where students explore pages with hidden messages in images.

## Features

- Custom authentication with Supabase (without Supabase Auth)
- Password encryption using crypto-js
- Notion-inspired dashboard and note interface
- Multiple themed pages with images
- Hidden messages embedded in images
- Image download functionality
- Responsive design with dark mode support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the SQL schema from `database-schema.sql` in your Supabase SQL editor

### 3. Configure Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ENCRYPTION_SECRET=your_secure_random_string_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── login/          # Login/Signup page
│   ├── dashboard/      # Main dashboard with note cards
│   ├── note/[id]/      # Individual note pages
│   └── page.tsx        # Root redirect to login
├── lib/
│   ├── supabase.ts     # Supabase client configuration
│   ├── auth.ts         # Authentication functions
│   └── encryption.ts   # Password encryption utilities
└── database-schema.sql # Database schema for Supabase
```

## Database Schema

The application uses three main tables:

- **users**: Stores user credentials with encrypted passwords
- **notes**: Stores note/page content
- **images**: Stores image metadata and hidden messages

## How It Works

### Authentication
- Custom authentication without Supabase Auth
- Passwords are hashed using SHA-256
- User sessions managed via localStorage
- Encryption using AES from crypto-js

### Game Features
- 4 themed mystery pages
- Each page contains text and images
- Images have hidden messages (clues)
- Students can download images
- Hover over images to reveal download and clue buttons

## Available Pages

1. **The Ancient Library** - Mystery in ancient books
2. **Mystery of the Hidden Vault** - Crack the vault code
3. **Secret Garden Clues** - Decode the rose cipher
4. **The Cipher Chronicles** - Master key discovery

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom (crypto-js)
- **Language**: TypeScript
- **Image Hosting**: Unsplash (sample images)

## Security Notes

- Never commit `.env.local` to version control
- Change the `ENCRYPTION_SECRET` to a secure random string
- In production, use proper session management (JWT, cookies)
- Consider adding rate limiting for authentication endpoints

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Future Enhancements

- Implement proper session management with JWT
- Add image upload functionality with steganography
- Create admin panel for managing notes and clues
- Add progress tracking for students
- Implement real-time collaboration features
- Add more sophisticated encryption for hidden messages

## License

This project is for educational purposes.
