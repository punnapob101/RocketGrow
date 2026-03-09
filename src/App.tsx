import React from 'react';
import { CareerSelection } from './components/CareerSelection';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type AppState = 'career-selection' | 'dashboard';

interface User {
  id: string;
  name: string;
  email: string;
  career?: string;
  careerName?: string;
  xp: number;
}

export default function App() {
  const [appState, setAppState] = React.useState<AppState>('career-selection');
  const [user, setUser] = React.useState<User>({
    id: 'demo-user',
    name: 'ผู้ใช้งาน',
    email: 'user@rocketgrow.com',
    xp: 0
  });

  const handleSelectCareer = (careerId: string, careerName: string) => {
    const updatedUser = {
      ...user,
      career: careerId,
      careerName
    };
    setUser(updatedUser);
    setAppState('dashboard');
    toast.success(`เลือกสายงาน ${careerName} สำเร็จ!`);
  };

  const handleLogout = () => {
    setUser({
      id: 'demo-user',
      name: 'ผู้ใช้งาน',
      email: 'user@rocketgrow.com',
      xp: 0
    });
    setAppState('career-selection');
    toast.success('รีเซ็ตข้อมูลสำเร็จ');
  };

  const handleUpdateXP = async (xpToAdd: number) => {
    const newXp = user.xp + xpToAdd;
    setUser(prev => ({ ...prev, xp: newXp }));
    return newXp;
  };

  return (
    <>
      {appState === 'career-selection' && (
        <CareerSelection
          onSelectCareer={handleSelectCareer}
          userName={user.name}
        />
      )}

      {appState === 'dashboard' && user.careerName && (
        <Dashboard
          userName={user.name}
          careerName={user.careerName}
          xp={user.xp}
          onLogout={handleLogout}
          onUpdateXP={handleUpdateXP}
        />
      )}

      <Toaster position="top-right" />
    </>
  );
}