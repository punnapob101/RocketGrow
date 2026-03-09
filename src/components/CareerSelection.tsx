import React from 'react';
import { Code, Server, Layers, Shield, Database, Brain, BarChart, Lock, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import logo from 'figma:asset/77ddc2c1f3d7d571cf470a04c177dff7b85285e5.png';
import { motion } from 'motion/react';

const careers = [
  { id: 'frontend', name: 'Frontend', icon: Code, color: '#3b82f6', description: 'สร้าง UI/UX ที่สวยงาม' },
  { id: 'backend', name: 'Backend', icon: Server, color: '#6366f1', description: 'พัฒนา Server & API' },
  { id: 'fullstack', name: 'Full Stack', icon: Layers, color: '#8b5cf6', description: 'ทำได้ทั้ง Frontend & Backend' },
  { id: 'devops', name: 'DevOps', icon: Shield, color: '#ec4899', description: 'บริหารจัดการระบบ CI/CD' },
  { id: 'devsecops', name: 'DevSecOps', icon: Lock, color: '#f43f5e', description: 'รักษาความปลอดภัยระบบ' },
  { id: 'data-analyst', name: 'Data Analyst', icon: BarChart, color: '#3b82f6', description: 'วิเคราะห์ข้อมูลธุรกิจ' },
  { id: 'ai-engineer', name: 'AI Engineer', icon: Brain, color: '#6366f1', description: 'สร้างระบบ AI' },
  { id: 'data-scientist', name: 'AI and Data Scientist', icon: Brain, color: '#8b5cf6', description: 'วิเคราะห์ข้อมูลด้วย AI' },
  { id: 'data-engineer', name: 'Data Engineer', icon: Database, color: '#ec4899', description: 'สร้างระบบจัดการข้อมูล' },
  { id: 'ml-engineer', name: 'Machine Learning', icon: Brain, color: '#f43f5e', description: 'พัฒนาโมเดล ML' },
  { id: 'postgresql', name: 'PostgreSQL', icon: Database, color: '#3b82f6', description: 'เชี่ยวชาญ PostgreSQL' },
  { id: 'software-architect', name: 'Software Architect', icon: Layers, color: '#6366f1', description: 'ออกแบบสถาปัตยกรรมระบบ' },
  { id: 'cybersecurity', name: 'Cyber Security', icon: Shield, color: '#8b5cf6', description: 'ป้องกันภัยไซเบอร์' },
  { id: 'ux-design', name: 'UX Design', icon: Palette, color: '#ec4899', description: 'ออกแบบประสบการณ์ผู้ใช้' },
];

interface CareerSelectionProps {
  onSelectCareer: (careerId: string, careerName: string) => void;
  userName: string;
}

export function CareerSelection({ onSelectCareer, userName }: CareerSelectionProps) {
  const [selectedCareer, setSelectedCareer] = React.useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedCareer) {
      const career = careers.find(c => c.id === selectedCareer);
      if (career) {
        onSelectCareer(selectedCareer, career.name);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-white shadow-xl shadow-blue-100 p-4 ring-1 ring-slate-100">
            <img src={logo} alt="Rocket Grow Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            ยินดีต้อนรับ, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{userName}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            เลือกเส้นทางอาชีพของคุณเพื่อเริ่มต้นการเรียนรู้และเติบโตไปพร้อมกับเรา
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {careers.map((career, index) => {
            const Icon = career.icon;
            const isSelected = selectedCareer === career.id;
            
            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={`group relative h-full cursor-pointer transition-all duration-300 border-0 ${
                    isSelected 
                      ? 'ring-2 ring-blue-600 ring-offset-4 shadow-xl translate-y-[-4px]' 
                      : 'hover:shadow-xl hover:-translate-y-1 bg-white shadow-sm ring-1 ring-slate-100'
                  } rounded-2xl overflow-hidden`}
                  onClick={() => setSelectedCareer(career.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 ${isSelected ? 'opacity-5' : 'group-hover:opacity-5'}`} style={{ backgroundImage: `linear-gradient(to bottom right, ${career.color}, transparent)` }} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                        style={{ backgroundColor: `${career.color}15` }}
                      >
                        <Icon className="w-6 h-6 transition-transform duration-300" style={{ color: career.color }} />
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-800">{career.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-slate-500 font-medium leading-relaxed">
                      {career.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pb-12"
        >
          <Button
            onClick={handleConfirm}
            disabled={!selectedCareer}
            size="lg"
            className={`
              h-14 px-12 text-lg rounded-full font-semibold transition-all duration-300
              ${selectedCareer 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            เริ่มต้นเส้นทาง
          </Button>
        </motion.div>
      </div>
    </div>
  );
}