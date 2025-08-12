import type { ReactNode } from 'react';

interface BlockProps {
  children: ReactNode;
  className?: string;
  isBlock?: boolean;
}

export default function Block({
  children,
  className = '',
  isBlock = false,
}: BlockProps) {
  return (
    <div
      className={`block-container ${className} ${isBlock ? 'block' : 'flex'}`}
    >
      {children}
    </div>
  );
}
