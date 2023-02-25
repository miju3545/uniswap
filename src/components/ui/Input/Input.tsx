import React, { FC, InputHTMLAttributes, ChangeEvent, useEffect, forwardRef, MutableRefObject } from 'react';
import { digitsOnly, FormValues, trimDigit } from '@components/swap/SwapTokenView/SwapTokenView';
import { Control, Controller } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'number' | 'text';
  name: string;
  control: Control<FormValues | any>;
  onChange?: () => void;
};

const Input: FC<Props> = forwardRef((props, inputRef) => {
  const { id, type = 'text', name, control, onChange = () => {}, ...rest } = props;

  return (
    <label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={type}
            data-id={id}
            autoComplete="off"
            autoCorrect="true"
            autoCapitalize="off"
            spellCheck="false"
            {...field}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (type === 'number') {
                if (!digitsOnly(e.target.value)) {
                  return;
                }
              }
              onChange();
              field.onChange(e.target.value);
            }}
            {...rest}
            ref={mergeRefs([field.ref, inputRef])}
          />
        )}
      />
    </label>
  );
});
export default Input;
