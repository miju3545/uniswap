import React, { FC, useState, useEffect } from 'react';
import s from './TokenOverView.module.css';
import { useUI } from '../../ui/context';
import Button from '@components/ui/Button';
import useGetDetailsOfTokensByIds from '@lib/hooks/useGetDetailsOfTokensByIds';
import { useToken } from '../context';
import { IoSettingsOutline } from 'react-icons/io5';
import { SlInfo } from 'react-icons/sl';
import useCurrencies, { calculateCurrency } from '@lib/hooks/useCurrencies';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@components/ui';

export type FormValues = {
  from: string | number;
  into: string | number;
};

const trimDigit = (digit: number) => digit.toLocaleString(undefined, { maximumFractionDigits: 2 });

const TokenOverView: FC = () => {
  const schema = yup.object({
    from: yup
      .number()
      // .matches(/^\d*.?\d{0,2}$/)
      .required(''),
    into: yup
      .number()
      // .matches(/^\d*.?\d{0,2}$/)
      .required(''),
  });

  const { control, handleSubmit, setFocus, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { from: 0, into: 0 },
  });

  const { openModal } = useUI();
  const [disabled, setDisabled] = useState(true);

  const { fromToken, intoToken } = useToken();
  const [fromDetail, intoDetail] = useGetDetailsOfTokensByIds(fromToken.id, intoToken.id);

  const fromPrice = fromDetail?.data?.[fromToken.id]?.usd || 0;
  const intoPrice = intoDetail?.data?.[intoToken.id]?.usd || 0;

  const [fromAmount, intoAmount] = Object.values(watch()).map((v) => +v);
  const [fromCurrency, intoCurrency] = useCurrencies(
    { amount: fromAmount, price: fromPrice },
    { amount: intoAmount, price: intoPrice }
  );

  const handleSwap = async (data: FormValues) => {};

  useEffect(() => {
    setFocus('from');
  }, []);

  useEffect(() => {
    setDisabled(fromAmount <= 0 && intoAmount <= 0);
  }, [fromAmount, intoAmount]);

  useEffect(() => {
    if (intoPrice) setValue('into', trimDigit((fromAmount * fromPrice) / intoPrice));
  }, [fromAmount]);

  useEffect(() => {
    if (fromPrice) setValue('from', trimDigit((intoAmount * intoPrice) / fromPrice));
  }, [intoAmount]);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h3>스왑</h3>
        <button type="button" className={s.action} onClick={() => alert('준비 중입니다.')}>
          <IoSettingsOutline />
        </button>
      </div>
      <div className={s.container}>
        <form onSubmit={handleSubmit(handleSwap)}>
          <div className={s.group}>
            <div className={s.row}>
              <div className={s.swap_currency_input}>
                <div className={s.input_group}>
                  <Input type="number" id={fromToken.name} name={'from'} control={control} className={s.input} />
                  <p className={s.result}>{fromCurrency}</p>
                </div>
                <button type="button" className={s.select} onClick={openModal}>
                  {fromToken.name}
                </button>
              </div>
            </div>
            <div className={s.row}>
              <div className={s.swap_currency_input}>
                <div className={s.input_group}>
                  <Input type="number" id={intoToken.name} name={'into'} control={control} className={s.input} />
                  <p className={s.result}>{intoCurrency}</p>
                </div>
                <button type="button" className={s.select} onClick={openModal}>
                  {intoToken.name}
                </button>
              </div>
            </div>
            <div className={s.row}>
              <div className={s.info}>
                <SlInfo style={{ marginRight: '5px' }} /> 1 {intoToken.name} = {trimDigit(intoPrice / fromPrice)}{' '}
                {fromToken.name} ({calculateCurrency({ amount: intoPrice }).result})
              </div>
            </div>
          </div>
          <div className={s.group}>
            <Button type="button" disabled={disabled} onClick={() => alert('준비 중입니다.')}>
              {disabled ? '금액을 입력하세요' : '스왑'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenOverView;
