# Currency Swap Form - FE Code Challenge (Problem 2)

- **Architecture**:
  - **Feature-based structure**: Organized into `features/swap` and `features/Portfolio`.
  - **React Hook Form + Zod**: Robust form state management and schema validation.

- **Quality Assurance**:
  - **Unit & Integration Tests**: Implemented using `Vitest` and `React Testing Library`.
  - **Strict Types**: Full TypeScript coverage.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Performance**: React Compiler (Automatic Memoization)
- **State/Form**: React Hook Form, Zod, TanStack Query
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Testing**: Vitest, React Testing Library, JSDOM

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npm run dev
```
The app will be available at `http://localhost:5173`.

### Running Tests

```bash
# Run unit and integration tests
npm test
```

## 📂 Project Structure

```
src/
├── features/
│   ├── swap/           # Swap feature (components, hooks, schemas)
│   └── Portfolio/      # Portfolio sidebar feature
├── components/         # Shared UI components (providers, ui)
├── hooks/              # Global hooks (useNotification, etc.)
├── services/           # API services (CoinGecko mock)
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── test/               # Test setup
```