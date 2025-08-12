import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="app-container flex min-h-screen flex-col gap-8 py-8">
      {children}
    </div>
  );
};

export default PageShell;
