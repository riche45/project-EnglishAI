import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Circle, Target, TrendingUp } from 'lucide-react';

interface StudySession {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
  topics: string[];
  wordsToLearn: number;
}

export const StudyPlan: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  const studyPlan: StudySession[] = [
    {
      id: '1',
      day: 1,
      title: 'Introduction & Basic Greetings',
      description: 'Learn essential greetings and introductions',
      duration: 30,
      completed: true,
      topics: ['Greetings', 'Introductions', 'Basic Questions'],
      wordsToLearn: 10
    },
    {
      id: '2',
      day: 2,
      title: 'Daily Routines',
      description: 'Vocabulary and phrases for daily activities',
      duration: 35,
      completed: true,
      topics: ['Time expressions', 'Daily activities', 'Frequency adverbs'],
      wordsToLearn: 12
    },
    {
      id: '3',
      day: 3,
      title: 'Food & Dining',
      description: 'Restaurant conversations and food vocabulary',
      duration: 40,
      completed: false,
      topics: ['Food items', 'Ordering food', 'Restaurant etiquette'],
      wordsToLearn: 15
    },
    {
      id: '4',
      day: 4,
      title: 'Shopping & Money',
      description: 'Shopping conversations and money expressions',
      duration: 35,
      completed: false,
      topics: ['Shopping phrases', 'Numbers & prices', 'Clothing items'],
      wordsToLearn: 12
    },
    {
      id: '5',
      day: 5,
      title: 'Travel & Transportation',
      description: 'Getting around and travel vocabulary',
      duration: 45,
      completed: false,
      topics: ['Directions', 'Transportation', 'Travel phrases'],
      wordsToLearn: 18
    },
    {
      id: '6',
      day: 6,
      title: 'Work & Career',
      description: 'Professional conversations and job vocabulary',
      duration: 40,
      completed: false,
      topics: ['Job titles', 'Office vocabulary', 'Professional phrases'],
      wordsToLearn: 15
    },
    {
      id: '7',
      day: 7,
      title: 'Hobbies & Interests',
      description: 'Talking about personal interests and activities',
      duration: 35,
      completed: false,
      topics: ['Hobby vocabulary', 'Expressing preferences', 'Free time activities'],
      wordsToLearn: 12
    },
    {
      id: '8',
      day: 8,
      title: 'Health & Wellness',
      description: 'Medical vocabulary and health conversations',
      duration: 40,
      completed: false,
      topics: ['Body parts', 'Symptoms', 'Medical appointments'],
      wordsToLearn: 16
    },
    {
      id: '9',
      day: 9,
      title: 'Weather & Environment',
      description: 'Weather descriptions and environmental topics',
      duration: 30,
      completed: false,
      topics: ['Weather conditions', 'Seasons', 'Environmental vocabulary'],
      wordsToLearn: 10
    },
    {
      id: '10',
      day: 10,
      title: 'Review & Assessment',
      description: 'Comprehensive review and final assessment',
      duration: 60,
      completed: false,
      topics: ['Review all topics', 'Final conversation', 'Progress assessment'],
      wordsToLearn: 0
    }
  ];

  const selectedSession = studyPlan.find(session => session.day === selectedDay);
  const completedSessions = studyPlan.filter(session => session.completed).length;
  const totalWords = studyPlan.reduce((sum, session) => sum + session.wordsToLearn, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">10-Day Study Plan</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{completedSessions}/10</div>
              <div className="text-sm text-gray-600">Days Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalWords}</div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{Math.round((completedSessions / 10) * 100)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Day Selection */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-gray-800 mb-4">Select Day</h3>
          <div className="space-y-2">
            {studyPlan.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedDay(session.day)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedDay === session.day
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {session.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-medium">Day {session.day}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{session.duration}min</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Session Details */}
        <div className="lg:col-span-2">
          {selectedSession && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-800">
                  Day {selectedSession.day}: {selectedSession.title}
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSession.completed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {selectedSession.completed ? 'Completed' : 'Pending'}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedSession.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Topics Covered</h4>
                  <div className="space-y-2">
                    {selectedSession.topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Session Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">{selectedSession.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">{selectedSession.wordsToLearn} new words</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Day {selectedSession.day} of 10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedSession.completed ? 'Completed on Day ' + selectedSession.day : 'Ready to start'}
                </div>
                <button
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedSession.completed
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700'
                  }`}
                  disabled={selectedSession.completed}
                >
                  {selectedSession.completed ? 'Completed' : 'Start Session'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};