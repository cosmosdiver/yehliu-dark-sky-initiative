import type { Response, Keyword, FloatingWord } from '@/types';
import rawData from '../data.json';

// 將原始資料轉換為統一格式
export function processRawData(): Response[] {
  return rawData.map((item: any) => ({
    question1: item['在你印象中，當您身處夜晚海岸的自然場域時，您最想探索或感受它哪一種「場域精神」(Genius Loci)？ (例如：時間的痕跡、海浪的聲音、夜的寂靜、岩石堅實等。請簡述)'] || '',
    question2: item['您認為藝術或文化在面對「自然場域」時，最能夠發揮的影響力或連結方式是什麼？ (例如：重新詮釋地景、創造新的儀式、記錄變遷、或促進公眾對話等。請簡述)'] || '',
    question3: item['您希望在本次夜遊的體驗中，獲得什麼樣的靈感啟發？ (請簡述)'] || '',
  }));
}

// 萃取關鍵詞的簡單邏輯
export function extractKeywords(responses: Response[]): Keyword[] {
  const keywordMap = new Map<string, { count: number; responses: Set<number>; category: Set<string> }>();

  // 定義要萃取的關鍵詞列表 - 擴充版
  const targetKeywords = [
    // 時間相關
    '時間', '遺痕', '變遷', '里程', '改變', '歷史', '經年',

    // 自然元素
    '海浪', '星空', '夜', '暗', '暗空', '寂靜', '聲音', '聲響', '海洋', '星', '浪',
    '黑', '光', '月', '月色', '風', '風向', '空氣', '潮汐', '礁岩', '沙灘', '石礫',
    '海域', '宇宙', '大地', '地景', '場域', '自然',

    // 感官體驗
    '氣味', '味道', '質地', '溫度', '濕度', '紋理', '體感', '觸感',
    '視覺', '聽覺', '感官', '本能', '敏感度', '動能', '身體',

    // 抽象概念
    '連結', '能量', '生命', '生命力', '精神', '養分', '靈感', '啟發',
    '想像', '想像力', '敬畏', '融合', '一體', '冥想', '沉思', '寧靜',
    '模糊', '流動', '開放', '沉默', '節奏', '層次', '單一性', '宇宙性',

    // 藝術文化
    '藝術', '創作', '表達', '詮釋', '敘事', '語言', '儀式', '裝置', '表演',
    '體驗', '探索', '感受', '記憶', '對話', '轉化', '力量', '深刻',

    // 動作
    '尋找', '打開', '弱化', '強化', '重新', '創造', '記錄', '促進',
    '瞭解', '產生', '提出', '攪動', '融入', '放大', '聽見',

    // 特殊詞組
    '場域精神', '海盡頭', '星光', '大自然', '大地媽媽',
    '環保議題', '生物本能', '感官經驗', '心情', '當下', '過程'
  ];

  responses.forEach((response, index) => {
    // 處理三個問題
    [
      { text: response.question1, category: 'q1' },
      { text: response.question2, category: 'q2' },
      { text: response.question3, category: 'q3' },
    ].forEach(({ text, category }) => {
      targetKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          const existing = keywordMap.get(keyword) || {
            count: 0,
            responses: new Set<number>(),
            category: new Set<string>()
          };
          existing.count += 1;
          existing.responses.add(index);
          existing.category.add(category);
          keywordMap.set(keyword, existing);
        }
      });
    });
  });

  // 轉換為陣列並排序
  return Array.from(keywordMap.entries())
    .map(([text, data]) => ({
      text,
      frequency: data.count,
      category: data.category.size > 1 ? 'all' : Array.from(data.category)[0] as any,
      responses: Array.from(data.responses),
    }))
    .filter(keyword => keyword.frequency >= 1) // 至少出現 1 次
    .sort((a, b) => b.frequency - a.frequency);
}

// 生成流動文字星星
export function generateFloatingWords(
  responses: Response[],
  keywords: Keyword[]
): FloatingWord[] {
  const words: FloatingWord[] = [];
  let idCounter = 0;

  // 追蹤已使用的段落，避免重複
  const usedTexts = new Set<string>();

  // 遍歷關鍵詞，直到收集到 70 個不重複段落的關鍵詞
  let keywordIndex = 0;

  while (words.length < 70 && keywordIndex < keywords.length) {
    const keyword = keywords[keywordIndex];
    keywordIndex++;

    // 嘗試找到一個未使用的段落
    let foundUnusedText = false;

    for (const responseIndex of keyword.responses) {
      const response = responses[responseIndex];

      // 檢查三個問題，找出包含關鍵詞的問題
      const questions = [
        { text: response.question1, category: 'q1' as const },
        { text: response.question2, category: 'q2' as const },
        { text: response.question3, category: 'q3' as const },
      ];

      for (const { text, category } of questions) {
        if (text.includes(keyword.text) && !usedTexts.has(text)) {
          // 找到一個未使用的段落
          usedTexts.add(text);

          words.push({
            id: `word-${idCounter++}`,
            text: keyword.text,
            x: Math.random() * 85 + 7.5, // 7.5-92.5% 更廣的分散範圍
            y: Math.random() * 85 + 7.5, // 7.5-92.5% 更廣的分散範圍
            speed: 0.2 + Math.random() * 0.3, // 0.2-0.5 更慢
            size: 18 + (keyword.frequency * 2.5), // 稍小的字體 18-35px
            opacity: 0.5 + (Math.random() * 0.5), // 0.5-1.0 更廣的透明度範圍
            category,
            responseIndex,
            fullText: text,
          });

          foundUnusedText = true;
          break;
        }
      }

      if (foundUnusedText) break;
    }
  }

  return words;
}

// 生成完整的短句（用於展示）
export function generatePoetryPhrases(responses: Response[]): string[] {
  const phrases: string[] = [];

  responses.forEach(response => {
    // 從每個回應中提取短句（用標點符號分割）
    const allText = `${response.question1} ${response.question2} ${response.question3}`;
    const sentences = allText.split(/[。，、！？\n]/).filter(s => s.trim().length > 0);

    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 3 && trimmed.length < 50) {
        phrases.push(trimmed);
      }
    });
  });

  return phrases;
}
