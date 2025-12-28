# BasaChat

<p align="center">
  <strong>AI Chatbot for Indonesian Languages</strong>
</p>

<p align="center">
  BasaChat brings artificial intelligence and information access to all people of Indonesia, supporting multiple Indonesian regional languages.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#supported-languages"><strong>Languages</strong></a> ·
  <a href="#tools-and-capabilities"><strong>Tools</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a>
</p>

## Features

### 🌏 Multi-Language Support
- **7 Languages**: Indonesian, English, Javanese, Sundanese, Acehnese, Balinese, and Minangkabau
- Fully localized UI and responses
- Auto-detection of user language preference
- Language-specific suggested prompts

### 🤖 AI Models
- **Quick Model**: Google Gemini 2.5 Flash Lite (optimized for fast responses)
- **Deep Model**: Google Gemini 2.5 Flash Lite with reasoning middleware (for complex problems)
- Dynamic model selection based on query complexity

### 🎨 Image Generation
- **Replicate Integration**: Generate images using FLUX Fast model
- Support for multiple aspect ratios (1:1, 16:9, 9:16, 4:3, 3:4)
- Toggle button for easy image generation mode
- Automatic prompt localization

### 🔍 Web Search & News
- **Google Search Integration**: Real-time web search with citation support
- **News Search**: Indonesian news search capabilities
- URL context extraction for accurate citations
- Toggle controls for search features

### 🌤️ Weather Tool
- Current weather information
- Hourly and daily forecasts
- Support for city names or coordinates
- Automatic geolocation detection

### 👤 Authentication
- Guest user support (no registration required)
- Regular user accounts with email/password
- Session management with NextAuth.js
- User-specific chat history

### 💾 Data Persistence
- PostgreSQL database for chat history and user data
- LocalStorage for UI preferences
- Chat transcript logging

## Supported Languages

| Language | Code | Native Name |
|----------|------|-------------|
| Indonesian | `id` | Bahasa Indonesia |
| English | `en` | English |
| Javanese | `jv` | Basa Jawa |
| Sundanese | `su` | Basa Sunda |
| Acehnese | `ace` | Basa Acèh |
| Balinese | `ban` | Basa Bali |
| Minangkabau | `min` | Baso Minang |

## Tools and Capabilities

### Available Tools
1. **Image Generation** (`generateImageTool`)
   - Uses Replicate API with FLUX Fast model
   - Supports custom prompts in any supported language
   - Multiple aspect ratio options

2. **Weather** (`getWeather`)
   - Current weather conditions
   - Hourly and daily forecasts
   - Sunrise/sunset times
   - Works with city names or coordinates

3. **Web Search** (`google_search`, `url_context`)
   - Real-time web search
   - URL context extraction
   - Automatic citation generation

### Smart Tool Selection
- Gemini intelligently selects appropriate tools based on user intent
- Custom tools (weather, image) provided when keywords detected
- Web search tools available for general queries
- Image generation toggle ensures tool availability

## Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type safety

### AI & ML
- **[AI SDK v5](https://ai-sdk.dev)** - Unified AI interface
- **[Google Generative AI](https://ai.google.dev)** - Gemini 2.5 Flash Lite models
- **[Replicate](https://replicate.com)** - Image generation (FLUX Fast)

### UI & Styling
- **[shadcn/ui](https://ui.shadcn.com)** - Component library
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[Radix UI](https://radix-ui.com)** - Accessible primitives
- **[Framer Motion](https://www.framer.com/motion)** - Animations

### Database & Auth
- **[PostgreSQL](https://www.postgresql.org)** - Database (via Neon or self-hosted)
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe database queries
- **[NextAuth.js](https://authjs.dev)** - Authentication

### Code Quality
- **[Ultracite](https://github.com/ultracite/ultracite)** - Linting and formatting (Biome-based)
- **[Biome](https://biomejs.dev)** - Fast formatter and linter

## Setup

### Prerequisites
- Node.js 18+ 
- pnpm 9.12.3+
- PostgreSQL database (or Neon account)
- Google AI API key
- Replicate API token (for image generation)

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Google AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# Replicate (for image generation)
REPLICATE_API_TOKEN=your_replicate_token

# Database
POSTGRES_URL=your_postgres_connection_string

# NextAuth
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

# Optional: Vercel AI Gateway (if using)
AI_GATEWAY_API_KEY=your_gateway_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chatbot-indo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Run migrations (if using Drizzle migrations)
   pnpm drizzle-kit push
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
pnpm build
pnpm start
```

## Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter (Ultracite/Biome)
- `pnpm format` - Format code (Ultracite/Biome)
- `pnpm test` - Run Playwright tests

### Code Style

This project uses **Ultracite** for code quality, which enforces:
- Strict TypeScript type safety
- Accessibility standards (a11y)
- React best practices
- Consistent code formatting

Run `pnpm lint` to check for issues and `pnpm format` to auto-fix.

## Architecture

### Key Components

- **`app/(chat)/api/chat/route.ts`** - Main chat API endpoint
- **`lib/ai/providers.ts`** - AI model provider configuration
- **`lib/ai/tools/`** - Custom tool definitions (weather, image generation)
- **`lib/i18n.ts`** - Localization system
- **`components/multimodal-input.tsx`** - Chat input with tool toggles
- **`components/message.tsx`** - Message rendering with tool results

### Tool Selection Logic

The application uses intelligent tool routing:
- Keywords trigger custom tools (weather, image)
- Image generation toggle ensures tool availability
- Gemini decides which tool to call based on context
- Web search tools available for general queries

### Message Sanitization

Large base64 image data is automatically removed from conversation context before sending to the model to prevent token limit issues, while images remain visible in the UI.

## Contributing

Contributions are welcome! Please ensure:
- Code follows Ultracite linting rules
- All tests pass
- TypeScript types are properly defined
- Accessibility standards are met

## License

[Add your license here]

## Acknowledgments

- Built with [Vercel AI SDK](https://ai-sdk.dev)
- Powered by [Google Gemini](https://ai.google.dev)
- Image generation via [Replicate](https://replicate.com)
