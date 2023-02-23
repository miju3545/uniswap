import React, { FC, forwardRef } from 'react';
import { ReturnTypes } from '@lib/hooks/useInput';
import s from './SwapCurrencyInput.module.css';
import { Input } from '@components/ui';
import { useUI } from '../../ui/context';
import { useToken } from '../context';

type Props = ReturnTypes<any> & { name: string; result: string };

const SwapCurrencyInput = forwardRef<HTMLInputElement, Props>((props, inputRef) => {
  const { name, value, onChange, result } = props;
  const { openModal } = useUI();

  return (
    <div className={s.root}>
      <div className={s.group}>
        <Input type="number" ref={inputRef} name={name} value={value} onChange={onChange} className={s.input} />
        <p className={s.result}>{result}</p>
      </div>
      <button className={s.select} onClick={openModal}>
        {name}
      </button>
    </div>
  );
});

export default SwapCurrencyInput;
