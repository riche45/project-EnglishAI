import React from 'react';
import { Brain, Target, Trophy, Calendar, TrendingUp, Star } from 'lucide-react';

interface DashboardProps {
  userLevel: number;
  wordsLearned: number;
  totalWords: number;
  dailyGoal: number;
  dailyProgress: number;
  weeklyScore: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userLevel,
  wordsLearned,
  totalWords,
  dailyGoal,
  dailyProgress,
  weeklyScore
}) => {
  const progressPercentage = (wordsLearned / totalWords) * 100;
  const dailyPercentage = (dailyProgress / dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Level Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Current Level</h3>
              <p className="text-sm text-gray-600">Intermediate</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {userLevel}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(userLevel % 1) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Vocabulary Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Vocabulary</h3>
              <p className="text-sm text-gray-600">Words Mastered</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {wordsLearned}/{totalWords}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Daily Goal</h3>
              <p className="text-sm text-gray-600">Today's Progress</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {dailyProgress}/{dailyGoal}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(dailyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Weekly Score</h3>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {weeklyScore}%
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>+12% from last week</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 md:col-span-2">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Recent Achievements</h3>
            <p className="text-sm text-gray-600">Your latest milestones</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "First Conversation", icon: "🎯", earned: true },
            { name: "Week Warrior", icon: "⚡", earned: true },
            { name: "Vocabulary Master", icon: "📚", earned: false },
            { name: "Perfect Pronunciation", icon: "🎤", earned: false }
          ].map((achievement, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg text-center transition-all ${
                achievement.earned 
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className={`text-xs font-medium ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {achievement.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};