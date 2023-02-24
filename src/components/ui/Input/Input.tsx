import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react';
import { FormValues } from '@components/token/TokenOverView/TokenOverView';
import { Control, Controller } from 'react-hook-form';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'number' | 'text';
  name: string;
  control: Control<FormValues | any>;
  onChange?: () => void;
};

const Input: FC<Props> = (props) => {
  const { id, type = 'text', name, control, onChange = () => {}, ...rest } = props;

  return (
    <label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { isDirty, invalid } }) => (
          <input
            type={type}
            data-id={id}
            autoComplete="off"
            autoCorrect="true"
            autoCapitalize="off"
            spellCheck="false"
            {...field}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
              onChange();
            }}
            {...rest}
          />
        )}
      />
    </label>
  );
};
export default Input;
