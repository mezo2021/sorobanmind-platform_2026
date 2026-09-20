// ============================================================
// examBank.ts — بنك أسئلة الامتحان النهائي
// 100 سؤال — ينتقى منها 25 عشوائياً
// ============================================================

import type { ChainOperation } from './types';

export interface ExamQuestion {
  id: number;
  operations: ChainOperation[];
  answer: number;
  opsCount: 3 | 4 | 5;
  digits: 1 | 2;
  category: 'single' | 'mixed';
}

export const EXAM_BANK: ExamQuestion[] = [
  // ═══════════════════════════════════════════════════════════
  // المجموعة A: سلاسل آحاد — 3 عمليات (30 سؤالاً)
  // ═══════════════════════════════════════════════════════════
  { id: 1, operations: [{ value: 7, operator: '+' }, { value: 5, operator: '-' }, { value: 3, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 2, operations: [{ value: 8, operator: '+' }, { value: 9, operator: '-' }, { value: 6, operator: '+' }], answer: 11, opsCount: 3, digits: 1, category: 'single' },
  { id: 3, operations: [{ value: 5, operator: '-' }, { value: 4, operator: '+' }, { value: 8, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 4, operations: [{ value: 9, operator: '-' }, { value: 6, operator: '+' }, { value: 4, operator: '+' }], answer: 7, opsCount: 3, digits: 1, category: 'single' },
  { id: 5, operations: [{ value: 6, operator: '+' }, { value: 8, operator: '-' }, { value: 5, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 6, operations: [{ value: 4, operator: '+' }, { value: 7, operator: '+' }, { value: 3, operator: '+' }], answer: 14, opsCount: 3, digits: 1, category: 'single' },
  { id: 7, operations: [{ value: 8, operator: '-' }, { value: 3, operator: '+' }, { value: 9, operator: '+' }], answer: 14, opsCount: 3, digits: 1, category: 'single' },
  { id: 8, operations: [{ value: 7, operator: '+' }, { value: 6, operator: '-' }, { value: 4, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 9, operations: [{ value: 9, operator: '-' }, { value: 5, operator: '+' }, { value: 3, operator: '+' }], answer: 7, opsCount: 3, digits: 1, category: 'single' },
  { id: 10, operations: [{ value: 6, operator: '-' }, { value: 2, operator: '+' }, { value: 8, operator: '+' }], answer: 12, opsCount: 3, digits: 1, category: 'single' },
  { id: 11, operations: [{ value: 5, operator: '+' }, { value: 9, operator: '-' }, { value: 7, operator: '+' }], answer: 7, opsCount: 3, digits: 1, category: 'single' },
  { id: 12, operations: [{ value: 8, operator: '+' }, { value: 4, operator: '-' }, { value: 6, operator: '+' }], answer: 6, opsCount: 3, digits: 1, category: 'single' },
  { id: 13, operations: [{ value: 9, operator: '+' }, { value: 2, operator: '-' }, { value: 5, operator: '+' }], answer: 6, opsCount: 3, digits: 1, category: 'single' },
  { id: 14, operations: [{ value: 7, operator: '-' }, { value: 5, operator: '+' }, { value: 6, operator: '+' }], answer: 8, opsCount: 3, digits: 1, category: 'single' },
  { id: 15, operations: [{ value: 4, operator: '+' }, { value: 8, operator: '+' }, { value: 2, operator: '+' }], answer: 14, opsCount: 3, digits: 1, category: 'single' },
  { id: 16, operations: [{ value: 3, operator: '+' }, { value: 9, operator: '-' }, { value: 4, operator: '+' }], answer: 8, opsCount: 3, digits: 1, category: 'single' },
  { id: 17, operations: [{ value: 6, operator: '-' }, { value: 3, operator: '+' }, { value: 7, operator: '+' }], answer: 10, opsCount: 3, digits: 1, category: 'single' },
  { id: 18, operations: [{ value: 8, operator: '+' }, { value: 5, operator: '-' }, { value: 9, operator: '+' }], answer: 4, opsCount: 3, digits: 1, category: 'single' },
  { id: 19, operations: [{ value: 9, operator: '-' }, { value: 7, operator: '+' }, { value: 5, operator: '+' }], answer: 7, opsCount: 3, digits: 1, category: 'single' },
  { id: 20, operations: [{ value: 5, operator: '+' }, { value: 6, operator: '+' }, { value: 4, operator: '+' }], answer: 15, opsCount: 3, digits: 1, category: 'single' },
  { id: 21, operations: [{ value: 9, operator: '+' }, { value: 3, operator: '-' }, { value: 8, operator: '+' }], answer: 4, opsCount: 3, digits: 1, category: 'single' },
  { id: 22, operations: [{ value: 4, operator: '-' }, { value: 2, operator: '+' }, { value: 7, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 23, operations: [{ value: 7, operator: '+' }, { value: 8, operator: '-' }, { value: 9, operator: '+' }], answer: 6, opsCount: 3, digits: 1, category: 'single' },
  { id: 24, operations: [{ value: 6, operator: '+' }, { value: 4, operator: '+' }, { value: 5, operator: '+' }], answer: 15, opsCount: 3, digits: 1, category: 'single' },
  { id: 25, operations: [{ value: 9, operator: '-' }, { value: 4, operator: '-' }, { value: 3, operator: '+' }], answer: 2, opsCount: 3, digits: 1, category: 'single' },
  { id: 26, operations: [{ value: 8, operator: '+' }, { value: 6, operator: '-' }, { value: 7, operator: '+' }], answer: 7, opsCount: 3, digits: 1, category: 'single' },
  { id: 27, operations: [{ value: 5, operator: '+' }, { value: 5, operator: '+' }, { value: 5, operator: '+' }], answer: 15, opsCount: 3, digits: 1, category: 'single' },
  { id: 28, operations: [{ value: 7, operator: '-' }, { value: 2, operator: '+' }, { value: 4, operator: '+' }], answer: 9, opsCount: 3, digits: 1, category: 'single' },
  { id: 29, operations: [{ value: 9, operator: '+' }, { value: 5, operator: '-' }, { value: 6, operator: '+' }], answer: 8, opsCount: 3, digits: 1, category: 'single' },
  { id: 30, operations: [{ value: 6, operator: '-' }, { value: 5, operator: '+' }, { value: 9, operator: '+' }], answer: 10, opsCount: 3, digits: 1, category: 'single' },

  // ═══════════════════════════════════════════════════════════
  // المجموعة A: سلاسل آحاد — 4 عمليات (30 سؤالاً)
  // ═══════════════════════════════════════════════════════════
  { id: 31, operations: [{ value: 5, operator: '-' }, { value: 4, operator: '+' }, { value: 7, operator: '+' }, { value: 8, operator: '+' }], answer: 16, opsCount: 4, digits: 1, category: 'single' },
  { id: 32, operations: [{ value: 8, operator: '+' }, { value: 3, operator: '+' }, { value: 1, operator: '+' }, { value: 9, operator: '+' }], answer: 21, opsCount: 4, digits: 1, category: 'single' },
  { id: 33, operations: [{ value: 9, operator: '-' }, { value: 6, operator: '+' }, { value: 5, operator: '+' }, { value: 2, operator: '-' }], answer: 6, opsCount: 4, digits: 1, category: 'single' },
  { id: 34, operations: [{ value: 7, operator: '+' }, { value: 5, operator: '-' }, { value: 3, operator: '+' }, { value: 8, operator: '+' }], answer: 17, opsCount: 4, digits: 1, category: 'single' },
  { id: 35, operations: [{ value: 6, operator: '-' }, { value: 4, operator: '+' }, { value: 9, operator: '+' }, { value: 5, operator: '-' }], answer: 6, opsCount: 4, digits: 1, category: 'single' },
  { id: 36, operations: [{ value: 8, operator: '+' }, { value: 7, operator: '-' }, { value: 6, operator: '+' }, { value: 4, operator: '+' }], answer: 13, opsCount: 4, digits: 1, category: 'single' },
  { id: 37, operations: [{ value: 9, operator: '+' }, { value: 5, operator: '-' }, { value: 3, operator: '-' }, { value: 6, operator: '+' }], answer: 5, opsCount: 4, digits: 1, category: 'single' },
  { id: 38, operations: [{ value: 4, operator: '+' }, { value: 9, operator: '-' }, { value: 7, operator: '+' }, { value: 5, operator: '+' }], answer: 11, opsCount: 4, digits: 1, category: 'single' },
  { id: 39, operations: [{ value: 7, operator: '-' }, { value: 3, operator: '+' }, { value: 6, operator: '+' }, { value: 8, operator: '+' }], answer: 18, opsCount: 4, digits: 1, category: 'single' },
  { id: 40, operations: [{ value: 6, operator: '+' }, { value: 8, operator: '-' }, { value: 9, operator: '+' }, { value: 4, operator: '+' }], answer: 9, opsCount: 4, digits: 1, category: 'single' },
  { id: 41, operations: [{ value: 5, operator: '+' }, { value: 7, operator: '+' }, { value: 3, operator: '-' }, { value: 8, operator: '+' }], answer: 7, opsCount: 4, digits: 1, category: 'single' },
  { id: 42, operations: [{ value: 9, operator: '-' }, { value: 5, operator: '-' }, { value: 2, operator: '+' }, { value: 6, operator: '+' }], answer: 8, opsCount: 4, digits: 1, category: 'single' },
  { id: 43, operations: [{ value: 8, operator: '+' }, { value: 4, operator: '+' }, { value: 5, operator: '-' }, { value: 9, operator: '+' }], answer: 8, opsCount: 4, digits: 1, category: 'single' },
  { id: 44, operations: [{ value: 7, operator: '+' }, { value: 9, operator: '-' }, { value: 5, operator: '-' }, { value: 3, operator: '+' }], answer: 8, opsCount: 4, digits: 1, category: 'single' },
  { id: 45, operations: [{ value: 6, operator: '-' }, { value: 3, operator: '+' }, { value: 8, operator: '+' }, { value: 4, operator: '-' }], answer: 7, opsCount: 4, digits: 1, category: 'single' },
  { id: 46, operations: [{ value: 9, operator: '+' }, { value: 6, operator: '-' }, { value: 8, operator: '+' }, { value: 5, operator: '+' }], answer: 12, opsCount: 4, digits: 1, category: 'single' },
  { id: 47, operations: [{ value: 5, operator: '+' }, { value: 8, operator: '-' }, { value: 6, operator: '+' }, { value: 7, operator: '+' }], answer: 14, opsCount: 4, digits: 1, category: 'single' },
  { id: 48, operations: [{ value: 4, operator: '+' }, { value: 6, operator: '+' }, { value: 9, operator: '-' }, { value: 5, operator: '+' }], answer: 14, opsCount: 4, digits: 1, category: 'single' },
  { id: 49, operations: [{ value: 8, operator: '-' }, { value: 5, operator: '+' }, { value: 7, operator: '+' }, { value: 4, operator: '+' }], answer: 14, opsCount: 4, digits: 1, category: 'single' },
  { id: 50, operations: [{ value: 7, operator: '+' }, { value: 5, operator: '-' }, { value: 6, operator: '+' }, { value: 3, operator: '+' }], answer: 9, opsCount: 4, digits: 1, category: 'single' },
  { id: 51, operations: [{ value: 9, operator: '+' }, { value: 4, operator: '-' }, { value: 8, operator: '+' }, { value: 7, operator: '+' }], answer: 12, opsCount: 4, digits: 1, category: 'single' },
  { id: 52, operations: [{ value: 5, operator: '+' }, { value: 9, operator: '-' }, { value: 4, operator: '+' }, { value: 6, operator: '+' }], answer: 16, opsCount: 4, digits: 1, category: 'single' },
  { id: 53, operations: [{ value: 8, operator: '-' }, { value: 6, operator: '+' }, { value: 5, operator: '-' }, { value: 3, operator: '+' }], answer: 4, opsCount: 4, digits: 1, category: 'single' },
  { id: 54, operations: [{ value: 7, operator: '+' }, { value: 8, operator: '-' }, { value: 5, operator: '+' }, { value: 4, operator: '+' }], answer: 14, opsCount: 4, digits: 1, category: 'single' },
  { id: 55, operations: [{ value: 6, operator: '+' }, { value: 9, operator: '-' }, { value: 7, operator: '-' }, { value: 2, operator: '+' }], answer: 6, opsCount: 4, digits: 1, category: 'single' },
  { id: 56, operations: [{ value: 9, operator: '-' }, { value: 8, operator: '+' }, { value: 7, operator: '+' }, { value: 3, operator: '+' }], answer: 11, opsCount: 4, digits: 1, category: 'single' },
  { id: 57, operations: [{ value: 4, operator: '+' }, { value: 5, operator: '+' }, { value: 8, operator: '-' }, { value: 6, operator: '+' }], answer: 11, opsCount: 4, digits: 1, category: 'single' },
  { id: 58, operations: [{ value: 8, operator: '+' }, { value: 3, operator: '-' }, { value: 4, operator: '+' }, { value: 9, operator: '+' }], answer: 16, opsCount: 4, digits: 1, category: 'single' },
  { id: 59, operations: [{ value: 7, operator: '-' }, { value: 4, operator: '+' }, { value: 9, operator: '+' }, { value: 5, operator: '-' }], answer: 7, opsCount: 4, digits: 1, category: 'single' },
  { id: 60, operations: [{ value: 6, operator: '+' }, { value: 7, operator: '-' }, { value: 3, operator: '-' }, { value: 4, operator: '+' }], answer: 6, opsCount: 4, digits: 1, category: 'single' },

  // ═══════════════════════════════════════════════════════════
  // المجموعة A: سلاسل آحاد — 5 عمليات (25 سؤالاً)
  // ═══════════════════════════════════════════════════════════
  { id: 61, operations: [{ value: 8, operator: '+' }, { value: 3, operator: '+' }, { value: 1, operator: '+' }, { value: 7, operator: '-' }, { value: 5, operator: '+' }], answer: 14, opsCount: 5, digits: 1, category: 'single' },
  { id: 62, operations: [{ value: 9, operator: '-' }, { value: 3, operator: '+' }, { value: 8, operator: '+' }, { value: 4, operator: '-' }, { value: 6, operator: '+' }], answer: 16, opsCount: 5, digits: 1, category: 'single' },
  { id: 63, operations: [{ value: 5, operator: '+' }, { value: 7, operator: '-' }, { value: 6, operator: '+' }, { value: 9, operator: '+' }, { value: 8, operator: '-' }], answer: 7, opsCount: 5, digits: 1, category: 'single' },
  { id: 64, operations: [{ value: 6, operator: '+' }, { value: 8, operator: '-' }, { value: 4, operator: '+' }, { value: 5, operator: '+' }, { value: 3, operator: '-' }], answer: 12, opsCount: 5, digits: 1, category: 'single' },
  { id: 65, operations: [{ value: 7, operator: '+' }, { value: 9, operator: '+' }, { value: 2, operator: '+' }, { value: 6, operator: '-' }, { value: 5, operator: '-' }], answer: 7, opsCount: 5, digits: 1, category: 'single' },
  { id: 66, operations: [{ value: 8, operator: '-' }, { value: 5, operator: '+' }, { value: 6, operator: '+' }, { value: 7, operator: '+' }, { value: 9, operator: '-' }], answer: 7, opsCount: 5, digits: 1, category: 'single' },
  { id: 67, operations: [{ value: 9, operator: '+' }, { value: 4, operator: '-' }, { value: 3, operator: '+' }, { value: 8, operator: '+' }, { value: 6, operator: '-' }], answer: 12, opsCount: 5, digits: 1, category: 'single' },
  { id: 68, operations: [{ value: 5, operator: '-' }, { value: 2, operator: '+' }, { value: 9, operator: '+' }, { value: 6, operator: '+' }, { value: 4, operator: '-' }], answer: 14, opsCount: 5, digits: 1, category: 'single' },
  { id: 69, operations: [{ value: 7, operator: '+' }, { value: 6, operator: '-' }, { value: 8, operator: '+' }, { value: 5, operator: '+' }, { value: 3, operator: '+' }], answer: 13, opsCount: 5, digits: 1, category: 'single' },
  { id: 70, operations: [{ value: 9, operator: '-' }, { value: 4, operator: '+' }, { value: 7, operator: '+' }, { value: 5, operator: '-' }, { value: 8, operator: '+' }], answer: 15, opsCount: 5, digits: 1, category: 'single' },
  { id: 71, operations: [{ value: 6, operator: '+' }, { value: 9, operator: '+' }, { value: 4, operator: '-' }, { value: 7, operator: '-' }, { value: 3, operator: '+' }], answer: 9, opsCount: 5, digits: 1, category: 'single' },
  { id: 72, operations: [{ value: 8, operator: '-' }, { value: 3, operator: '+' }, { value: 5, operator: '+' }, { value: 9, operator: '+' }, { value: 6, operator: '-' }], answer: 13, opsCount: 5, digits: 1, category: 'single' },
  { id: 73, operations: [{ value: 4, operator: '+' }, { value: 8, operator: '-' }, { value: 7, operator: '+' }, { value: 6, operator: '+' }, { value: 5, operator: '+' }], answer: 16, opsCount: 5, digits: 1, category: 'single' },
  { id: 74, operations: [{ value: 7, operator: '+' }, { value: 5, operator: '+' }, { value: 8, operator: '-' }, { value: 9, operator: '-' }, { value: 4, operator: '+' }], answer: 7, opsCount: 5, digits: 1, category: 'single' },
  { id: 75, operations: [{ value: 9, operator: '+' }, { value: 3, operator: '-' }, { value: 6, operator: '+' }, { value: 4, operator: '+' }, { value: 7, operator: '+' }], answer: 17, opsCount: 5, digits: 1, category: 'single' },
  { id: 76, operations: [{ value: 5, operator: '+' }, { value: 6, operator: '+' }, { value: 7, operator: '-' }, { value: 8, operator: '-' }, { value: 9, operator: '+' }], answer: 1, opsCount: 5, digits: 1, category: 'single' },
  { id: 77, operations: [{ value: 8, operator: '+' }, { value: 9, operator: '-' }, { value: 7, operator: '+' }, { value: 3, operator: '+' }, { value: 5, operator: '-' }], answer: 8, opsCount: 5, digits: 1, category: 'single' },
  { id: 78, operations: [{ value: 4, operator: '+' }, { value: 7, operator: '+' }, { value: 8, operator: '-' }, { value: 5, operator: '-' }, { value: 6, operator: '+' }], answer: 8, opsCount: 5, digits: 1, category: 'single' },
  { id: 79, operations: [{ value: 6, operator: '+' }, { value: 5, operator: '-' }, { value: 9, operator: '+' }, { value: 8, operator: '+' }, { value: 4, operator: '-' }], answer: 6, opsCount: 5, digits: 1, category: 'single' },
  { id: 80, operations: [{ value: 9, operator: '+' }, { value: 8, operator: '-' }, { value: 5, operator: '-' }, { value: 7, operator: '+' }, { value: 6, operator: '+' }], answer: 11, opsCount: 5, digits: 1, category: 'single' },
  { id: 81, operations: [{ value: 7, operator: '+' }, { value: 4, operator: '+' }, { value: 6, operator: '-' }, { value: 9, operator: '-' }, { value: 3, operator: '+' }], answer: 5, opsCount: 5, digits: 1, category: 'single' },
  { id: 82, operations: [{ value: 5, operator: '+' }, { value: 9, operator: '-' }, { value: 6, operator: '-' }, { value: 4, operator: '+' }, { value: 8, operator: '+' }], answer: 12, opsCount: 5, digits: 1, category: 'single' },
  { id: 83, operations: [{ value: 8, operator: '+' }, { value: 6, operator: '+' }, { value: 5, operator: '-' }, { value: 7, operator: '-' }, { value: 9, operator: '+' }], answer: 3, opsCount: 5, digits: 1, category: 'single' },
  { id: 84, operations: [{ value: 6, operator: '+' }, { value: 4, operator: '-' }, { value: 8, operator: '+' }, { value: 9, operator: '+' }, { value: 5, operator: '-' }], answer: 6, opsCount: 5, digits: 1, category: 'single' },
  { id: 85, operations: [{ value: 9, operator: '+' }, { value: 7, operator: '-' }, { value: 5, operator: '+' }, { value: 6, operator: '+' }, { value: 8, operator: '-' }], answer: 9, opsCount: 5, digits: 1, category: 'single' },

  // ═══════════════════════════════════════════════════════════
  // المجموعة B: سلاسل مختلطة (منزلة + منزلتين) — 3 عمليات (5 أسئلة)
  // ═══════════════════════════════════════════════════════════
  { id: 86, operations: [{ value: 12, operator: '+' }, { value: 5, operator: '-' }, { value: 8, operator: '+' }], answer: 9, opsCount: 3, digits: 2, category: 'mixed' },
  { id: 87, operations: [{ value: 34, operator: '-' }, { value: 15, operator: '+' }, { value: 6, operator: '+' }], answer: 25, opsCount: 3, digits: 2, category: 'mixed' },
  { id: 88, operations: [{ value: 9, operator: '+' }, { value: 21, operator: '-' }, { value: 12, operator: '+' }], answer: 18, opsCount: 3, digits: 2, category: 'mixed' },
  { id: 89, operations: [{ value: 45, operator: '-' }, { value: 8, operator: '-' }, { value: 7, operator: '+' }], answer: 30, opsCount: 3, digits: 2, category: 'mixed' },
  { id: 90, operations: [{ value: 15, operator: '+' }, { value: 9, operator: '-' }, { value: 20, operator: '+' }], answer: 4, opsCount: 3, digits: 2, category: 'mixed' },

  // ═══════════════════════════════════════════════════════════
  // المجموعة B: سلاسل مختلطة — 4 عمليات (5 أسئلة)
  // ═══════════════════════════════════════════════════════════
  { id: 91, operations: [{ value: 12, operator: '+' }, { value: 21, operator: '+' }, { value: 55, operator: '+' }, { value: 13, operator: '-' }], answer: 75, opsCount: 4, digits: 2, category: 'mixed' },
  { id: 92, operations: [{ value: 47, operator: '-' }, { value: 25, operator: '+' }, { value: 30, operator: '+' }, { value: 11, operator: '-' }], answer: 63, opsCount: 4, digits: 2, category: 'mixed' },
  { id: 93, operations: [{ value: 8, operator: '+' }, { value: 9, operator: '-' }, { value: 12, operator: '+' }, { value: 15, operator: '+' }], answer: 20, opsCount: 4, digits: 2, category: 'mixed' },
  { id: 94, operations: [{ value: 45, operator: '+' }, { value: 18, operator: '-' }, { value: 27, operator: '+' }, { value: 14, operator: '+' }], answer: 50, opsCount: 4, digits: 2, category: 'mixed' },
  { id: 95, operations: [{ value: 23, operator: '-' }, { value: 15, operator: '+' }, { value: 46, operator: '+' }, { value: 8, operator: '-' }], answer: 46, opsCount: 4, digits: 2, category: 'mixed' },

  // ═══════════════════════════════════════════════════════════
  // المجموعة B: سلاسل مختلطة — 5 عمليات (5 أسئلة)
  // ═══════════════════════════════════════════════════════════
  { id: 96, operations: [{ value: 12, operator: '+' }, { value: 8, operator: '+' }, { value: 21, operator: '-' }, { value: 15, operator: '+' }, { value: 9, operator: '+' }], answer: 35, opsCount: 5, digits: 2, category: 'mixed' },
  { id: 97, operations: [{ value: 45, operator: '-' }, { value: 30, operator: '+' }, { value: 12, operator: '+' }, { value: 8, operator: '-' }, { value: 15, operator: '+' }], answer: 20, opsCount: 5, digits: 2, category: 'mixed' },
  { id: 98, operations: [{ value: 8, operator: '+' }, { value: 30, operator: '-' }, { value: 14, operator: '+' }, { value: 25, operator: '-' }, { value: 7, operator: '+' }], answer: 42, opsCount: 5, digits: 2, category: 'mixed' },
  { id: 99, operations: [{ value: 55, operator: '+' }, { value: 12, operator: '-' }, { value: 30, operator: '+' }, { value: 8, operator: '+' }, { value: 4, operator: '+' }], answer: 49, opsCount: 5, digits: 2, category: 'mixed' },
  { id: 100, operations: [{ value: 20, operator: '-' }, { value: 12, operator: '+' }, { value: 8, operator: '+' }, { value: 35, operator: '-' }, { value: 15, operator: '+' }], answer: 36, opsCount: 5, digits: 2, category: 'mixed' },
];

// ═══════════════════════════════════════════════════════════
// دوال مساعدة للامتحان
// ═══════════════════════════════════════════════════════════

/** يختار 25 سؤالاً عشوائياً — 4 منها بأرقام منزلتين على الأقل */
export function pickRandomExamQuestions(): ExamQuestion[] {
  const mixedPool = EXAM_BANK.filter((q) => q.digits === 2);
  const singlePool = EXAM_BANK.filter((q) => q.digits === 1);

  // 4 أسئلة بأرقام منزلتين
  const pickedMixed = shuffleArray(mixedPool).slice(0, 4);
  // 21 سؤالاً بأرقام منزلة
  const pickedSingle = shuffleArray(singlePool).slice(0, 21);

  // خلطهم معاً
  return shuffleArray([...pickedMixed, ...pickedSingle]);
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** تحويل سؤال إلى نص لعرضه */
export function formatQuestion(q: ExamQuestion): string {
  if (q.operations.length === 0) return '';
  const first = String(q.operations[0].value);
  const rest = q.operations
    .map((op) => ` ${op.operator} ${op.value}`)
    .join('');
  // العملية الأولى تأخذ أول قيمة فقط، ثم ندخل من الفهرس 1
  const parts: string[] = [first];
  for (let i = 0; i < q.operations.length; i++) {
    const op = q.operations[i];
    if (i === 0) {
      // القيمة الأولى مطبوعة، العملية تُضاف للاحق
      continue;
    }
    parts.push(`${op.operator} ${op.value}`);
  }
  return parts.join(' ') + ' = ؟';
}