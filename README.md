# ChatX

A real-time chat application built with Next.js and [SpacetimeDB](https://spacetimedb.com/), a high-performance decentralised database.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Database**: SpacetimeDB 2.1.0
- **Runtime**: Bun

## Features

- Real-time messaging with instant sync across all connected clients
- User identity management via SpacetimeDB authentication
- Username registration and online status tracking
- Reactive UI updates using SpacetimeDB subscriptions

## Project Structure

```
chatx/
├── app/                    # Next.js app router
│   ├── page.tsx            # Main chat UI
│   ├── providers/         # Context providers
│   │   └── spacetime.tsx  # SpacetimeDB connection provider
│   ├── layout.tsx         # Root layout
│   └── globals.css         # Global styles
├── spacetimedb/           # SpacetimeDB module
│   ├── src/
│   │   ├── index.ts       # Database schema & reducers
│   │   └── module_bindings/  # Auto-generated bindings
│   ├── spacetime.json     # SpacetimeDB config
│   └── package.json       # SpacetimeDB dependencies
└── package.json           # Next.js dependencies
```

## SpacetimeDB Schema

### Tables

**message**
| Column    | Type    | Description            |
|-----------|---------|------------------------|
| id        | u64     | Unique message ID      |
| sender    | string  | Username of sender    |
| text      | string  | Message content       |
| sentAt    | u64     | Unix timestamp        |

**user**
| Column    | Type     | Description            |
|-----------|----------|------------------------|
| identity  | identity | SpacetimeDB identity   |
| username  | string   | User's display name    |
| online    | bool     | Online status          |

### Reducers

- `sendMessage(text, sender)` - Sends a message to the chat
- `setUsername(username)` - Registers a username for the current identity

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js

### Installation

```bash
# Install root dependencies
bun install

# Install SpacetimeDB module dependencies
cd spacetimedb
bun install
cd ..
```

### Environment Variables

Create a `.env.local` file in the `spacetimedb/` directory:

```env
SPACETIMEDB_TOKEN=your_token_here
```

For the Next.js frontend, set these environment variables:

```env
NEXT_PUBLIC_SPACETIMEDB_HOST=your_host
NEXT_PUBLIC_SPACETIMEDB_DB_NAME=your_database_name
```

### Running the Application

```bash
# Start the Next.js development server (port 3001)
bun run dev

# In another terminal, start the SpacetimeDB module
cd spacetimedb
bun run dev
```

The chat app will be available at `http://localhost:3001`.

## Architecture

ChatX leverages SpacetimeDB's reactive capabilities:

1. **Connection**: The frontend connects to SpacetimeDB using `DbConnection.builder()`
2. **Subscription**: Clients subscribe to all tables to receive real-time updates
3. **Reducers**: Sending messages and setting usernames are handled via reducers
4. **Reactivity**: The `useTable` hook automatically updates UI when database data changes

## License

MIT