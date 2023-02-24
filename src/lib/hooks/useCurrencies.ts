import { useMemo } from 'react';

export const formatCurrency = ({
  amount,
  currencyCode,
  locale,
  fraction,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
  fraction: number;
}): string => {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: fraction,
    currencyDisplay: 'narrowSymbol',
  });

  return formatCurrency.format(amount);
};

export const currencyFormatter = (data: {
  amount: number;
  currencyCode?: string;
  locale?: string;
  fraction?: number;
}): string => {
  const { amount, currencyCode = 'USD', locale = 'en-US', fraction = 2 } = data ?? {};
  const value = useMemo(
    () => formatCurrency({ amount, currencyCode, locale, fraction }),
    [amount, currencyCode, locale, fraction]
  );

  return value;
};

const useCurrencies = (...datas: { amount: number; price: number; currencyCode?: string; locale?: string }[]) => {
  const values = datas.map((data) => {
    const { amount, price, ...rest } = data;
    return currencyFormatter({ amount: amount * price, ...rest });
  });

  return values;
};

export default useCurrencies;
