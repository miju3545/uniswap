import cn from 'clsx';
import React, { FC, forwardRef, ButtonHTMLAttributes, JSXElementConstructor, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import s from './Button.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  className?: string;
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Button;
