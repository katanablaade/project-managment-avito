import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

interface MenuItem {
  key: string | number;
  link: string;
  title: string;
}

interface MenuProps {
  items?: MenuItem[];
  onNavigate?: (item: MenuItem) => void;
}

function Menu({ items = [], onNavigate = () => {} }: MenuProps) {
  const location = useLocation();

  return (
    <ul className="Menu">
      {items.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <li
            key={item.key}
            className={`Menu-item ${isActive ? 'active' : ''}`}
          >
            <Link
              to={item.link}
              onClick={() => onNavigate(item)}
              className={`Menu-link ${isActive ? 'active' : ''}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Menu);
