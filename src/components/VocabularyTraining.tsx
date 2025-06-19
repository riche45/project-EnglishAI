import React, { useState, useEffect } from 'react';
import { ChevronRight, RotateCcw, Check, X, Volume2 } from 'lucide-react';

interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
  reviewCount: number;
  nextReview: Date;
}

interface VocabularyTrainingProps {
  onProgressUpdate: (points: number) => void;
}

export const VocabularyTraining: React.FC<VocabularyTrainingProps> = ({ onProgressUpdate }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard');

  const [words] = useState<Word[]>([
    {
      id: '1',
      word: 'Serendipity',
      translation: 'Casualidad afortunada',
      pronunciation: '/ˌserənˈdɪpɪti/',
      example: 'Meeting my best friend was pure serendipity.',
      difficulty: 'hard',
      mastered: false,
      reviewCount: 0,
      nextReview: new Date()
    },
    {
      id: '2',
      word: 'Resilient',
      translation: 'Resistente, que se recupera fácilmente',
      pronunciation: '/rɪˈzɪliənt/',
      example: 'She remained resilient despite the challenges.',
      difficulty: 'medium',
      mastered: true,
      reviewCount: 3,
      nextReview: new Date(Date.now() + 86400000)
    },
    {
      id: '3',
      word: 'Ephemeral',
      translation: 'Efímero, que dura poco tiempo',
      pronunciation: '/ɪˈfem(ə)rəl/',
      example: 'The beauty of cherry blossoms is ephemeral.',
      difficulty: 'hard',
      mastered: false,
      reviewCount: 1,
      nextReview: new Date()
    }
  ]);

  const currentWord = words[currentWordIndex];

  const handleNext = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
    setShowTranslation(false);
    setUserAnswer('');
    setShowResult(false);
  };

  const handlePrevious = () => {
    setCurrentWordIndex((prev) => (prev - 1 + words.length) % words.length);
    setShowTranslation(false);
    setUserAnswer('');
    setShowResult(false);
  };

  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      onProgressUpdate(15); // Award points for correct answer
    }
  };

  const playPronunciation = (word: string) => {
    // Here you would implement text-to-speech
    console.log('Playing pronunciation for:', word);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vocabulary Training</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMode('flashcard')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'flashcard'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'quiz'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress: {currentWordIndex + 1} of {words.length}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {currentWord.difficulty}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {mode === 'flashcard' ? (
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-6 min-h-[300px] flex flex-col justify-center">
            <div className="mb-4">
              <h3 className="text-4xl font-bold text-purple-800 mb-2">{currentWord.word}</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-gray-600">{currentWord.pronunciation}</span>
                <button
                  onClick={() => playPronunciation(currentWord.word)}
                  className="p-1 hover:bg-purple-100 rounded-full transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>
            
            {showTranslation && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xl text-emerald-600 font-semibold">{currentWord.translation}</p>
                <p className="text-gray-700 italic">"{currentWord.example}"</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevious}
              className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all"
            >
              {showTranslation ? 'Hide Translation' : 'Show Translation'}
            </button>
            
            <button
              onClick={handleNext}
              className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 min-h-[300px] flex flex-col justify-center">
            <p className="text-xl text-gray-700 mb-6">What does this word mean?</p>
            <h3 className="text-4xl font-bold text-blue-800 mb-4">{currentWord.word}</h3>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-gray-600">{currentWord.pronunciation}</span>
              <button
                onClick={() => playPronunciation(currentWord.word)}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
            </div>
            
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
                placeholder="Type the translation..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                disabled={showResult}
              />
              
              {showResult && (
                <div className={`p-4 rounded-lg mb-4 ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    <span className="font-semibold">
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p>Correct answer: {currentWord.translation}</p>
                  <p className="text-sm mt-2 italic">"{currentWord.example}"</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                Next Word
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};