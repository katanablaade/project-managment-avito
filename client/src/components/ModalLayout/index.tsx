import { memo, useEffect, useRef } from 'react';
import './style.css';

interface ModalLayoutProps {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({
  title = 'Создание задачи',
  onClose = () => {},
  children,
}: ModalLayoutProps) => {
  const layout = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layout.current || !frame.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (layout.current && frame.current) {
        layout.current.style.alignItems =
          layout.current.clientHeight < frame.current.clientHeight
            ? 'flex-start'
            : 'center';
        layout.current.style.justifyContent =
          layout.current.clientWidth < frame.current.clientWidth
            ? 'flex-start'
            : 'center';
      }
    });

    resizeObserver.observe(layout.current);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="ModalLayout" ref={layout}>
      <div className="ModalLayout-frame" ref={frame}>
        <div className="ModalLayout-head">
          <h1 className="ModalLayout-title">{title}</h1>
          <button className="ModalLayout-close" onClick={onClose} />
        </div>
        <div className="ModalLayout-content">{children}</div>
      </div>
    </div>
  );
};

export default memo(ModalLayout);
