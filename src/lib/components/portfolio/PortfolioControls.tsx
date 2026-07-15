import React from 'react';
import { CommandPalette } from './CommandPalette';
import { InstallAppButton } from './InstallAppButton';
import { ThemeToggle } from './ThemeToggle';

interface PortfolioControlsProps {
  email: string;
}

export const PortfolioControls: React.FC<PortfolioControlsProps> = ({ email }) => (
  <div className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-2xl border border-primary-200 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:bg-primary-950/95 sm:bottom-6 sm:right-6">
    <InstallAppButton />
    <CommandPalette email={email} />
    <ThemeToggle />
  </div>
);
