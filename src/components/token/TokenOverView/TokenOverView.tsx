import React, { FC, useState, useCallback, useEffect, SyntheticEvent } from 'react';
import s from './TokenOverView.module.css';
import { useUI } from '../../ui/context';
import Button from '@components/ui/Button';
import useSwitchableInputs from '@lib/hooks/useSwitchableInputs';
import SwapCurrencyInput from '../SwapCurrencyInput';
import useGetDetailsOfTokensByIds from '@lib/hooks/useGetDetailsOfTokensByIds';
import { useToken } from '../context';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineArrowDownward } from 'react-icons/md';
import { SlInfo } from 'react-icons/sl';
import useCurrencies, { calculateCurrency } from '@lib/hooks/useCurrencies';

const TokenOverView: FC = () => {
  // input
  const { from, into, onSwitch, onReset } = useSwitchableInputs();
  // modal ui
  const { openModal } = useUI();
  // activating button
  const [disabled, setDisabled] = useState(true);
  // kinds-of-token
  const { fromToken, intoToken } = useToken();
  // usd-prices of each token
  const [fromTokenDetail, intoTokenDetail] = useGetDetailsOfTokensByIds(fromToken.id, intoToken.id);

  const fromTokenPrice = fromTokenDetail?.data?.[fromToken.id]?.usd || 0;
  const intoTokenPrice = intoTokenDetail?.data?.[intoToken.id]?.usd || 0;

  const [fromCurrency, intoCurrency] = useCurrencies(
    { amount: from.value, price: fromTokenPrice },
    { amount: into.value, price: intoTokenPrice }
  );

  const { result } = calculateCurrency({ amount: (from.value * fromTokenPrice) / intoTokenPrice });
  console.log(fromTokenPrice, intoTokenPrice, result);
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      onReset();
    } catch ({ errors }: any) {
    } finally {
      setDisabled(true);
    }
  };

  const handleValidation = useCallback(() => {
    const reg = /^\d*.?\d{0,2}$/;

    const validInputs = reg.test(from.value) && reg.test(into.value);

    setDisabled(!validInputs);
  }, [from, into]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  useEffect(() => {
    from.onFocus();
  }, []);

  useEffect(() => {
    if (from.value) into.setValue((from.value * fromTokenPrice) / intoTokenPrice);
  }, [from.value]);

  useEffect(() => {
    if (into.value) from.setValue((into.value * intoTokenPrice) / fromTokenPrice);
  }, [into.value]);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h3>스왑</h3>
        <button type="button" className={s.action} onClick={() => alert('준비 중입니다.')}>
          <IoSettingsOutline />
        </button>
      </div>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <div className={s.group}>
            <div className={s.row}>
              <SwapCurrencyInput name={fromToken.name} {...from} result={fromCurrency} />
            </div>
            <button type="button" className={`${s.action} ${s.toggle}`} style={{ margin: '5px 0' }} onClick={onSwitch}>
              <MdOutlineArrowDownward />
            </button>
            <div className={s.row}>
              <SwapCurrencyInput name={intoToken.name} {...into} result={intoCurrency} />
            </div>
            <div className={s.row}>
              <div className={s.info}>
                <SlInfo /> 1 {intoToken.name} = {(intoTokenPrice / fromTokenPrice).toFixed(6)} {fromToken.name}
              </div>
            </div>
          </div>
          <div className={s.group}>
            <Button type="submit" disabled={disabled} onClick={() => alert('준비 중입니다.')}>
              {disabled ? '금액을 입력하세요' : '스왑'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenOverView;
