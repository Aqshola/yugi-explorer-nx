import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <div className="min-h-screen bg-blue-primary py-14 w-full">
      <div className="max-w-screen-2xl h-full mx-auto">
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
