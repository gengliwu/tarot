import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { type TarotCard, allTarotCards } from './data/tarotData';
import { analyzeWithDeepSeek } from './api/deepseek';
import html2canvas from 'html2canvas';

function App() {
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isReversed, setIsReversed] = useState<boolean[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [flippingCard, setFlippingCard] = useState<TarotCard | null>(null);
  const [showFlipAnimation, setShowFlipAnimation] = useState(false);
  const [isFlippingAnimating, setIsFlippingAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!resultRef.current) return;
    try {
      const originalStyle = resultRef.current.style.cssText;
      resultRef.current.style.cssText = originalStyle + '; overflow-y: visible; height: auto;';

      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#1a0a2e',
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: 0,
        windowHeight: resultRef.current.scrollHeight + 100,
      });

      resultRef.current.style.cssText = originalStyle;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `塔罗占卜结果_${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
          alert('截图已保存，可以发送给朋友分享你的塔罗解读啦 ✧');
        }
      });
    } catch {
      alert('截图失败，请重试');
    }
  }, []);

  const drawCards = useCallback(() => {
    if (!question.trim()) {
      alert('请先输入你想向塔罗询问的问题');
      return;
    }
    setShuffledCards([...allTarotCards].sort(() => Math.random() - 0.5));
    setIsSelecting(true);
    setSelectedCards([]);
  }, [question]);

  const handleCardClick = useCallback((card: TarotCard) => {
    if (selectedCards.some(c => c.id === card.id)) return;
    if (selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // 延迟显示翻转动画，确保先添加卡牌再开始翻转
    setTimeout(() => {
      setFlippingCard(card);
      setShowFlipAnimation(true);
    }, 50);

    // 再延迟添加flipping类启动翻转动画
    setTimeout(() => {
      setIsFlippingAnimating(true);
    }, 100);

    // 翻转动画完成后定格0.5秒，再消失，然后显示结果
    setTimeout(() => {
      setShowFlipAnimation(false);
      setFlippingCard(null);
      setIsFlippingAnimating(false);
      if (newSelected.length === 3) {
        const reversed = newSelected.map(() => Math.random() > 0.7);
        setDrawnCards(newSelected);
        setIsReversed(reversed);
        setShowInput(false);
        setIsSelecting(false);
        setShowResult(true);
      }
    }, 1300);  // 0.8s翻转 + 0.5s定格
  }, [selectedCards]);

  const handleAnalysis = useCallback(async () => {
    setLoading(true);
    setAnalysis('');
    try {
      const cardsWithPosition = drawnCards.map((card, index) => ({
        name: card.name,
        nameEn: card.nameEn,
        meaning: isReversed[index] ? card.meaningReversed : card.meaning,
        meaningReversed: card.meaning,
        type: card.type
      }));
      const result = await analyzeWithDeepSeek(question, cardsWithPosition);
      setAnalysis(result);
    } catch (error) {
      setAnalysis(`分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
    setLoading(false);
  }, [drawnCards, isReversed, question]);

  const reset = useCallback(() => {
    setDrawnCards([]);
    setIsReversed([]);
    setQuestion('');
    setAnalysis('');
    setShowInput(true);
    setIsSelecting(false);
    setSelectedCards([]);
    setFlippingCard(null);
    setShowFlipAnimation(false);
    setIsFlippingAnimating(false);
    setShowResult(false);
  }, []);

  const cancelSelection = useCallback(() => {
    setSelectedCards([]);
    setShuffledCards([...allTarotCards].sort(() => Math.random() - 0.5));
    setFlippingCard(null);
    setShowFlipAnimation(false);
    setIsFlippingAnimating(false);
  }, []);

  // Memoize card positions for fan layout to avoid recalculating on every render
  const cardPositions = useMemo(() => {
    const positions: { x: number; y: number; angle: number }[] = [];
    const totalCards = 78;
    const spreadAngle = 100;
    const angleStep = spreadAngle / (totalCards - 1);
    const radius = 560;
    const centerX = 600;
    const centerY = 520;

    for (let index = 0; index < totalCards; index++) {
      const angle = -(spreadAngle / 2) + index * angleStep;
      const rad = angle * Math.PI / 180;
      const x = centerX + Math.sin(rad) * radius - 50;
      const y = centerY - Math.cos(rad) * radius;
      positions.push({ x, y, angle });
    }
    return positions;
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="app" ref={containerRef}>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="container">
        {showInput && !isSelecting && (
          <div className="input-section">
            <h1 className="title">✧ 塔罗占卜 ✧</h1>
            <p className="subtitle">命运之轮已为你转动，静心冥想你的问题</p>
            <textarea
              className="question-input"
              placeholder="请输入你想向塔罗询问的问题..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
            <button className="draw-btn" onClick={drawCards}>
              开始抽取你的塔罗牌
            </button>
          </div>
        )}

        {isSelecting && (
          <div className="selection-section">
            <h1 className="title">✧ 选择你的塔罗牌 ✧</h1>
            <p className="subtitle">请选择 {3 - selectedCards.length} 张卡牌</p>

            <div className="fan-container">
              <div className="fan-cards">
                {shuffledCards.map((card, index) => {
                  const isSelected = selectedCards.some(c => c.id === card.id);

                  if (isMobile) {
                    return (
                      <div
                        key={card.id}
                        className={`fan-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleCardClick(card)}
                      >
                        <div className="fan-card-inner">
                          <div className="fan-card-back">
                            <img src="/tarot/card-back.png" alt="card back" className="card-back-image" />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const pos = cardPositions[index];
                  return (
                    <div
                      key={card.id}
                      className={`fan-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        '--rotation': `${pos.angle}deg`,
                        zIndex: index,
                      } as React.CSSProperties}
                      onClick={() => handleCardClick(card)}
                    >
                      <div className="fan-card-inner">
                        <div className="fan-card-back">
                          <img src="/tarot/card-back.png" alt="card back" className="card-back-image" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="selection-info">
                <p>已选择: {selectedCards.length}/3</p>
                <button className="cancel-btn" onClick={cancelSelection}>
                  取消选择
                </button>
              </div>

              <div className="selected-cards-preview">
                {[0, 1, 2].map(i => (
                  <div key={i} className="preview-item">
                    <div className={`preview-slot ${selectedCards[i] ? 'filled' : ''}`}>
                      {selectedCards[i] && (
                        <img src={selectedCards[i].image} alt={selectedCards[i].name} className="preview-image" />
                      )}
                    </div>
                    {selectedCards[i] && <p className="preview-name">{selectedCards[i].name}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!showInput && !isSelecting && showResult && (
          <div className={`result-section ${analysis ? 'result-bg' : ''}`} ref={resultRef}>
            <h1 className="title">✧ 你的塔罗牌 ✧</h1>
            <div className="cards-container">
              {drawnCards.map((card, index) => (
                <div key={index} className="card-wrapper">
                  <div className={`card ${isReversed[index] ? 'reversed' : ''}`}>
                    <div className="card-inner">
                      <div className="card-front">
                        <img src={card.image} alt={card.name} className="card-image" />
                        <div className="card-id">{card.id.toString().padStart(2, '0')}</div>
                      </div>
                    </div>
                  </div>
                  <p className="card-name">{card.name}</p>
                  {isReversed[index] && <span className="reversed-badge">逆位</span>}
                </div>
              ))}
            </div>

            {analysis && (
              <div className="analysis-box">
                <h3>✧ 塔罗解读 ✧</h3>
                <p>{analysis}</p>
              </div>
            )}

            <div className="btn-group">
              {analysis && (
                <button className="share-btn" onClick={handleShare}>
                  分享结果
                </button>
              )}
              {!analysis && (
                <button className="analyze-btn" onClick={handleAnalysis} disabled={loading}>
                  {loading ? '解读中...' : 'AI分析塔罗结果'}
                </button>
              )}
              {!loading && (
                <button className="reset-btn" onClick={reset}>
                  重新提问
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showFlipAnimation && flippingCard && (
        <div className="flip-overlay">
          <div className="flip-card">
            <div className={`flip-card-inner ${isFlippingAnimating ? 'flipping' : ''}`}>
              <div className="flip-card-face back">
                <img src="/tarot/card-back.png" alt="card back" className="flip-card-image" />
              </div>
              <div className="flip-card-face front">
                <img src={flippingCard.image} alt={flippingCard.name} className="flip-card-image" />
              </div>
            </div>
          </div>
          <p className="flip-card-name">{flippingCard.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;