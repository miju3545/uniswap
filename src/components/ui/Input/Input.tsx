import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react';
import { digitsOnly, Form } from '@components/swap/SwapTokenView/SwapTokenView';
import { Control, Controller } from 'react-hook-form';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'number' | 'text';
  name: string;
  control: Control<Form | any>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = (props) => {
  const { type = 'text', value, name, control, onChange = () => {}, ...rest } = props;

  return (
    <label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={type}
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
              onChange(e);
              field.onChange(e.target.value);
            }}
            {...rest}
          />
        )}
      />
    </label>
  );
};
export default Input;
