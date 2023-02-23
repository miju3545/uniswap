import { useState, useEffect, useMemo, useCallback } from 'react';
import useInput, { ReturnTypes } from './useInput';

const useSwitchableInput = (): {
  from: ReturnTypes<any>;
  into: ReturnTypes<any>;
  onSwitch: () => void;
  onReset: () => void;
} => {
  let _from = useInput(0);
  let _into = useInput(0);
  const [[from, into], setValue] = useState([_from, _into]);

  const onSwitch = () => {
    setValue(([a, b]) => [b, a]);
  };

  const onReset = () => {
    from.onReset();
    into.onReset();
  };

  useEffect(() => {
    setValue([_from, _into]);
  }, [_from.value, _into.value]);

  return { from, into, onSwitch, onReset };
};

export default useSwitchableInput;
