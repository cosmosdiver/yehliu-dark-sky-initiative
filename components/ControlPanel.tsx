'use client';

interface ControlPanelProps {
  isPaused: boolean;
  onPauseToggle: () => void;
  speedMultiplier: number;
  onSpeedChange: (speed: number) => void;
  filterCategory: 'q1' | 'q2' | 'q3' | 'all';
  onFilterChange: (category: 'q1' | 'q2' | 'q3' | 'all') => void;
  collectedCount: number;
  onShowCollection: () => void;
}

export default function ControlPanel({
  isPaused,
  onPauseToggle,
  speedMultiplier,
  onSpeedChange,
  filterCategory,
  onFilterChange,
  collectedCount,
  onShowCollection,
}: ControlPanelProps) {
  return (
    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-40 space-y-2 md:space-y-4">
      {/* 暫停/繼續 */}
      <button
        onClick={onPauseToggle}
        className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 text-cyan-300/80 hover:text-cyan-300
                   bg-white/5 hover:bg-white/10 backdrop-blur-xl
                   border border-cyan-400/20 hover:border-cyan-400/40
                   rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105
                   text-xs md:text-sm tracking-wider shadow-lg"
      >
        {isPaused ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            繼續
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            暫停
          </>
        )}
      </button>

      {/* 速度控制 */}
      <div className="px-4 py-4 md:px-7 md:py-6 bg-white/5 backdrop-blur-xl
                     border border-cyan-400/20 rounded-xl md:rounded-2xl shadow-lg">
        <div className="text-xs text-cyan-300/60 mb-3 md:mb-4 tracking-wider font-light">
          速度：{speedMultiplier === 0.3 ? '慢' : speedMultiplier === 0.6 ? '中' : '快'}
        </div>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => onSpeedChange(0.3)}
            className={`px-4 py-2 text-xs tracking-wider transition-all duration-300 rounded-xl
                       ${speedMultiplier === 0.3
                         ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                         : 'text-cyan-300/40 hover:text-cyan-300/80 hover:bg-white/5'}`}
          >
            慢
          </button>
          <button
            onClick={() => onSpeedChange(0.6)}
            className={`px-4 py-2 text-xs tracking-wider transition-all duration-300 rounded-xl
                       ${speedMultiplier === 0.6
                         ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                         : 'text-cyan-300/40 hover:text-cyan-300/80 hover:bg-white/5'}`}
          >
            中
          </button>
          <button
            onClick={() => onSpeedChange(1.0)}
            className={`px-4 py-2 text-xs tracking-wider transition-all duration-300 rounded-xl
                       ${speedMultiplier === 1.0
                         ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                         : 'text-cyan-300/40 hover:text-cyan-300/80 hover:bg-white/5'}`}
          >
            快
          </button>
        </div>
      </div>

      {/* 篩選控制 */}
      <div className="px-4 py-4 md:px-7 md:py-6 bg-white/5 backdrop-blur-xl
                     border border-cyan-400/20 rounded-xl md:rounded-2xl shadow-lg">
        <div className="text-xs text-cyan-300/60 mb-3 md:mb-4 tracking-wider font-light">
          浮現觀點
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 text-xs tracking-wider text-left transition-all duration-300 rounded-xl
                       ${filterCategory === 'all'
                         ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                         : 'text-cyan-300/40 hover:text-cyan-300/80 hover:bg-white/5'}`}
          >
            全部
          </button>
          <button
            onClick={() => onFilterChange('q1')}
            className={`px-4 py-2 text-xs tracking-wider text-left transition-all duration-300 rounded-xl
                       ${filterCategory === 'q1'
                         ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                         : 'text-blue-300/40 hover:text-blue-300/80 hover:bg-white/5'}`}
          >
            場域精神
          </button>
          <button
            onClick={() => onFilterChange('q2')}
            className={`px-4 py-2 text-xs tracking-wider text-left transition-all duration-300 rounded-xl
                       ${filterCategory === 'q2'
                         ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                         : 'text-green-300/40 hover:text-green-300/80 hover:bg-white/5'}`}
          >
            藝術影響
          </button>
          <button
            onClick={() => onFilterChange('q3')}
            className={`px-4 py-2 text-xs tracking-wider text-left transition-all duration-300 rounded-xl
                       ${filterCategory === 'q3'
                         ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                         : 'text-purple-300/40 hover:text-purple-300/80 hover:bg-white/5'}`}
          >
            靈感啟發
          </button>
        </div>
      </div>

      {/* 收藏 */}
      {collectedCount > 0 && (
        <button
          onClick={onShowCollection}
          className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 text-yellow-300/80 hover:text-yellow-300
                     bg-white/5 hover:bg-white/10 backdrop-blur-xl
                     border border-yellow-400/30 hover:border-yellow-400/50
                     rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105
                     text-xs md:text-sm tracking-wider shadow-lg"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          收藏 ({collectedCount})
        </button>
      )}
    </div>
  );
}
