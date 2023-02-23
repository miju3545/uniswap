import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.module.css';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onChange?: (...args: any[]) => any;
};

const Input = forwardRef<HTMLInputElement, Props>((props, inputRef) => {
  const { id, className, children, onChange, ...rest } = props;

  return (
    <label>
      <input
        ref={inputRef}
        data-id={id}
        className={className}
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
});

export default Input;
