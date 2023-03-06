import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import s from './SwapTokenView.module.css';
import { ORIGINS, useUI } from '../../ui/context';
import Button from '@components/ui/Button';
import useGetDetailsOfTokensByIds from '@lib/hooks/useGetDetailsOfTokensByIds';
import { useSwapToken } from '../context';
import useCurrencies, { currencyFormatter } from '@lib/hooks/useCurrencies';
import { useForm } from 'react-hook-form';
import { Input } from '@components/ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiInfoCircle } from 'react-icons/bi';

export type Form = {
  from: string | number;
  into: string | number;
};

// 소수점 아래 최대 n자리까지 제한
export const limitDigits = (digit: number | string, fraction?: number) => {
  const str = digit.toLocaleString(undefined, { maximumFractionDigits: fraction });
  return parseFloat(str.replace(/[^0-9-.]/g, ''));
};

const SwapTokenView: FC = () => {
  const { control, setFocus, setValue, watch } = useForm<Form>({
    defaultValues: { from: 0, into: 0 },
  });

  const { openModal, setModalView } = useUI();
  const [disabled, setDisabled] = useState(true);

  const { fromToken, intoToken } = useSwapToken();
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
    setModalView({ modalView: 'SELECT_TOKEN_VIEW', props: { origin } });
  };

  const handleFromAmount = (digit: number) => setValue('from', limitDigits(digit));
  const handleIntoAmount = (digit: number) => setValue('into', limitDigits(digit));

  useEffect(() => {
    setFocus('from');
  }, []);

  useEffect(() => {
    setDisabled(!fromAmount || !intoAmount);
  }, [fromAmount, intoAmount]);

  useEffect(() => {
    if (fromAmount) handleIntoAmount((fromAmount * fromPrice) / intoPrice);
  }, [fromPrice]);

  useEffect(() => {
    if (intoAmount) handleFromAmount((intoAmount * intoPrice) / fromPrice);
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
        <form>
          <div className={s.section}>
            <div className={s.section__group}>
              <div className={s.swap_currency_input}>
                <div className={s.input_wrapper}>
                  <Input
                    type="number"
                    name={'from'}
                    control={control}
                    className={s.input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleIntoAmount((+e.target.value * fromPrice) / intoPrice)
                    }
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
                    name={'into'}
                    control={control}
                    className={s.input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFromAmount((+e.target.value * intoPrice) / fromPrice)
                    }
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
                <BiInfoCircle /> 1 {intoToken.symbol} = {limitDigits(intoPrice / fromPrice, 7)} {` `}
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

export default SwapTokenView;
