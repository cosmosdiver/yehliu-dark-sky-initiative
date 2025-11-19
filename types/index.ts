// 問卷回應的資料結構
export interface Response {
  question1: string; // 場域精神
  question2: string; // 藝術影響
  question3: string; // 靈感啟發
}

// 關鍵詞結構
export interface Keyword {
  text: string;
  frequency: number;
  category: 'q1' | 'q2' | 'q3' | 'all'; // 關鍵詞來自哪個問題
  responses: number[]; // 包含此關鍵詞的回應索引
}

// 流動文字星星結構
export interface FloatingWord {
  id: string;
  text: string;
  x: number; // 初始 x 位置 (%)
  y: number; // 初始 y 位置 (%)
  speed: number; // 漂浮速度
  size: number; // 文字大小
  opacity: number;
  category: 'q1' | 'q2' | 'q3';
  responseIndex: number; // 對應的回應索引
  fullText: string; // 完整段落
}

// 星團結構（相似概念聚集）
export interface WordCluster {
  id: string;
  words: FloatingWord[];
  centerX: number;
  centerY: number;
  theme: string; // 主題名稱
}
