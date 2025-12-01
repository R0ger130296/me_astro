import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Check,
  CheckCircle,
  ChevronRight,
  Calendar,
  Rocket,
  Target,
  Star,
  Sparkles,
  X,
  Download,
  type LucideIcon,
} from 'lucide-react';

// Name to component mapping
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Check,
  CheckCircle,
  ChevronRight,
  Calendar,
  Rocket,
  Target,
  Star,
  Sparkles,
  X,
  Download,
};

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', color }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <span className="text-red-500 text-xs">Icon "{name}" not found</span>;
  }

  const style: React.CSSProperties = color ? { color } : {};

  return (
    <IconComponent
      size={typeof size === 'string' ? parseInt(size) : size}
      className={className}
      style={style}
    />
  );
};

