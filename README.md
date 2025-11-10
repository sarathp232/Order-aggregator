# Order Aggregator Web Application

This is a web application built with Next.js that allows users to consolidate and view their online orders from multiple e-commerce platforms in a single, unified dashboard. It features AI-powered order deduplication to automatically identify and merge duplicate entries from different sources.

![Order Aggregator Screenshot](https://picsum.photos/seed/app-screenshot/1200/600)
> A placeholder image of the application dashboard.

## Key Features

- **Unified Dashboard:** View orders from platforms like Amazon, eBay, and Shopify all in one place.
- **AI-Powered Deduplication:** A Genkit-powered AI flow intelligently analyzes and removes duplicate orders, even with slight variations in data.
- **Account Linking:** A modal for users to (mock) connect their various shopping accounts.
- **Powerful Filtering & Sorting:** Easily find orders by filtering by platform, status, or date, and sort by date or status.
- **Responsive Design:** A clean and modern user interface that works seamlessly on desktop and mobile devices.
- **Authentication Flow:** Simple, mocked sign-up and sign-in pages.

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative:** [Firebase Genkit](https://firebase.google.com/docs/genkit) with the Google AI (Gemini) plugin.
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later is recommended)
- `npm`, `yarn`, or `pnpm` as your package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    # .env.local
    GEMINI_API_KEY=your_api_key_here
    ```
    This key is required for the AI deduplication feature to work.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:9002](http://localhost:9002).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.
