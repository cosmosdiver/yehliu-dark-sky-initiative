'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import type { FloatingWord, Response } from '@/types';

interface StarfieldPoetryProps {
  words: FloatingWord[];
  responses: Response[];
  isPaused: boolean;
  onWordClick: (word: FloatingWord) => void;
  speedMultiplier: number; // 慢讀模式的速度倍數
  filterCategory?: 'q1' | 'q2' | 'q3' | 'all';
}

export default function StarfieldPoetry({
  words,
  responses,
  isPaused,
  onWordClick,
  speedMultiplier,
  filterCategory = 'all',
}: StarfieldPoetryProps) {
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(Date.now());

  // 篩選要顯示的文字 - 使用 useMemo 避免無限循環
  const filteredWords = useMemo(() => {
    return filterCategory === 'all'
      ? words
      : words.filter(word => word.category === filterCategory);
  }, [words, filterCategory]);

  // 初始化位置
  useEffect(() => {
    const initialPositions = new Map<string, { x: number; y: number }>();
    filteredWords.forEach(word => {
      initialPositions.set(word.id, { x: word.x, y: word.y });
    });
    setPositions(initialPositions);
  }, [filteredWords]);

  // 簡單的上下漂浮動畫
  useEffect(() => {
    if (isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      const now = Date.now();
      const time = now / 1000; // 轉換為秒

      setPositions(prevPositions => {
        const newPositions = new Map(prevPositions);

        filteredWords.forEach((word, index) => {
          const basePos = { x: word.x, y: word.y };

          // 簡單的正弦波上下漂浮
          const offsetY = Math.sin(time * word.speed * speedMultiplier + index) * 2;
          const offsetX = Math.cos(time * word.speed * speedMultiplier * 0.5 + index) * 1;

          newPositions.set(word.id, {
            x: basePos.x + offsetX,
            y: basePos.y + offsetY
          });
        });

        return newPositions;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, filteredWords, speedMultiplier]);

  // 獲取分類的顏色
  const getCategoryColor = (category: 'q1' | 'q2' | 'q3') => {
    switch (category) {
      case 'q1': return 'text-blue-200/80'; // 場域精神
      case 'q2': return 'text-green-200/80'; // 藝術影響
      case 'q3': return 'text-purple-200/80'; // 靈感啟發
      default: return 'text-white/80';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 流動文字 */}
      {filteredWords.map((word) => {
        const pos = positions.get(word.id);
        if (!pos) return null;

        return (
          <button
            key={word.id}
            onClick={() => onWordClick(word)}
            className={`absolute whitespace-nowrap cursor-pointer pointer-events-auto
                       transition-all duration-500 hover:scale-125
                       ${getCategoryColor(word.category)}
                       hover:text-cyan-200 hover:drop-shadow-[0_0_10px_rgba(102,252,241,0.8)]
                       font-light tracking-wider
                       ${isPaused ? 'animate-pulse' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: `${word.size}px`,
              opacity: word.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {word.text}
          </button>
        );
      })}
    </div>
  );
}
