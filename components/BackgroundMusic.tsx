'use client';

import { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

// Arvo Pärt - Für Alina 的 YouTube 影片 ID
// 可以替換為其他版本的影片 ID
const YOUTUBE_VIDEO_ID = 'TJ6Mzvh3XCc'; // 範例 ID，可替換為實際的影片

interface BackgroundMusicProps {
  onMusicStart?: () => void;
}

export default function BackgroundMusic({ onMusicStart }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const playerRef = useRef<YouTubePlayer | null>(null);

  // YouTube Player 選項
  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID, // 循環播放需要設定 playlist
      modestbranding: 1,
      rel: 0,
      playsinline: 1, // 允許在行動裝置上內嵌播放
      enablejsapi: 1, // 啟用 JavaScript API
    },
  };

  // 當播放器準備好時
  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    // 設定音量為 45%
    event.target.setVolume(45);
  };

  // 開始播放音樂
  const handleStartMusic = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setShowStartButton(false);
      onMusicStart?.();
    }
  };

  // 切換靜音
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* 隱藏的 YouTube 播放器 */}
      <div className="hidden">
        <YouTube
          videoId={YOUTUBE_VIDEO_ID}
          opts={opts}
          onReady={onReady}
        />
      </div>

      {/* 開啟聲音按鈕（初始畫面） */}
      {showStartButton && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/40">
          <div className="text-center space-y-8 px-8 py-12 rounded-3xl bg-white/5 backdrop-blur-xl
                         border border-white/10 shadow-2xl max-w-md mx-4">
            <h2 className="text-4xl md:text-5xl text-white font-light tracking-wide">
              野柳暗空倡議
            </h2>
            <p className="text-base md:text-lg text-cyan-300/80 leading-relaxed">
              藝術、文化與自然場域的對話之夜
            </p>

            {/* 建議使用電腦瀏覽器 */}
            <div className="px-6 py-4 bg-yellow-500/10 border border-yellow-400/30 rounded-2xl">
              <p className="text-sm text-yellow-300/90 font-light leading-relaxed">
                💻 建議使用電腦瀏覽器以獲得最佳體驗
              </p>
              <p className="text-xs text-yellow-300/60 mt-2 font-light">
                （行動裝置可能無法播放背景音樂）
              </p>
            </div>

            <button
              onClick={handleStartMusic}
              className="mt-8 px-10 py-4 text-white bg-cyan-500/20 hover:bg-cyan-500/30
                         border border-cyan-400/30 hover:border-cyan-400/60
                         rounded-full transition-all duration-500 hover:scale-105
                         text-base tracking-widest shadow-lg hover:shadow-cyan-500/20"
            >
              開啟聲音體驗
            </button>
            <p className="text-sm text-cyan-300/50 mt-4 font-light">
              Arvo Pärt - Für Alina
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-300/30 hover:text-cyan-300/60 transition-colors
                         underline underline-offset-2"
            >
              音樂來源
            </a>
          </div>
        </div>
      )}

      {/* 音樂控制按鈕（播放後顯示） */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="fixed bottom-8 right-8 z-40 p-4 text-cyan-300/70 hover:text-cyan-300
                     bg-white/5 hover:bg-white/10 backdrop-blur-xl
                     border border-cyan-400/20 hover:border-cyan-400/40
                     rounded-2xl transition-all duration-500 hover:scale-110
                     shadow-lg hover:shadow-cyan-500/20"
          aria-label={isMuted ? '取消靜音' : '靜音'}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
