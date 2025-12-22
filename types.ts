import { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: IconType;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
}
