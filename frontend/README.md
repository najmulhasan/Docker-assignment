# Frontend - E-Commerce Platform

Next.js-based modern e-commerce frontend with Tailwind CSS, Zustand for state management, and TypeScript.

## Features

- Modern responsive UI with Tailwind CSS
- State management with Zustand
- API integration with Axios
- User authentication
- Shopping cart functionality
- Product browsing and filtering
- Order management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── lib/             # Utility functions and API client
├── store/           # Zustand stores for state management
├── types/           # TypeScript type definitions
```

## Technologies

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Language**: TypeScript
