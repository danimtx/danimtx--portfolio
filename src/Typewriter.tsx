import { useEffect, useState } from 'react';

function Typewriter({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100;
    const word = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span style={{ color: '#bf00ff', fontWeight: 600 }}>
      {currentText}
      <span className="blink-cursor" style={{ borderRight: '2px solid #bf00ff', animation: 'blink 0.7s infinite' }}></span>
    </span>
  );
}

export default Typewriter;
