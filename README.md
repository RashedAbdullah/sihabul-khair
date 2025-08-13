# Custom Finance

Custom Finance is a financial management web application designed for organizations to track monthly and yearly payments, member contributions, and financial statistics. Built with Next.js, TypeScript, and MongoDB, it provides a modern dashboard for managing and visualizing financial data.

## Features

- Member management with avatars and shares
- Monthly payment tracking for all members
- Yearly payment tracking per member
- Bengali month name support
- Dashboard with summary cards and payment status table
- API endpoints for payments, members, investments, expenses, and more
- Responsive UI with reusable components

## Technologies Used

- Next.js
- React
- TypeScript
- MongoDB & Mongoose
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RashedAbdullah/custom-finance.git
   cd custom-finance
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:

   - Create a `.env` file and add your MongoDB URI and other secrets as needed.

4. Run the development server:
   ```bash
   npm run dev
   ```

### Usage

- Access the dashboard at `http://localhost:3000`
- View member payment status, monthly and yearly summaries
- Add new payments via the dashboard or API

## Folder Structure

```
@types/           # TypeScript type definitions
public/           # Static assets (images, SVGs)
src/
  actions/        # Server actions (e.g., signin)
  app/            # Next.js app directory
    (auth)/       # Auth pages
    (dashboard)/  # Dashboard pages
    (pages)/      # Main feature pages (payments, members, etc.)
    api/          # API routes
  assets/         # Images and logos
  components/     # Reusable React components
  data/           # Static data and config
  hooks/          # Custom React hooks
  lib/            # Utility libraries (auth, db, etc.)
  middlewares/    # API middlewares
  models/         # Mongoose models
  services/       # API service layer
  utils/          # Utility functions
```

## API Endpoints

- `/api/payments` - Get and create payments
- `/api/yearly-payment` - Get yearly payment status
- `/api/members` - Member info
- `/api/investments` - Investment info
- `/api/expenses` - Expense info

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
