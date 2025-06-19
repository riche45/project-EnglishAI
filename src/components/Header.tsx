import React from 'react';
import { MessageCircle, User, Settings } from 'lucide-react';

interface HeaderProps {
  userTokens: number;
  currentStreak: number;
}

export const Header: React.FC<HeaderProps> = ({ userTokens, currentStreak }) => {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-purple-900"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold">EnglishAI</h1>
            <p className="text-sm text-purple-200">Conversational Learning</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-400">{userTokens}</div>
              <div className="text-xs text-purple-200">Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">{currentStreak}</div>
              <div className="text-xs text-purple-200">Day Streak</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-purple-800 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};