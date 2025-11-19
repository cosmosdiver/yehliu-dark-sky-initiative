'use client';

import { useEffect } from 'react';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedTexts: string[];
  onRemove: (index: number) => void;
}

export default function CollectionModal({
  isOpen,
  onClose,
  collectedTexts,
  onRemove,
}: CollectionModalProps) {
  // ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto p-8
                   bg-black/60 border border-white/20 backdrop-blur-lg rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 標題 */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h2 className="text-2xl text-white/90 font-light tracking-wide">
              我的收藏
            </h2>
            <span className="text-sm text-white/50">
              ({collectedTexts.length})
            </span>
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

        {/* 收藏列表 */}
        {collectedTexts.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <p className="text-sm tracking-wider">尚無收藏</p>
            <p className="text-xs mt-2">點擊星空中的文字來收藏喜歡的段落</p>
          </div>
        ) : (
          <div className="space-y-4">
            {collectedTexts.map((text, index) => (
              <div
                key={index}
                className="p-4 border border-white/10 hover:border-white/20
                           bg-white/5 transition-colors group"
              >
                <p className="text-white/70 leading-relaxed tracking-wide text-sm whitespace-pre-wrap">
                  {text}
                </p>
                <div className="flex items-center justify-end mt-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => onRemove(index)}
                    className="text-xs text-red-400/60 hover:text-red-400
                               transition-colors tracking-wider"
                  >
                    移除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => {
              const text = collectedTexts.join('\n\n---\n\n');
              navigator.clipboard.writeText(text);
              alert('已複製到剪貼簿');
            }}
            disabled={collectedTexts.length === 0}
            className="px-4 py-2 text-sm tracking-wider text-white/60
                       hover:text-white/90 transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            複製全部
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm tracking-wider text-white/60
                       hover:text-white/90 transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
