import React, { useState, useEffect} from 'react'
import './App.css'

const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥝', '🍑'];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setCards(deck.map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false,
    })));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMessage('');
  };

  const flipCard = (id) => {
    const flippedCard = cards.find(card => card.id === id);
    if (flippedCards.length < 2 && !flippedCard.flipped && !flippedCard.matched) {
      setCards(cards.map(card =>
        card.id === id ? { ...card, flipped: true } : card
      ));
      setFlippedCards([...flippedCards, flippedCard]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.icon === secondCard.icon) {
        setCards(cards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, matched: true }
            : card
        ));
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchedPairs]);

  useEffect(() => {
    if (matchedPairs === icons.length) {
      setMessage('You won! 🎉');
    }
  }, [matchedPairs]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="game-board">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => flipCard(card.id)}
          >
            {card.flipped || card.matched ? card.icon : '❓'}
          </div>
        ))}
      </div>
      <p>{message}</p>
      <button onClick={startGame}>Restart Game</button>
    </div>
  );
}

export default App;