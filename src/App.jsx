import React from 'react';
import { Route, useNavigate, Routes } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import MainMenu from './components/MainMenu';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import SchedulingFeatures from './components/SchedulingFeatures';
import ScreensSection from './components/ScreensSection';
import LinkSection from './components/LinkSection';
import AboutUs from './components/AboutUs';
import PricingSection from './components/PricingSection';
import DashboardPage from './pages/DashboardPage';
import LocationsPage from './pages/LocationsPage';
import OrganizationPage from './pages/OrganizationPage';
import AccountFeatures from './components/AccountFeatures';
import CalendarPage from './pages/CalendarPage';
import OrganizationSettings from './pages/OrgSettings';
import SubscriptionPlan from './pages/SubPlan';
import OrganizationUsersPage from './pages/OrganizationUsersPage';
import ReportsPage from './pages/ReportsPage';
import ResourcesPage from './pages/ResourcesPage';
import AircraftDetailsPage from './pages/AircraftDetailsPage';
import WeightBalancePage from './pages/WeightBalancePage';
import WeightBalanceEnvelopePage from './pages/WeightBalanceEnvelopePage';
import ManifestBuilder from './components/manifest-builder';
import SearchPage from './pages/SearchPage';

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <SchedulingFeatures />
      <ScreensSection />
      <LinkSection />
      <AboutUs />
      <PricingSection />
      <AccountFeatures />
    </>
  );
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <>
      <MainMenu onNavigate={navigate}/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/organizations" element={<OrganizationPage />} />
          <Route path="/subscription-plan" element={<SubscriptionPlan />} />
          <Route path="/organization-settings" element={<OrganizationSettings />}/>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/calendar/:view/:organization" element={<CalendarPage />} />
          <Route path="/calendar/:view" element={<CalendarPage />} />
          <Route path="/organization-users" element={<OrganizationUsersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/aircraft-details/:id" element={<AircraftDetailsPage />} />
          <Route path="/weight-balance/:id" element={<WeightBalancePage />} />
          <Route path="/weight-balance-envelope/:id" element={<WeightBalanceEnvelopePage />} />
          <Route path="/manifest-builder/:id" element={<ManifestBuilder />} />
          <Route path="/search" element={<SearchPage />} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AppContent />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}



