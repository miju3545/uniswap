import React, { FC, useEffect, useState, Fragment } from 'react';
import cn from 'clsx';
import s from './SelectTokenView.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { TfiClose } from 'react-icons/tfi';
import { ORIGINS, useUI } from '../../ui/context';
import { Input } from '@components/ui';
import { BiSearch } from 'react-icons/bi';
import { useToken } from '@components/swap/context';
import tokenList from '../../../config/token-list';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiEditBoxLine } from 'react-icons/ri';

const tag: FC<{ symbol: string; origin: ORIGINS }> = (props) => {
  const { symbol, origin } = props;
  const { setFromToken, setIntoToken, fromToken, intoToken } = useToken();
  const { closeModal } = useUI();

  const handleSelect = () => {
    origin === 'from' ? setFromToken(symbol) : setIntoToken(symbol);
    closeModal();
  };

  const selected = origin === 'from' ? symbol === fromToken.symbol : symbol === intoToken.symbol;

  return (
    <Fragment key={symbol}>
      <li
        onClick={handleSelect}
        className={cn(s.tag, {
          [s.selected]: selected,
        })}
      >
        <div>{symbol}</div>
      </li>
    </Fragment>
  );
};

const option: FC<{ symbol: string; origin: ORIGINS }> = (props) => {
  const { symbol, origin } = props;
  const { setFromToken, setIntoToken, fromToken, intoToken } = useToken();
  const { closeModal } = useUI();

  const selected = origin === 'from' ? symbol === fromToken.symbol : symbol === intoToken.symbol;

  const handleSelect = () => {
    origin === 'from' ? setFromToken(symbol) : setIntoToken(symbol);
    closeModal();
  };

  return (
    <Fragment key={symbol}>
      <li
        onClick={handleSelect}
        className={cn(s.option, {
          [s.selected]: selected,
        })}
      >
        <div className={s.option__inner}>
          {symbol}
          {selected && <AiOutlineCheck className={s.icon} />}
        </div>
      </li>
    </Fragment>
  );
};

const SelectTokenView: FC = () => {
  const schema = yup.object({
    search: yup.string().required(''),
  });

  const {
    control,
    setFocus,
    watch,
    formState: { isDirty },
  } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  const { closeModal, origin } = useUI();
  const { history } = useToken();

  const [results, setResults] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const search = watch().search;

  useEffect(() => {
    const results = Object.keys(tokenList).filter((symbol) => search === symbol);
    setResults(results);
  }, [search]);

  useEffect(() => {
    setShowResult(isDirty);
  }, [isDirty]);

  useEffect(() => {
    setFocus('search');
  }, []);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h3>토큰 선택</h3>
        <button type="button" className={s.action} onClick={closeModal}>
          <TfiClose />
        </button>
      </div>
      <div className={s.container}>
        <div className={s.search}>
          <BiSearch className={s.icon} />
          <Input
            type="text"
            name={'search'}
            control={control}
            className={s.input}
            placeholder="이름 검색 또는 주소 넣기"
          />
        </div>
        <div className={s.section}>
          <ul className={s.tags}>
            {history.slice(0, 7).map((symbol) => {
              return tag({ symbol, origin });
            })}
          </ul>
        </div>
        <div className={s.section}>
          <ul className={s.options}>
            {showResult
              ? results.map((symbol) => option({ symbol, origin }))
              : Object.keys(tokenList).map((symbol) => option({ symbol, origin }))}
          </ul>
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.edit} onClick={() => alert('준비 중입니다.')}>
          <RiEditBoxLine style={{ marginRight: '4px' }} /> 토큰 목록 관리
        </div>
      </div>
    </div>
  );
};

export default SelectTokenView;
