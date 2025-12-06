import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CalendarGrid from './components/CalendarGrid';
import DayDetail from './components/DayDetail';
import calendarData from './data/calendar.json';
import type { DayData, CalendarData } from './types/calendar';

type Screen = 'welcome' | 'calendar' | 'day';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // For testing purposes - you can override the current date
  // Uncomment the line below and set a specific date to test different days
  // setCurrentDate('2025-12-02'); // This would unlock days 1-7

  const handleStart = (): void => {
    setCurrentScreen('calendar');
  };

  const handleSelectDay = (dayData: DayData): void => {
    setSelectedDay(dayData);
    setCurrentScreen('day');
  };

  const handleCloseDay = (): void => {
    setSelectedDay(null);
    setCurrentScreen('calendar');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onStart={handleStart}
          calendarData={calendarData as CalendarData}
        />
      )}

      {currentScreen === 'calendar' && (
        <CalendarGrid
          calendarData={calendarData as CalendarData}
          onSelectDay={handleSelectDay}
          currentDate={currentDate}
        />
      )}

      {currentScreen === 'day' && selectedDay && (
        <DayDetail
          dayData={selectedDay}
          startDate={calendarData.startDate}
          onClose={handleCloseDay}
        />
      )}
    </div>
  );
}

export default App;
