import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Briefcase, 
  Building2, 
  Rocket, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  Map
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface HomeTabProps {
  userName: string;
  careerName: string;
  onNavigate: (tab: string) => void;
}

export function HomeTab({ userName, careerName, onNavigate }: HomeTabProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#3300FF] via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-[#3300FF]/20"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm mb-4 border border-white/30"
          >
            🚀 ยินดีต้อนรับกลับมา!
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            สวัสดี, {userName}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            เส้นทาง {careerName} ของคุณกำลังก้าวหน้า! พร้อมที่จะพัฒนาทักษะและสร้างผลงานแล้วหรือยัง
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => onNavigate('courses')}
              size="lg" 
              className="bg-white text-[#3300FF] hover:bg-blue-50 rounded-xl shadow-lg font-semibold px-8"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              เริ่มเรียน
            </Button>
            <Button 
              onClick={() => onNavigate('marketplace')}
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-xl font-semibold px-8"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              หางาน
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'ผู้ใช้งานทั้งหมด', 
            value: '12,450', 
            sub: '+12% เดือนนี้', 
            icon: Users, 
            color: 'from-blue-500 to-cyan-500',
            iconBg: 'bg-blue-100'
          },
          { 
            title: 'โปรเจคสำเร็จ', 
            value: '8,932', 
            sub: 'ทั่วทั้งระบบ', 
            icon: CheckCircle2, 
            color: 'from-green-500 to-emerald-500',
            iconBg: 'bg-green-100'
          },
          { 
            title: 'รายได้รวม (ปีนี้)', 
            value: '฿4.2M', 
            sub: 'จาก Marketplace', 
            icon: TrendingUp, 
            color: 'from-amber-500 to-orange-500',
            iconBg: 'bg-amber-100'
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card className="rounded-2xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-600">{stat.title}</CardTitle>
                  <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-slate-900 tracking-tight mb-1">{stat.value}</div>
                <p className="text-sm text-slate-500 font-medium">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interactive Phase Cards */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">เลือกเส้นทางของคุณ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              phase: 'Phase 1', 
              title: 'เริ่มต้นเรียนรู้', 
              desc: 'เข้าถึงคอร์สเรียนคุณภาพสูง และฝึกฝนทักษะใน Sandbox',
              icon: BookOpen,
              color: 'from-blue-500 to-indigo-500',
              tab: 'courses',
              status: 'เริ่มเลย',
              gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50'
            },
            { 
              phase: 'Phase 2', 
              title: 'ทำงานจริง', 
              desc: 'หางาน Marketplace และจับคู่ทีมด้วย AI',
              icon: Briefcase,
              color: 'from-purple-500 to-pink-500',
              tab: 'marketplace',
              status: 'สำรวจ',
              gradient: 'bg-gradient-to-br from-purple-50 to-pink-50'
            },
            { 
              phase: 'Phase 3', 
              title: 'พันธมิตรองค์กร', 
              desc: 'ทำโจทย์จากบริษัทชั้นนำ และสร้าง Portfolio',
              icon: Building2,
              color: 'from-green-500 to-emerald-500',
              tab: 'corporate',
              status: 'เข้าร่วม',
              gradient: 'bg-gradient-to-br from-green-50 to-emerald-50'
            },
            { 
              phase: 'Phase 4', 
              title: 'ขยายสู่อนาคต', 
              desc: 'AI Matching, Escrow Payment และตลาดระดับโลก',
              icon: Rocket,
              color: 'from-orange-500 to-red-500',
              tab: 'future',
              status: 'เร็วๆ นี้',
              gradient: 'bg-gradient-to-br from-orange-50 to-red-50'
            }
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate(phase.tab)}
            >
              <Card className={`${phase.gradient} rounded-2xl border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${phase.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-white/80 backdrop-blur-sm border-none text-slate-700">
                      {phase.phase}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{phase.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600 leading-relaxed">{phase.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Roadmap Timeline */}
      <Card className="rounded-2xl border-none shadow-lg bg-white">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3300FF] to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Platform Roadmap</CardTitle>
              <CardDescription className="text-base">สถานะการพัฒนาของ Rocket Grow</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative border-l-4 border-slate-200 ml-6 space-y-12 py-4">
            {[
              { 
                title: 'Phase 1: Foundation', 
                status: 'Completed', 
                desc: 'ระบบพื้นฐาน Dashboard, Courses และ Marketplace', 
                color: 'bg-green-500',
                icon: CheckCircle2,
                progress: 100
              },
              { 
                title: 'Phase 2: Collaboration', 
                status: 'In Progress', 
                desc: 'ระบบจับคู่ทีม (Team Match) และโหมดรับงานอิสระ', 
                color: 'bg-blue-500',
                icon: Users,
                progress: 65
              },
              { 
                title: 'Phase 3: Corporate', 
                status: 'Next', 
                desc: 'Corporate Portal, ระบบสรรหาบุคลากร และโจทย์จากองค์กร', 
                color: 'bg-amber-500',
                icon: Building2,
                progress: 30
              },
              { 
                title: 'Phase 4: Scale & Security', 
                status: 'Planned', 
                desc: 'AI Matching ขั้นสูง, Escrow Payment และการขยายตลาด', 
                color: 'bg-slate-400',
                icon: Rocket,
                progress: 10
              }
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="relative pl-10"
              >
                <div className={`absolute -left-[17px] top-2 w-8 h-8 rounded-xl ${phase.color} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                  <phase.icon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className="text-xl font-bold text-slate-900">{phase.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={phase.status === 'Completed' ? 'default' : phase.status === 'In Progress' ? 'secondary' : 'outline'} 
                        className="font-semibold"
                      >
                        {phase.status}
                      </Badge>
                      <span className="text-sm font-bold text-slate-600">{phase.progress}%</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{phase.desc}</p>
                  <Progress value={phase.progress} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
