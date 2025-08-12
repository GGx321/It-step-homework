import type { ReactNode } from 'react';

interface BlockProps {
  children: ReactNode;
  className?: string;
}

export default function Block({ children, className = '' }: BlockProps) {
  return <div className={`block-container ${className}`}>{children}</div>;
}
