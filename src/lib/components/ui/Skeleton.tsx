/**
 * Skeleton Loading Component
 * Beautiful loading placeholders for better UX
 */
import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <Skeleton variant="text" width="60%" height={24} />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="80%" height={16} />
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 56, 
  className 
}) => (
  <Skeleton variant="circular" width={size} height={size} className={className} />
);

export const SkeletonList: React.FC<{ items?: number; className?: string }> = ({ 
  items = 3, 
  className 
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>
      </div>
    ))}
  </div>
);

