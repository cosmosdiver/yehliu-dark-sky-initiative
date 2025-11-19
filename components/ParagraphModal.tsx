'use client';

import { useEffect } from 'react';
import type { FloatingWord, Response } from '@/types';

interface ParagraphModalProps {
  word: FloatingWord | null;
  response: Response | null;
  onClose: () => void;
  onCollect?: (text: string) => void;
  isCollected?: boolean;
}

export default function ParagraphModal({
  word,
  response,
  onClose,
  onCollect,
  isCollected = false,
}: ParagraphModalProps) {
  // ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!word || !response) return null;

  // 獲取問題標題
  const getQuestionTitle = (category: 'q1' | 'q2' | 'q3') => {
    switch (category) {
      case 'q1': return '場域精神';
      case 'q2': return '藝術影響';
      case 'q3': return '靈感啟發';
    }
  };

  // 獲取分類顏色
  const getCategoryColor = (category: 'q1' | 'q2' | 'q3') => {
    switch (category) {
      case 'q1': return 'border-blue-400/50 text-blue-300';
      case 'q2': return 'border-green-400/50 text-green-300';
      case 'q3': return 'border-purple-400/50 text-purple-300';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full mx-4 p-8 bg-black/60 border border-white/20
                   backdrop-blur-lg rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 標題 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className={`inline-block px-3 py-1 border text-xs tracking-wider mb-2
                           ${getCategoryColor(word.category)}`}>
              {getQuestionTitle(word.category)}
            </div>
            <h3 className="text-2xl text-white/90 font-light tracking-wide">
              {word.text}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors"
            aria-label="關閉"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 完整段落 */}
        <div className="space-y-4 text-white/70 leading-relaxed tracking-wide">
          <p className="text-base font-light whitespace-pre-wrap">
            {word.fullText}
          </p>
        </div>

        {/* 操作按鈕 */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => onCollect?.(word.fullText)}
            className={`flex items-center gap-2 px-4 py-2 text-sm tracking-wider
                       border transition-all duration-300
                       ${isCollected
                         ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                         : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/90'
                       }`}
          >
            <svg className="w-4 h-4" fill={isCollected ? 'currentColor' : 'none'}
                 stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {isCollected ? '已收藏' : '收藏'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm tracking-wider text-white/60
                       hover:text-white/90 transition-colors"
          >
            繼續探索
          </button>
        </div>
      </div>
    </div>
  );
}
