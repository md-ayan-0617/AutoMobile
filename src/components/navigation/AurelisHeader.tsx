import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { useThemeStore } from '../../store/useThemeStore';

export const AurelisHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  // Determine dynamic header text color based on theme
  const isDarkBgTheme = currentTheme === 'performance' || currentTheme === 'night-drive';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isScrolled ? '72px' : '88px',
          backgroundColor: isScrolled
            ? isDarkBgTheme
              ? 'rgba(17, 20, 23, 0.95)'
              : 'rgba(233, 236, 239, 0.95)'
            : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--theme-border)' : '1px solid transparent',
          zIndex: 9990,
          display: 'flex',
          alignItems: 'center',
          transition: 'height 0.3s ease, background-color 0.4s ease, border-color 0.4s ease'
        }}
      >
        <div
          className="showroom-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* LEFT: Typographic Logo with Geometric Symbol */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'var(--theme-text)'
            }}
          >
            {/* Minimal Geometric "A" icon */}
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <line x1="22" y1="80" x2="50" y2="20" stroke="currentColor" strokeWidth="9" />
              <line x1="78" y1="80" x2="50" y2="20" stroke="currentColor" strokeWidth="9" />
              <line x1="32" y1="58" x2="68" y2="58" stroke="var(--theme-accent)" strokeWidth="7" />
              <rect x="52" y="32" width="8" height="8" fill="var(--theme-accent-secondary)" />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  lineHeight: 1
                }}
              >
                AURELIS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.22em',
                  lineHeight: 1.4,
                  color: 'var(--theme-text-secondary)'
                }}
              >
                MOTOR COMPANY
              </span>
            </div>
          </Link>

          {/* CENTER: Primary Links (Desktop) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav"
          >
            <Link
              to="/cars"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: location.pathname === '/cars' ? 'var(--theme-accent)' : 'var(--theme-text)',
                transition: 'color 0.2s ease'
              }}
            >
              CARS
            </Link>
            <Link
              to="/showroom"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: location.pathname === '/showroom' ? 'var(--theme-accent)' : 'var(--theme-text)',
                transition: 'color 0.2s ease'
              }}
            >
              SHOWROOM
            </Link>
            <Link
              to="/experience"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: location.pathname === '/experience' ? 'var(--theme-accent)' : 'var(--theme-text)',
                transition: 'color 0.2s ease'
              }}
            >
              EXPERIENCE
            </Link>
            <Link
              to="/pre-owned"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: location.pathname === '/pre-owned' ? 'var(--theme-accent)' : 'var(--theme-text)',
                transition: 'color 0.2s ease'
              }}
            >
              PRE-OWNED
            </Link>
          </nav>

          {/* RIGHT: CTAs & Mega Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* CONFIGURE text link */}
            <Link
              to="/configurator"
              style={{
                display: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.08em',
                color: 'var(--theme-text)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s ease'
              }}
              className="desktop-configure-link"
            >
              CONFIGURE
            </Link>

            {/* TEST DRIVE blue rectangular button */}
            <Link
              to="/test-drive"
              className="btn-aurelis"
              style={{
                padding: '0.65rem 1.35rem',
                fontSize: '0.78rem'
              }}
            >
              TEST DRIVE
            </Link>

            {/* MENU trigger button */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--theme-text)',
                background: 'none',
                border: '1px solid var(--theme-border-strong)',
                padding: '0.6rem 0.9rem',
                cursor: 'pointer'
              }}
            >
              <Menu size={16} />
              <span className="menu-text-label">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive media query styling */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-configure-link {
            display: inline-block !important;
          }
        }
        @media (max-width: 600px) {
          .menu-text-label {
            display: none;
          }
        }
      `}</style>

      {/* Mega Menu Modal */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
};
