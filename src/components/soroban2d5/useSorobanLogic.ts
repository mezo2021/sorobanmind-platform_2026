// src/components/soroban2d5/useSorobanLogic.ts
import { useState, useCallback, useMemo } from 'react';

export interface BeadState {
  // لكل عمود: قيمة الخرزة العلوية (0 أو 5) + عدد الخرزات السفلية المفعلة (0-4)
  upper: 0 | 5;      // خرزة واحدة علوية
  lower: number;     // 0-4
}

export function useSorobanLogic(initialColumns = 4) {
  const [columns, setColumns] = useState<BeadState[]>(
    Array.from({ length: initialColumns }, () => ({ upper: 0, lower: 0 }))
  );

  // القيمة الكلية للعمود (0-9)
  const columnValue = useCallback((col: BeadState) => {
    return col.upper + col.lower;
  }, []);

  // القيمة الكلية للعدد
  const totalValue = useMemo(() => {
    return columns.reduce((acc, col, idx) => {
      const power = columns.length - 1 - idx;
      return acc + columnValue(col) * Math.pow(10, power);
    }, 0);
  }, [columns, columnValue]);

  // تفعيل/إلغاء الخرزة العلوية
  const toggleUpper = useCallback((colIdx: number) => {
    setColumns(prev => {
      const next = [...prev];
      next[colIdx] = {
        ...next[colIdx],
        upper: next[colIdx].upper === 0 ? 5 : 0,
      };
      return next;
    });
  }, []);

  // تفعيل خرزة سفلية (بالضغط على الخرزة رقم N — تُفعّل من 0 إلى N)
  const setLower = useCallback((colIdx: number, count: number) => {
    setColumns(prev => {
      const next = [...prev];
      next[colIdx] = {
        ...next[colIdx],
        lower: Math.max(0, Math.min(4, count)),
      };
      return next;
    });
  }, []);

  // إعادة تصفير عمود
  const resetColumn = useCallback((colIdx: number) => {
    setColumns(prev => {
      const next = [...prev];
      next[colIdx] = { upper: 0, lower: 0 };
      return next;
    });
  }, []);

  // إعادة تصفير الكل
  const resetAll = useCallback(() => {
    setColumns(Array.from({ length: columns.length }, () => ({ upper: 0, lower: 0 })));
  }, [columns.length]);

  // تعيين قيمة رقمية
  const setValue = useCallback((value: number) => {
    const str = Math.floor(value).toString().padStart(columns.length, '0').slice(-columns.length);
    const next = str.split('').map(digit => {
      const d = parseInt(digit);
      return {
        upper: d >= 5 ? 5 as const : 0 as const,
        lower: d >= 5 ? d - 5 : d,
      };
    });
    setColumns(next);
  }, [columns.length]);

  return {
    columns,
    totalValue,
    columnValue,
    toggleUpper,
    setLower,
    resetColumn,
    resetAll,
    setValue,
  };
}