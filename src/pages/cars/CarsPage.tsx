import React, { useState, useMemo, useRef } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { VehicleCard } from '../../components/vehicles/VehicleCard';
import { useGsapContext, gsap } from '../../utils/gsap';

export const CarsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDrive, setSelectedDrive] = useState<string>('ALL');
  const [selectedFuel, setSelectedFuel] = useState<string>('ALL');
  const [minPower, setMinPower] = useState<number>(300);
  const [sortBy, setSortBy] = useState<'default' | 'power' | 'accel' | 'price-desc' | 'price-asc'>('default');

  const categories = ['ALL', 'GT', 'SPORT', 'SUV', 'ELECTRIC'];
  const driveTypes = ['ALL', 'AWD', 'RWD'];
  const fuelTypes = ['ALL', 'Twin-Turbo V8', 'Electric', 'Hybrid', 'Naturally Aspirated V12'];

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.subline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modelCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'ALL' || car.category.toUpperCase() === selectedCategory.toUpperCase();
      const matchesDrive = selectedDrive === 'ALL' || car.driveType === selectedDrive;
      const matchesFuel = selectedFuel === 'ALL' || car.fuelType === selectedFuel;
      const matchesPower = car.power >= minPower;

      return matchesSearch && matchesCat && matchesDrive && matchesFuel && matchesPower;
    }).sort((a, b) => {
      if (sortBy === 'power') return b.power - a.power;
      if (sortBy === 'accel') return a.acceleration - b.acceleration;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return a.featuredOrder - b.featuredOrder;
    });
  }, [searchTerm, selectedCategory, selectedDrive, selectedFuel, minPower, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedDrive('ALL');
    setSelectedFuel('ALL');
    setMinPower(300);
    setSortBy('default');
  };

  useGsapContext(
    () => {
      gsap.from('.cars-hero-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.from('.cars-filter-bar', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
      });
    },
    [],
    containerRef
  );

  return (
    <div ref={containerRef} className="cars-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Page Hero */}
        <div className="cars-hero-header" style={{ marginBottom: '50px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '32px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            AURELIS PORTFOLIO // VEHICLE DOSSIER
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            FIND YOUR<br />
            NEXT MACHINE.
          </h1>
          <p className="font-editorial" style={{ fontSize: '24px', color: 'var(--theme-text-secondary)', margin: 0 }}>
            Every chassis engineered without compromise. Filter by powertrain dynamics or performance envelope.
          </p>
        </div>

        {/* Technical Filter Bar */}
        <div
          className="cars-filter-bar"
          style={{
            backgroundColor: 'var(--theme-surface)',
            border: '1px solid var(--theme-border)',
            padding: '24px',
            marginBottom: '40px'
          }}
        >
          <div
            className="filter-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              alignItems: 'end'
            }}
          >
            {/* Search Input */}
            <div>
              <label htmlFor="search-input" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                SEARCH MODEL OR CODE
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="search-input"
                  type="text"
                  placeholder="e.g. A9 GT, E7..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    backgroundColor: 'var(--theme-bg)',
                    border: '1px solid var(--theme-border-strong)',
                    color: 'var(--theme-text)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px'
                  }}
                />
                <Search size={16} color="var(--theme-text-secondary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category-select" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                BODY / CATEGORY
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'var(--theme-bg)',
                  border: '1px solid var(--theme-border-strong)',
                  color: 'var(--theme-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Drive Filter */}
            <div>
              <label htmlFor="drive-select" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                DRIVETRAIN
              </label>
              <select
                id="drive-select"
                value={selectedDrive}
                onChange={(e) => setSelectedDrive(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'var(--theme-bg)',
                  border: '1px solid var(--theme-border-strong)',
                  color: 'var(--theme-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              >
                {driveTypes.map((drive) => (
                  <option key={drive} value={drive}>
                    {drive}
                  </option>
                ))}
              </select>
            </div>

            {/* Powertrain / Fuel Filter */}
            <div>
              <label htmlFor="fuel-select" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                POWERTRAIN
              </label>
              <select
                id="fuel-select"
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'var(--theme-bg)',
                  border: '1px solid var(--theme-border-strong)',
                  color: 'var(--theme-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              >
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label htmlFor="sort-select" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                SORT BY METRICS
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'var(--theme-bg)',
                  border: '1px solid var(--theme-border-strong)',
                  color: 'var(--theme-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              >
                <option value="default">CURATED PORTFOLIO</option>
                <option value="power">MAX POWER (HP)</option>
                <option value="accel">0–100 ACCELERATION</option>
                <option value="price-desc">PRICE (HIGH TO LOW)</option>
                <option value="price-asc">PRICE (LOW TO HIGH)</option>
              </select>
            </div>
          </div>

          {/* Power Range Slider & Active Results Counter */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--theme-border)',
              marginTop: '20px',
              paddingTop: '16px',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label htmlFor="power-range" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                MINIMUM OUTPUT: <strong style={{ color: 'var(--theme-accent)' }}>{minPower} HP</strong>
              </label>
              <input
                id="power-range"
                type="range"
                min="300"
                max="620"
                step="10"
                value={minPower}
                onChange={(e) => setMinPower(Number(e.target.value))}
                style={{ width: '140px', accentColor: 'var(--theme-accent)' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                DISPLAYING: <strong style={{ color: 'var(--theme-text)' }}>{filteredVehicles.length} OF {VEHICLES.length} MACHINES</strong>
              </span>

              <button
                onClick={resetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--theme-text-secondary)',
                  border: '1px solid var(--theme-border)',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent'
                }}
              >
                <RotateCcw size={12} /> RESET
              </button>
            </div>
          </div>
        </div>

        {/* Vehicles Grid / Empty State */}
        {filteredVehicles.length === 0 ? (
          <div
            style={{
              padding: '80px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--theme-card-bg)',
              border: '1px solid var(--theme-border)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
              TELEMETRY: NO VEHICLES MATCHING PARAMETERS
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--theme-text-secondary)', marginBottom: '20px' }}>
              Try adjusting your powertrain or power thresholds.
            </p>
            <button onClick={resetFilters} className="btn-aurelis">
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(20px, 2.5vw, 36px)'
            }}
          >
            {filteredVehicles.map((car, idx) => (
              <VehicleCard key={car.id} vehicle={car} priority={idx === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
