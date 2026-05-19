export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  image: string;
  meaning: string;
  meaningReversed: string;
  type: 'major' | 'minor';
  suit?: string;
}

export const majorArcana: Omit<TarotCard, 'image' | 'suit'>[] = [
  { id: 0, name: '愚人', nameEn: 'The Fool', meaning: '天真、冒险、新的开始。你的旅程即将开始，保持开放的心态迎接未知。', meaningReversed: '冲动、愚蠢、危险的决定。需要谨慎行事，不要盲目跳跃。', type: 'major' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', meaning: '创造、意志力、技巧。你有能力将梦想转化为现实，善用你的资源。', meaningReversed: '狡猾、欺骗、缺乏方向。才能被浪费或误用。', type: 'major' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', meaning: '直觉、神秘、智慧。倾听内心的声音，信任你的直觉。', meaningReversed: '隐秘、秘密、表面肤浅。忽视了自己的直觉。', type: 'major' },
  { id: 3, name: '女皇', nameEn: 'The Empress', meaning: '丰饶、魅力、自然。生命繁茂，创造力爆发，享受自然的美好。', meaningReversed: '依赖、停滞、空虚。创造力被阻塞。', type: 'major' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', meaning: '权威、结构、领导力。稳定的领导和坚持原则将带来成功。', meaningReversed: '暴政、僵化、缺乏纪律。权威被滥用。', type: 'major' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', meaning: '信仰、传统、精神指导。传统的智慧指引你前行。', meaningReversed: '叛逆、不一致、个人思想。打破传统，寻找自己的道路。', type: 'major' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', meaning: '爱情、结合、选择。重要的关系和选择摆在面前，需要权衡。', meaningReversed: '不和谐、价值观冲突、不恰当的选择。', type: 'major' },
  { id: 7, name: '战车', nameEn: 'The Chariot', meaning: '胜利、意志力、决心。克服障碍，朝着目标坚定前进。', meaningReversed: '失控、冲动、缺乏方向。失去对局面的控制。', type: 'major' },
  { id: 8, name: '力量', nameEn: 'Strength', meaning: '勇气、耐心、力量。用内在的力量而非外在的蛮力克服挑战。', meaningReversed: '自我怀疑、内心脆弱、失控的欲望。', type: 'major' },
  { id: 9, name: '隐者', nameEn: 'The Hermit', meaning: '内省、孤独、寻找真理。退后一步，在寂静中寻找答案。', meaningReversed: '孤立、孤独、过度内省。拒绝外界帮助。', type: 'major' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', meaning: '命运、循环、转变。命运之轮转动，好运即将到来。', meaningReversed: '坏运、停滞、命运逆转。抗拒改变。', type: 'major' },
  { id: 11, name: '正义', nameEn: 'Justice', meaning: '公平、真相、因果。行动会带来相应的后果，保持诚实。', meaningReversed: '不公、不诚实、法律问题。缺乏问责。', type: 'major' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', meaning: '暂停、牺牲、新的视角。有时候需要停下来换个角度看问题。', meaningReversed: '停滞、牺牲白费、拒绝妥协。', type: 'major' },
  { id: 13, name: '死神', nameEn: 'Death', meaning: '结束、转变、蜕变。放下过去，迎接新的开始。', meaningReversed: '抗拒改变、停滞、恐惧结束。', type: 'major' },
  { id: 14, name: '节制', nameEn: 'Temperance', meaning: '平衡、耐心、目的。找到平衡点，调和不同元素。', meaningReversed: '失衡、过度、浪费。需要找回平衡。', type: 'major' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', meaning: '束缚、物质主义、贪婪。被世俗欲望束缚，需要挣脱。', meaningReversed: '释放、觉醒、打破束缚。', type: 'major' },
  { id: 16, name: '高塔', nameEn: 'The Tower', meaning: '突变、启示、觉醒。突如其来的变化带来痛苦但也带来解脱。', meaningReversed: '恐惧改变、内部冲突、预防灾难。', type: 'major' },
  { id: 17, name: '星星', nameEn: 'The Star', meaning: '希望、灵感、平静。经历了困难之后，终于看到希望和光明。', meaningReversed: '绝望、失落、缺乏信念。', type: 'major' },
  { id: 18, name: '月亮', nameEn: 'The Moon', meaning: '恐惧、幻想、潜意识。事物模糊不清，需要谨慎。', meaningReversed: '恐惧消退、幻觉结束、发现真相。', type: 'major' },
  { id: 19, name: '太阳', nameEn: 'The Sun', meaning: '快乐、成功、活力。光明照耀，一切顺利，充满生命力。', meaningReversed: '暂时的快乐、过度乐观、问题被隐藏。', type: 'major' },
  { id: 20, name: '审判', nameEn: 'Judgement', meaning: '复兴、复生、宽恕。到了评判和重新开始的时刻。', meaningReversed: '自我怀疑、后悔、忽视召唤。', type: 'major' },
  { id: 21, name: '世界', nameEn: 'The World', meaning: '完成、成就、圆满。一个阶段圆满结束，新旅程即将开始。', meaningReversed: '缺乏成就感、未完成、停滞。', type: 'major' },
];

const wands = ['权杖一', '权杖二', '权杖三', '权杖四', '权杖五', '权杖六', '权杖七', '权杖八', '权杖九', '权杖十', '权杖侍从', '权杖骑士', '权杖皇后', '权杖国王'];
const wandsEn = ['Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands', 'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands', 'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands'];
const wandsMeaning = ['创造火花、新机会、潜力。新的热情和灵感即将点燃。', '决策、进展、前景。规划未来的第一步。', '扩张、远见、航海。预示着增长和新的机会。', '和平、团队、庆祝。和谐的家庭或工作环境。', '冲突、竞争、争夺。竞争中需要保持冷静。', '胜利、认可、成功。努力得到回报，获得荣耀。', '挑战、防御、信念。面对攻击时坚守立场。', '行动、速度、消息。事情快速进展中。', '韧性、耐心、最后冲刺。坚守岗位，胜利在望。', '负担、责任、压力。承担太多需要学会委托。', '灵感、创意、自由。新的机会和计划正在萌发。', '能量、热情、行动。充满热情地追求目标。', '自信、热情、果断。热情而有魅力的领导者。', '创业精神、远见、领导力。有远见的成功领导者。'];

const cups = ['圣杯一', '圣杯二', '圣杯三', '圣杯四', '圣杯五', '圣杯六', '圣杯七', '圣杯八', '圣杯九', '圣杯十', '圣杯侍从', '圣杯骑士', '圣杯皇后', '圣杯国王'];
const cupsEn = ['Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups', 'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups', 'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups'];
const cupsMeaning = ['新感情、爱、情绪丰富。爱的全新可能。', '吸引、团结、结合。亲密关系和深厚友谊。', '友谊、社交、庆祝。快乐的聚会和社交活动。', '抑郁、幻灭、后悔。暂时的不满足需要关注。', '悲伤、失落、遗憾。悲伤中仍有希望。', '怀旧、回忆、纯真。美好的回忆和无忧无虑的时代。', '幻想、选择、幻境。避免不切实际的幻想。', '离开、放弃、寻找真理。离开不满足的环境寻求真理。', '满足、幸福、愿望实现。愿望成真的喜悦。', '喜悦、幸福、美满。家庭和和谐的理想实现。', '创意、浪漫、直觉。富有想象力的消息或邀请。', '浪漫、想象、行动。追求真爱的梦想家。', '直觉、情感、治愈。敏感而富有同理心的领导者。', '情感成熟、控制、盛怒。有智慧的情感领导者。'];

const swords = ['宝剑一', '宝剑二', '宝剑三', '宝剑四', '宝剑五', '宝剑六', '宝剑七', '宝剑八', '宝剑九', '宝剑十', '宝剑侍从', '宝剑骑士', '宝剑皇后', '宝剑国王'];
const swordsEn = ['Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords', 'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords', 'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords'];
const swordsMeaning = ['突破、新想法、清晰。关键性的想法或决定性突破。', '困难选择、僵局、优柔寡断。需要做出决定。', '伤心、失落、悲伤。情感的伤痛需要面对。', '休息、恢复、内省。暂停休息以恢复精力。', '冲突、失败、输掉。冲突中的失败或道德沦丧。', '过渡、转变、释放。痛苦的结束和新的开始。', '策略、狡猾、偷窃。用狡猾而非诚实的手段达成目的。', '限制、囚禁、受害者心态。被困住需要寻找出路。', '焦虑、恐惧、噩梦。极度的担忧和恐惧。', '结束、痛苦、彻底失败。某种情况的彻底结束。', '好奇、监视、思维敏捷。渴望知识和真相。', '行动、热情、冲动。快速行动但可能缺乏思考。', '独立、理性、清晰。有洞察力和果断的女性。', ' intellect、真相、权威。公平使用权力的权威人物。'];

const pentacles = ['星币一', '星币二', '星币三', '星币四', '星币五', '星币六', '星币七', '星币八', '星币九', '星币十', '星币侍从', '星币骑士', '星币皇后', '星币国王'];
const pentaclesEn = ['Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles', 'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles', 'Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles'];
const pentaclesMeaning = ['新机会、财务或职业。新的财务或职业机会。', '平衡、适应能力、优先事项。需要在多项事务间平衡。', '团队合作、协作、技能。努力工作和技能得到认可。', '节俭、占有欲、安全感。财务上的谨慎或过度的占有欲。', '困难时期、隔离、担忧。财务困难但仍有希望。', '给予、分享、慈善。给予和接受之间的平衡。', '耐心、长远眼光、努力。等待结果需要耐心。', '高质量、技巧、努力。追求卓越和专业技能。', '繁荣、自给自足、奖励。努力工作的美好回报。', '财富、家庭、世代传承。家庭和事业的成功传承。', '财务机会、职业、责任感。职业或财务方面的新消息。', '效率、务实、缓慢稳定。稳步向前的行动。', '务实、繁荣、自给自足。成功而务实的女性。', '财富、商业、领导力。成功而有权威的商业领袖。'];

const minorArcana: TarotCard[] = [
  ...wands.map((name, i) => ({ id: 22 + i, name, nameEn: wandsEn[i], image: '', meaning: wandsMeaning[i], meaningReversed: wandsMeaning[(i + 7) % 7] + '（逆位）', type: 'minor' as const, suit: 'wands' })),
  ...cups.map((name, i) => ({ id: 36 + i, name, nameEn: cupsEn[i], image: '', meaning: cupsMeaning[i], meaningReversed: cupsMeaning[(i + 7) % 7] + '（逆位）', type: 'minor' as const, suit: 'cups' })),
  ...swords.map((name, i) => ({ id: 50 + i, name, nameEn: swordsEn[i], image: '', meaning: swordsMeaning[i], meaningReversed: swordsMeaning[(i + 7) % 7] + '（逆位）', type: 'minor' as const, suit: 'swords' })),
  ...pentacles.map((name, i) => ({ id: 64 + i, name, nameEn: pentaclesEn[i], image: '', meaning: pentaclesMeaning[i], meaningReversed: pentaclesMeaning[(i + 7) % 7] + '（逆位）', type: 'minor' as const, suit: 'pentacles' })),
];

export const allTarotCards: TarotCard[] = [
  ...majorArcana.map(card => ({ ...card, image: `/tarot/${card.name}.png` })),
  ...minorArcana.map(card => ({ ...card, image: `/tarot/${card.name}.png` })),
];

export const drawThreeCards = (): TarotCard[] => {
  const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};