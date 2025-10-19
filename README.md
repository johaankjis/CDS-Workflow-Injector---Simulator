# CDS Workflow Injector & Simulator

A comprehensive web-based platform for simulating and testing Credit Default Swap (CDS) trade lifecycle workflows. This tool enables testing of complex CDS workflows, from trade execution through termination, with real-time monitoring and analysis capabilities.

## 🎯 Overview

The CDS Workflow Injector & Simulator is a Next.js-based application designed to help teams test, validate, and monitor CDS trade lifecycle processes. It provides an intuitive dashboard interface for managing workflow templates, executing simulations, analyzing results, and monitoring system performance.

## ✨ Features

### 📊 Dashboard Overview
- Real-time monitoring of active simulations
- Quick access to key performance metrics
- Recent activity tracking
- Success/failure rate visualization

### 📝 Workflow Templates
- Pre-configured CDS workflow templates
- Customizable event sequences
- Template categories:
  - Complete Flow (Full Trade Lifecycle)
  - Lifecycle Events (Novation, Termination, Amendments)
  - Portfolio Management (Compression, Tear-up)
  - Risk Management (Margin Calls, Collateral)
- Template search and filtering
- Template duplication and editing

### ▶️ Simulation Execution
- Real-time workflow execution
- Step-by-step progress tracking
- Multiple concurrent simulations
- Execution controls (Play, Pause, Stop, Skip)
- Queue management
- Detailed step logging

### 📈 Results Dashboard
- Comprehensive test results analysis
- Performance metrics visualization
- Success/failure tracking
- Duration and timing analysis
- Validation issue reporting
- Historical data trends
- Exportable reports

### 🔍 Observability & Metrics
- System health monitoring
- Resource utilization tracking (CPU, Memory, Network)
- Service status monitoring
- Latency and throughput metrics
- Real-time alerts
- Performance analytics

## 🛠 Technology Stack

- **Framework:** [Next.js 15.2.4](https://nextjs.org/) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** 
  - [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
  - [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
  - [Lucide React](https://lucide.dev/) - Icon library
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts for data visualization
- **Theming:** next-themes for dark/light mode support

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/CDS-Workflow-Injector---Simulator.git
cd CDS-Workflow-Injector---Simulator
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Usage

### Development

```bash
pnpm dev
```

Starts the development server with hot-reload at `http://localhost:3000`

### Building for Production

```bash
pnpm build
```

Creates an optimized production build

### Starting Production Server

```bash
pnpm start
```

Starts the production server

### Linting

```bash
pnpm lint
```

Runs ESLint to check code quality

## 📁 Project Structure

```
CDS-Workflow-Injector---Simulator/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (Overview Dashboard)
│   ├── globals.css              # Global styles
│   ├── simulations/             # Simulation execution page
│   ├── templates/               # Template management page
│   ├── results/                 # Results analysis page
│   └── observability/           # System monitoring page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── dashboard-layout.tsx     # Main dashboard layout
│   ├── overview-dashboard.tsx   # Overview dashboard component
│   ├── simulation-executor.tsx  # Simulation execution component
│   ├── templates-manager.tsx    # Template management component
│   ├── results-dashboard.tsx    # Results analysis component
│   └── observability-dashboard.tsx # Monitoring component
├── lib/                         # Utility functions
│   └── utils.ts                 # Helper utilities
├── public/                      # Static assets
├── styles/                      # Additional styles
├── hooks/                       # Custom React hooks
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── components.json             # shadcn/ui configuration
└── package.json                # Project dependencies
```

## 🎨 Key Components

### Dashboard Layout
The main layout component provides:
- Responsive sidebar navigation
- Mobile-friendly menu
- Consistent header and footer
- Navigation between all sections

### Overview Dashboard
- Statistics cards for key metrics
- Active simulation counter
- Completed tests tracking
- Average response time
- Failed tests monitoring
- Recent activity feed

### Template Manager
- Browse available workflow templates
- Search and filter templates by category
- View template details (events, duration, category)
- Create, edit, and duplicate templates
- Execute templates directly

### Simulation Executor
- Monitor active simulations in real-time
- View detailed step progress
- Control simulation execution
- Queue management for pending simulations
- Step-by-step execution logs

### Results Dashboard
- Performance trend charts
- Test results table with status indicators
- Validation issue tracking
- Time period filtering
- Success/failure rate analysis
- Export functionality

### Observability Dashboard
- System metrics visualization
- CPU, memory, and network monitoring
- Service health status
- Latency and throughput tracking
- Alert management
- Real-time performance data

## 🎯 Workflow Templates

The simulator includes several pre-configured templates:

1. **Full Trade Lifecycle** - Complete CDS trade from execution to termination (~45 min, 12 events)
2. **Novation Workflow** - Test novation process with counterparty changes (~15 min, 6 events)
3. **Compression Cycle** - Portfolio compression and tear-up scenarios (~25 min, 8 events)
4. **Termination Events** - Early termination and credit event processing (~30 min, 10 events)
5. **Margin Call Flow** - Collateral and margin call workflow testing (~20 min, 7 events)
6. **Amendment Processing** - Trade amendment and confirmation workflow (~12 min, 5 events)

## 🔧 Configuration

### TypeScript Configuration
The project uses strict TypeScript settings with Next.js optimizations. Path aliases are configured with `@/*` pointing to the root directory.

### Tailwind CSS
Tailwind CSS v4 is configured with custom color schemes and animations. The design system supports both light and dark themes.

### Next.js Configuration
- TypeScript build errors are currently ignored for development
- Images are unoptimized for easier deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Repository maintained by [johaankjis](https://github.com/johaankjis)

## 🆘 Support

For issues, questions, or feature requests, please open an issue in the GitHub repository.

## 🔄 Version

Current Version: 1.0.0

---

**Note:** This is a simulation and testing tool. Ensure proper testing in a controlled environment before deploying to production systems.
