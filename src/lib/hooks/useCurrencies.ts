import { useMemo } from 'react';

export const formatCurrency = ({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}): string => {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol',
  });

  return formatCurrency.format(amount);
};

export const calculateCurrency = (data: {
  amount: number;
  currencyCode?: string;
  locale?: string;
}): { result: string } => {
  const { amount, currencyCode = 'USD', locale = 'en-US' } = data ?? {};
  const value = useMemo(() => formatCurrency({ amount, currencyCode, locale }), [amount, currencyCode, locale]);

  return { result: value };
};

const useCurrencies = (...datas: { amount: number; price: number; currencyCode?: string; locale?: string }[]) => {
  const values = datas.map((data) => {
    const { amount, price, ...rest } = data;
    return calculateCurrency({ amount: amount * price, ...rest }).result;
  });

  return values;
};

export default useCurrencies;
