import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/ui/AppShell';
import { SmoothScrollProvider } from './components/motion/SmoothScrollProvider';
import { PageSkeleton } from './components/ui/PageSkeleton';

// Code-split routes for optimal performance
const HomePage = lazy(() => import('./pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const CarsPage = lazy(() => import('./pages/cars/CarsPage').then((m) => ({ default: m.CarsPage })));
const CarDetailPage = lazy(() => import('./pages/car-detail/CarDetailPage').then((m) => ({ default: m.CarDetailPage })));
const ConfiguratorPage = lazy(() => import('./pages/configurator/ConfiguratorPage').then((m) => ({ default: m.ConfiguratorPage })));
const ShowroomPage = lazy(() => import('./pages/showroom/ShowroomPage').then((m) => ({ default: m.ShowroomPage })));
const TestDrivePage = lazy(() => import('./pages/test-drive/TestDrivePage').then((m) => ({ default: m.TestDrivePage })));
const OffersPage = lazy(() => import('./pages/offers/OffersPage').then((m) => ({ default: m.OffersPage })));
const PreOwnedPage = lazy(() => import('./pages/pre-owned/PreOwnedPage').then((m) => ({ default: m.PreOwnedPage })));
const ExperiencePage = lazy(() => import('./pages/experience/ExperiencePage').then((m) => ({ default: m.ExperiencePage })));
const AboutPage = lazy(() => import('./pages/about/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicePage = lazy(() => import('./pages/service/ServicePage').then((m) => ({ default: m.ServicePage })));
const ContactPage = lazy(() => import('./pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })));
const CareersPage = lazy(() => import('./pages/careers/CareersPage').then((m) => ({ default: m.CareersPage })));
const FinancePage = lazy(() => import('./pages/finance/FinancePage').then((m) => ({ default: m.FinancePage })));
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppShell>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/cars/:slug" element={<CarDetailPage />} />
              <Route path="/configurator" element={<ConfiguratorPage />} />
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/test-drive" element={<TestDrivePage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/pre-owned" element={<PreOwnedPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </AppShell>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
