import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react';
import { Form } from '@components/swap/SwapTokenView/SwapTokenView';
import { Control, Controller } from 'react-hook-form';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'number' | 'text';
  name: string;
  control: Control<Form | any>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

// 양수 또는 소수점 이하 최대 10자리 or 빈 값만 허용
export const digitsOnly = (value: string = '') => /(^\d+$)|(^\d{1,}.\d{0,10}$)/.test(value) || value.length === 0;

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
              if (type === 'number' && !digitsOnly(e.target.value)) {
                return;
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
