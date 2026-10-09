import React, { useState } from 'react';
import { AurelisHeader } from '../navigation/AurelisHeader';
import { Footer } from '../navigation/Footer';
import { CustomCursor } from '../motion/CustomCursor';
import { Preloader } from '../motion/Preloader';
import { RouteTransition } from '../motion/RouteTransition';
import { ScrollProgress } from './ScrollProgress';
import { ComparisonDrawer } from '../motion/ComparisonDrawer';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setPreloaderDone] = useState(false);

  return (
    <div className="app-shell" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Preloader Instrument Cluster */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Top progress indicator */}
      <ScrollProgress />

      {/* Desktop Custom Elastic Cursor */}
      <CustomCursor />

      {/* Vehicle pass route transition */}
      <RouteTransition />

      {/* Global Aurelis Header */}
      <AurelisHeader />

      {/* Main Page View */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Telemetry Comparison Drawer */}
      <ComparisonDrawer />

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
};
