'use client';

import { useState, useEffect, useMemo } from 'react';
import BackgroundMusic from '@/components/BackgroundMusic';
import ParticleBackground from '@/components/ParticleBackground';
import StarfieldPoetry from '@/components/StarfieldPoetry';
import ParagraphModal from '@/components/ParagraphModal';
import ControlPanel from '@/components/ControlPanel';
import CollectionModal from '@/components/CollectionModal';
import { processRawData, extractKeywords, generateFloatingWords } from '@/lib/dataProcessor';
import type { FloatingWord, Response } from '@/types';

export default function Home() {
  // 資料狀態
  const [responses, setResponses] = useState<Response[]>([]);
  const [words, setWords] = useState<FloatingWord[]>([]);

  // UI 狀態
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.6); // 預設中速
  const [filterCategory, setFilterCategory] = useState<'q1' | 'q2' | 'q3' | 'all'>('all');

  // 選中的文字
  const [selectedWord, setSelectedWord] = useState<FloatingWord | null>(null);

  // 收藏
  const [collectedTexts, setCollectedTexts] = useState<string[]>([]);
  const [showCollection, setShowCollection] = useState(false);

  // 載入資料
  useEffect(() => {
    const loadedResponses = processRawData();
    const keywords = extractKeywords(loadedResponses);
    const floatingWords = generateFloatingWords(loadedResponses, keywords);

    setResponses(loadedResponses);
    setWords(floatingWords);
  }, []);

  // 處理文字點擊
  const handleWordClick = (word: FloatingWord) => {
    setSelectedWord(word);
    setIsPaused(true);
  };

  // 關閉對話框
  const handleCloseModal = () => {
    setSelectedWord(null);
    setIsPaused(false);
  };

  // 收藏文字
  const handleCollect = (text: string) => {
    if (!collectedTexts.includes(text)) {
      setCollectedTexts([...collectedTexts, text]);
    } else {
      setCollectedTexts(collectedTexts.filter(t => t !== text));
    }
  };

  // 移除收藏
  const handleRemoveCollection = (index: number) => {
    setCollectedTexts(collectedTexts.filter((_, i) => i !== index));
  };

  // 檢查是否已收藏
  const isCollected = useMemo(() => {
    if (!selectedWord) return false;
    return collectedTexts.includes(selectedWord.fullText);
  }, [selectedWord, collectedTexts]);

  // 獲取選中文字的完整回應
  const selectedResponse = useMemo(() => {
    if (!selectedWord) return null;
    return responses[selectedWord.responseIndex];
  }, [selectedWord, responses]);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 背景音樂 */}
      <BackgroundMusic />

      {/* 星空文字 */}
      {words.length > 0 && (
        <StarfieldPoetry
          words={words}
          responses={responses}
          isPaused={isPaused}
          onWordClick={handleWordClick}
          speedMultiplier={speedMultiplier}
          filterCategory={filterCategory}
        />
      )}

      {/* 控制面板 */}
      <ControlPanel
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        speedMultiplier={speedMultiplier}
        onSpeedChange={setSpeedMultiplier}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
        collectedCount={collectedTexts.length}
        onShowCollection={() => setShowCollection(true)}
      />

      {/* 段落對話框 */}
      <ParagraphModal
        word={selectedWord}
        response={selectedResponse}
        onClose={handleCloseModal}
        onCollect={handleCollect}
        isCollected={isCollected}
      />

      {/* 收藏對話框 */}
      <CollectionModal
        isOpen={showCollection}
        onClose={() => setShowCollection(false)}
        collectedTexts={collectedTexts}
        onRemove={handleRemoveCollection}
      />

      {/* 說明文字 */}
      <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-40 px-4 py-3 md:px-6 md:py-4 bg-white/5 backdrop-blur-xl
                     border border-cyan-400/10 rounded-xl md:rounded-2xl">
        <p className="text-cyan-300/40 text-xs tracking-wider font-light">
          點擊文字可展開完整段落
        </p>
        <p className="text-cyan-300/40 text-xs tracking-wider font-light mt-1 md:mt-2">
          ESC 關閉對話框
        </p>
      </div>

      {/* 建議使用電腦瀏覽器提示 */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 px-4 py-3 md:px-6 md:py-4
                     bg-yellow-500/10 backdrop-blur-xl border border-yellow-400/30
                     rounded-xl md:rounded-2xl shadow-lg max-w-xs">
        <p className="text-sm md:text-base text-yellow-300/90 font-light leading-relaxed">
          💻 建議使用電腦瀏覽器
        </p>
        <p className="text-xs text-yellow-300/60 mt-1 md:mt-2 font-light">
          以獲得最佳體驗與音樂播放
        </p>
      </div>
    </main>
  );
}
