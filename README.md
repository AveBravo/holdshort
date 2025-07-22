# HoldShort ✈️

A comprehensive flight school management system designed to streamline aviation training operations, scheduling, and resource management.

## 🚀 Features

### Core Management
- **User Management**: Add unlimited pilots and flight instructors
- **Aircraft Management**: Detailed aircraft profiles with specifications and maintenance tracking
- **Location Management**: Multi-location support for flight schools
- **Organization Settings**: Comprehensive organizational configuration

### Scheduling & Planning
- **Advanced Calendar**: Interactive scheduling with week/month views
- **Resource Booking**: Aircraft and instructor availability management
- **Flight Planning**: Integrated flight planning tools
- **Manifest Builder**: Flight manifest creation and management

### Weight & Balance
- **Weight & Balance Calculator**: Precise aircraft weight and balance calculations
- **Envelope Analysis**: Visual weight and balance envelope charts
- **Aircraft-specific Configurations**: Customizable for different aircraft types

### Analytics & Reporting
- **Dashboard**: Real-time overview of operations
- **Reports**: Comprehensive reporting system
- **Analytics**: Flight hours, utilization, and performance metrics

### User Experience
- **Modern UI**: Built with HeroUI and Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching support
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Interactive Charts**: Data visualization with Chart.js

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **UI Framework**: HeroUI (NextUI)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Charts**: Chart.js + React Chart.js 2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Graphics**: Spline (React Spline)
- **Theme**: Next Themes
- **Build Tool**: Vite
- **Language**: JavaScript/TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HoldShort
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeroSection.jsx
│   ├── HowItWorks.jsx
│   ├── FeaturesSection.jsx
│   ├── SchedulingFeatures.jsx
│   ├── PricingSection.jsx
│   └── ...
├── pages/              # Application pages
│   ├── DashboardPage.jsx
│   ├── CalendarPage.jsx
│   ├── AircraftDetailsPage.jsx
│   ├── WeightBalancePage.jsx
│   └── ...
├── assets/             # Static assets
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── data.jsx           # Application data
```

## 🌟 Key Components

### Dashboard
Central hub displaying key metrics, recent activities, and quick access to main features.

### Calendar Management
Advanced scheduling system with drag-and-drop functionality, resource conflicts detection, and multi-view support.

### Aircraft Management
Detailed aircraft profiles including specifications, maintenance schedules, and availability tracking.

### Weight & Balance
Precise weight and balance calculations with visual envelope charts and safety margin indicators.

### User Management
Comprehensive user management system supporting different roles (pilots, instructors, administrators).

## 🚀 Deployment

The application is configured for deployment on Vercel with the included `vercel.json` configuration.

To deploy:
1. Build the project: `npm run build`
2. Deploy to your preferred hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.

---

**HoldShort** - Streamlining aviation training, one flight at a time. ✈️
