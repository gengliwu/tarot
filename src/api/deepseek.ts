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

请你以资深专业塔罗占卜师视角，严谨专业解读本次塔罗占卜结果，从以下维度依次分析：
先明确梳理占卜者占卜问题、所用牌阵、所有抽到的卡牌（正位 / 逆位）
逐张拆解单张牌核心牌意、画面寓意、情绪与现实指向，区分正逆位差异
结合牌阵位置逻辑，串联所有牌面，分析现状、内在心态、阻碍因素、潜在机遇、未来走向、隐藏隐患
客观理性分析，不夸大玄学、不制造焦虑，区分客观局势与主观选择影响
最后给出精准实用行动建议、避坑提醒、心态调整方向，语言通透易懂，逻辑清晰
结尾注明：塔罗仅为趋势指引，最终结果由个人选择与行动决定`;

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