import {
  useState,
  ChangeEvent,
  useRef,
  MutableRefObject,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';

export type ReturnTypes<T> = {
  ref: MutableRefObject<HTMLInputElement>;
  value: T;
  isDirty: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onFocus: () => void;
  setValue: Dispatch<SetStateAction<T>>;
};

const useInput = <T>(initialValue: T): ReturnTypes<T> => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  const onReset = useCallback(() => setValue(initialValue), []);

  const onFocus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    setDirty(!!Number(value));
  }, [value]);

  const values = useMemo(() => ({ ref, value, isDirty, onChange, onReset, onFocus, setValue }), [value]);

  return { ...values };
};

export default useInput;
