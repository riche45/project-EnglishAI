import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ConversationChat } from './components/ConversationChat';
import { VocabularyTraining } from './components/VocabularyTraining';
import { StudyPlan } from './components/StudyPlan';
import { ProgressTracking } from './components/ProgressTracking';
import { MessageCircle, BookOpen, Calendar, BarChart3, Home } from 'lucide-react';

type ActiveTab = 'dashboard' | 'conversation' | 'vocabulary' | 'study-plan' | 'progress';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userTokens, setUserTokens] = useState(150);
  const [currentStreak, setCurrentStreak] = useState(12);

  const handleProgressUpdate = (points: number) => {
    setUserTokens(prev => prev + points);
  };

  const navigationItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Home },
    { id: 'conversation' as ActiveTab, label: 'Conversation', icon: MessageCircle },
    { id: 'vocabulary' as ActiveTab, label: 'Vocabulary', icon: BookOpen },
    { id: 'study-plan' as ActiveTab, label: 'Study Plan', icon: Calendar },
    { id: 'progress' as ActiveTab, label: 'Progress', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            userLevel={3.7}
            wordsLearned={67}
            totalWords={100}
            dailyGoal={20}
            dailyProgress={15}
            weeklyScore={88}
          />
        );
      case 'conversation':
        return <ConversationChat onProgressUpdate={handleProgressUpdate} />;
      case 'vocabulary':
        return <VocabularyTraining onProgressUpdate={handleProgressUpdate} />;
      case 'study-plan':
        return <StudyPlan />;
      case 'progress':
        return <ProgressTracking />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Header userTokens={userTokens} currentStreak={currentStreak} />
      
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-lg border-r border-purple-100 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Token Earning Info */}
          <div className="p-6 border-t border-purple-100">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
              <h3 className="font-semibold text-emerald-800 mb-2">Earn More Tokens!</h3>
              <p className="text-sm text-emerald-700 mb-3">
                Share your progress on social media to earn tokens and unlock premium features.
              </p>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
                Share Progress
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;