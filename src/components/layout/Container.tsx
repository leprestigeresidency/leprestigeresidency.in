import React from 'react';

/**
 * Reusable content container that respects the global max‑width and responsive paddings.
 * Uses CSS custom properties defined in `variables.css`.
 */
interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--max-width-desktop)] px-[var(--padding-mobile)] md:px-[var(--padding-tablet)] lg:px-[var(--padding-desktop)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
