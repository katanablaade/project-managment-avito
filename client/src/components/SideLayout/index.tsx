import React, { memo } from 'react';
import './style.css';

interface SideLayoutProps {
  children: React.ReactNode;
  side?: 'start' | 'end' | 'between';
  padding?: 'small' | 'medium' | 'large';
}

// Компонент
function SideLayout({
  children,
  side = 'start',
  padding = 'medium',
}: SideLayoutProps) {
  return (
    <div
      className={`SideLayout SideLayout--side-${side} SideLayout--padding-${padding}`}
    >
      {React.Children.map(children, (child) => {
        const key = React.isValidElement(child) ? child.key : undefined;
        return (
          <div key={key} className="SideLayout-item">
            {child}
          </div>
        );
      })}
    </div>
  );
}

export default memo(SideLayout);
