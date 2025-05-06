# بصير (Baseer)

A modern React website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Arabic RTL support
- Modern UI with Tailwind CSS
- TypeScript for type safety
- Next.js for routing and server-side rendering

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/khaled-alghmdi/Baseer.git
   cd Baseer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
Baseer/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Home page
│   │   ├── about/      # About page
│   │   └── contact/    # Contact page
│   ├── components/     # Reusable components
│   └── styles/         # Global styles
├── .env.local          # Environment variables
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Deployment

This project can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or AWS Amplify.

```bash
npm run build
# or
yarn build
```

## License

ISC
