import { memo } from 'react';
import './style.css';
interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="PageLayout">{children}</div>;
}

export default memo(PageLayout);
