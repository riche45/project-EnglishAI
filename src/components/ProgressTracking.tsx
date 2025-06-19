import React from 'react';
import { TrendingUp, Calendar, Target, Award, Clock, BarChart3 } from 'lucide-react';

interface ProgressData {
  weeklyProgress: number[];
  monthlyGoals: {
    vocabulary: { current: number; target: number };
    conversations: { current: number; target: number };
    pronunciation: { current: number; target: number };
    listening: { current: number; target: number };
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedDate?: Date;
  }>;
  streakData: {
    current: number;
    longest: number;
    thisWeek: number[];
  };
}

export const ProgressTracking: React.FC = () => {
  const progressData: ProgressData = {
    weeklyProgress: [65, 72, 68, 85, 78, 92, 88],
    monthlyGoals: {
      vocabulary: { current: 67, target: 100 },
      conversations: { current: 23, target: 30 },
      pronunciation: { current: 45, target: 50 },
      listening: { current: 34, target: 40 }
    },
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯',
        earned: true,
        earnedDate: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Conversation Starter',
        description: 'Have your first AI conversation',
        icon: '💬',
        earned: true,
        earnedDate: new Date('2024-01-16')
      },
      {
        id: '3',
        title: 'Week Warrior',
        description: 'Study for 7 consecutive days',
        icon: '⚡',
        earned: true,
        earnedDate: new Date('2024-01-22')
      },
      {
        id: '4',
        title: 'Vocabulary Master',
        description: 'Learn 50 new words',
        icon: '📚',
        earned: false
      },
      {
        id: '5',
        title: 'Perfect Pronunciation',
        description: 'Get 95% pronunciation accuracy',
        icon: '🎤',
        earned: false
      },
      {
        id: '6',
        title: 'Social Butterfly',
        description: 'Share progress on social media',
        icon: '🦋',
        earned: false
      }
    ],
    streakData: {
      current: 12,
      longest: 18,
      thisWeek: [1, 1, 1, 0, 1, 1, 1] // 1 = studied, 0 = missed
    }
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Weekly Progress</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>+15% from last week</span>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-48 mb-4">
          {progressData.weeklyProgress.map((progress, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="relative w-8 bg-gray-200 rounded-full overflow-hidden" style={{ height: '150px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ height: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600">{weekDays[index]}</span>
              <span className="text-xs text-gray-500">{progress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Goals */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Monthly Goals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(progressData.monthlyGoals).map(([key, goal]) => {
            const percentage = (goal.current / goal.target) * 100;
            const goalNames = {
              vocabulary: 'Vocabulary Words',
              conversations: 'Conversations',
              pronunciation: 'Pronunciation Score',
              listening: 'Listening Hours'
            };

            return (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{goalNames[key as keyof typeof goalNames]}</h3>
                  <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round(percentage)}% complete
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Tracking */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Study Streak</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{progressData.streakData.current}</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{progressData.streakData.longest}</div>
            <div className="text-sm text-gray-600">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {progressData.streakData.thisWeek.filter(day => day === 1).length}/7
            </div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {progressData.streakData.thisWeek.map((studied, index) => (
            <div key={index} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                studied ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {studied ? '✓' : '○'}
              </div>
              <div className="text-xs text-gray-600">{weekDays[index]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressData.achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className={`font-semibold mb-1 ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.earnedDate && (
                  <div className="text-xs text-yellow-600 mt-2">
                    Earned {achievement.earnedDate.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};