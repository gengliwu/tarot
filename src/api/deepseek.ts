import axios from 'axios';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export interface AnalysisResult {
  interpretation: string;
}

export const analyzeWithDeepSeek = async (
  question: string,
  cards: { name: string; nameEn: string; meaning: string; meaningReversed: string; type: string }[]
): Promise<string> => {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '第一张（过去/现状）' : index === 1 ? '第二张（挑战/阻碍）' : '第三张（建议/出路）';
    return `${position}: ${card.name} (${card.nameEn}) - 正位含义: ${card.meaning}，逆位含义: ${card.meaningReversed}`;
  }).join('\n');

  const prompt = `你是专业的塔罗牌解读师。用户询问了塔罗牌问题，并抽取了三张牌。请根据用户的问题和抽取的牌进行解读。

用户问题: ${question}

抽取的牌:
${cardDescriptions}

请从塔罗牌象征意义、心理学角度和人生指导角度，结合用户的问题进行详细解读，给出有深度、有洞察力的分析。建议500字左右。`;

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业、富有洞察力的塔罗牌解读师，融合心理学、象征学和人生智慧，为用户提供有深度、有温度的塔罗解读。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API Key无效，请检查配置');
      }
      throw new Error(`API调用失败: ${error.response?.data?.error?.message || error.message}`);
    }
    throw new Error('分析失败，请重试');
  }
};