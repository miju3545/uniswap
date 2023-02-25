import React, { FC, useState, useEffect } from 'react';
import s from './SwapTokenView.module.css';
import { ORIGINS, useUI } from '../../ui/context';
import Button from '@components/ui/Button';
import useGetDetailsOfTokensByIds from '@lib/hooks/useGetDetailsOfTokensByIds';
import { useToken } from '../context';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiInfoCircle } from 'react-icons/bi';
import useCurrencies, { currencyFormatter } from '@lib/hooks/useCurrencies';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@components/ui';

export type FormValues = {
  from: string | number;
  into: string | number;
};

export const trimDigit = (digit: number | string, fraction: number | undefined = 10) => {
  const str = digit.toLocaleString(undefined, { minimumFractionDigits: fraction, maximumFractionDigits: fraction });
  return parseFloat(str.replace(/[^0-9-.]/g, ''));
};

export const digitsOnly = (value: string = '') => /(^\d+$)|(^\d{1,}.\d{0,10}$)/.test(value) || value.length === 0;

const TokenView: FC = () => {
  const schema = yup.object().shape({
    from: yup.string().test('validation', 'digits only field', digitsOnly),
    into: yup.string().test('validation', 'digits only field', digitsOnly),
  });

  const { control, handleSubmit, setFocus, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { from: 0, into: 0 },
  });

  const { openModal, setModalView } = useUI();
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

  const handleSelect = (origin: ORIGINS) => {
    openModal();
    setModalView({ modalView: 'SELECT_TOKEN_VIEW', origin });
  };

  useEffect(() => {
    setFocus('from');
  }, []);

  useEffect(() => {
    setDisabled(!fromAmount || !intoAmount);
  }, [fromAmount, intoAmount]);

  useEffect(() => {
    if (fromAmount) {
      setValue('into', trimDigit((fromAmount * fromPrice) / intoPrice));
    }
  }, [fromPrice]);

  useEffect(() => {
    if (intoAmount) {
      setValue('from', trimDigit((intoAmount * intoPrice) / fromPrice));
    }
  }, [intoPrice]);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h3>스왑</h3>
        <button type="button" id="setting-button" className={s.action} onClick={() => alert('준비 중입니다.')}>
          <IoSettingsOutline />
        </button>
      </div>
      <div className={s.container}>
        <form onSubmit={handleSubmit(() => {})}>
          <div className={s.section}>
            <div className={s.section__group}>
              <div className={s.swap_currency_input}>
                <div className={s.input_wrapper}>
                  <Input
                    type="number"
                    id={fromToken.symbol}
                    name={'from'}
                    control={control}
                    className={s.input}
                    onChange={() => {
                      setValue('into', trimDigit((fromAmount * fromPrice) / intoPrice));
                    }}
                  />
                  <p className={s.result}>{fromCurrency}</p>
                </div>
                <button type="button" className={s.select} onClick={() => handleSelect('from')}>
                  {fromToken.symbol}
                </button>
              </div>
            </div>
            <div className={s.section__group}>
              <div className={s.swap_currency_input}>
                <div className={s.input_wrapper}>
                  <Input
                    type="number"
                    id={intoToken.symbol}
                    name={'into'}
                    control={control}
                    className={s.input}
                    onChange={() => {
                      setValue('from', trimDigit((intoAmount * intoPrice) / fromPrice));
                    }}
                  />
                  <p className={s.result}>{intoCurrency}</p>
                </div>
                <button type="button" className={s.select} onClick={() => handleSelect('into')}>
                  {intoToken.symbol}
                </button>
              </div>
            </div>
            <div className={s.section__group}>
              <div className={s.info}>
                <BiInfoCircle /> 1 {intoToken.symbol} = {trimDigit(intoPrice / fromPrice, 7)} {` `}
                {fromToken.symbol} ({currencyFormatter({ amount: intoPrice, fraction: 4 })})
              </div>
            </div>
          </div>
          <div className={s.section}>
            <Button type="button" disabled={disabled} onClick={() => alert('준비 중입니다.')}>
              {disabled ? '금액을 입력하세요' : '스왑'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenView;
