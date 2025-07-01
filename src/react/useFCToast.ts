import { useCallback, useState } from 'react';
import { FCToastProps } from './components/FCToast';

export function useFCToast() {
  const [toasts, setToasts] = useState<FCToastProps[]>([]);

  const showToast = useCallback((toast: FCToastProps) => {
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((index: number) => {
    setToasts(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    toasts,
    showToast,
    removeToast
  };
} 