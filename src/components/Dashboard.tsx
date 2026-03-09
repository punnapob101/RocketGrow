import React from 'react';
import { 
  Trophy, 
  BookOpen, 
  Code, 
  Users, 
  Briefcase, 
  FileText,
  Home,
  GraduationCap,
  Target,
  LogOut,
  Star,
  TrendingUp,
  Award,
  Share,
  Clock,
  CheckCircle2,
  ArrowRight,
  Lock,
  Search,
  Filter,
  Github,
  Bot,
  ShieldCheck,
  Globe,
  CreditCard,
  Building2,
  Map,
  Rocket,
  Laptop,
  Server,
  Layers,
  Cloud,
  Database,
  Palette,
  Smartphone,
  Brain,
  Hexagon,
  Gamepad2,
  Bug,
  BarChart3,
  Shield,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/77ddc2c1f3d7d571cf470a04c177dff7b85285e5.png';
import { motion } from 'motion/react';
import { coursesData } from './CoursesData';
import { HomeTab } from './HomeTab';
import { AIChatbot } from './AIChatbot';
import { CommunityTab } from './CommunityTab';
import { LearningArticlesTab } from './LearningArticlesTab';
import { CoursesTab } from './CoursesTab';
import { toast } from 'sonner@2.0.3';

interface DashboardProps {
  userName: string;
  careerName: string;
  xp: number;
  onLogout: () => void;
  onUpdateXP?: (xpToAdd: number) => Promise<number>;
}

// Sidebar Component
function AppSidebar({ 
  activeTab, 
  onTabChange, 
  userName, 
  careerName, 
  onLogout 
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  userName: string;
  careerName: string;
  onLogout: () => void;
}) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'หน้าหลัก (Roadmap)' },
    { id: 'courses', icon: BookOpen, label: 'คอร์สเรียน' },
    { id: 'articles', icon: GraduationCap, label: 'บทความการเรียนรู้' },
    { id: 'marketplace', icon: Briefcase, label: 'Marketplace' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'teammatch', icon: Code, label: 'สร้างโปรเจค (Team Match)' },
    { id: 'corporate', icon: Building2, label: 'Corporate Portal' },
    { id: 'future', icon: Rocket, label: 'Scale & Security' },
    { id: 'resume', icon: FileText, label: 'AI Resume' },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-blue-600/10 p-2 rounded-xl shrink-0">
            <img src={logo} alt="Rocket Grow" className="w-6 h-6 object-contain" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-bold text-blue-700">Rocket Grow</span>
            <span className="truncate text-xs text-slate-500">Platform</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
                tooltip={item.label}
                className={`
                  transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-md shadow-blue-200' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                <item.icon className={activeTab === item.id ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                {userName.charAt(0)}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-slate-900">{userName}</span>
                <span className="truncate text-xs text-slate-500">{careerName}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 ml-auto text-slate-400 hover:text-red-500 hover:bg-red-50 group-data-[collapsible=icon]:hidden"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function Dashboard({ userName, careerName, xp, onLogout, onUpdateXP }: DashboardProps) {
  const [activeTab, setActiveTab] = React.useState('home');
  const [userXP, setUserXP] = React.useState(xp);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [courseFilter, setCourseFilter] = React.useState('All');
  
  // Team Match State
  const [projectMode, setProjectMode] = React.useState<'select' | 'solo' | 'team'>('select');
  const [selectedTeamMembers, setSelectedTeamMembers] = React.useState<number[]>([]);
  const [githubConnected, setGithubConnected] = React.useState(false);
  const [projectDetails, setProjectDetails] = React.useState({ title: '', description: '' });
  
  // XP Logic
  const level = Math.floor(userXP / 1000) + 1;
  const xpToNextLevel = ((level) * 1000) - userXP;
  const xpProgress = ((userXP % 1000) / 1000) * 100;

  React.useEffect(() => {
    setUserXP(xp);
  }, [xp]);

  const handleAction = async (xpAmount: number) => {
    if (onUpdateXP) {
      const newXp = await onUpdateXP(xpAmount);
      setUserXP(newXp);
    } else {
      setUserXP(prev => prev + xpAmount);
    }
  };

  // Handler สำหรับการเลือกหมวดหมู่จาก Marketplace
  const handleCategorySelect = (categoryId: string) => {
    const category = careerCategories.find(c => c.id === categoryId);
    if (category) {
      setCourseFilter(category.name);
      setActiveTab('courses');
    }
  };

  // --- Mock Data ---
  
  // 14 Career Categories พร้อมไอคอนและรูปภาพ
  const careerCategories = [
    { 
      id: 'frontend', 
      name: 'Frontend', 
      nameThai: 'พัฒนาหน้าเว็บ',
      icon: Laptop, 
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1593720216276-0caa6452e004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 245
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      nameThai: 'พัฒนาระบบหลังบ้าน',
      icon: Server, 
      color: 'from-emerald-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 198
    },
    { 
      id: 'fullstack', 
      name: 'Full Stack', 
      nameThai: 'นักพัฒนาเต็มรูปแบบ',
      icon: Layers, 
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 312
    },
    { 
      id: 'devops', 
      name: 'DevOps', 
      nameThai: 'วิศวกรระบบ',
      icon: Cloud, 
      color: 'from-orange-500 to-amber-500',
      image: 'https://images.unsplash.com/photo-1636352656650-4baea3fd60e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 167
    },
    { 
      id: 'datascience', 
      name: 'Data Science', 
      nameThai: 'นักวิทยาศาสตร์ข้อมูล',
      icon: Database, 
      color: 'from-indigo-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 142
    },
    { 
      id: 'uxdesign', 
      name: 'UX Design', 
      nameThai: 'ออกแบบประสบการณ์',
      icon: Palette, 
      color: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1521391406205-4a6af174a4c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 189
    },
    { 
      id: 'mobile', 
      name: 'Mobile Dev', 
      nameThai: 'พัฒนาแอพมือถือ',
      icon: Smartphone, 
      color: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 223
    },
    { 
      id: 'cloud', 
      name: 'Cloud Architecture', 
      nameThai: 'สถาปนิกคลาวด์',
      icon: Globe, 
      color: 'from-sky-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 134
    },
    { 
      id: 'aiml', 
      name: 'AI/ML', 
      nameThai: 'ปัญญาประดิษฐ์',
      icon: Brain, 
      color: 'from-violet-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1675557009285-b55f562641b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 178
    },
    { 
      id: 'blockchain', 
      name: 'Blockchain', 
      nameThai: 'เทคโนโลยีบล็อกเชน',
      icon: Hexagon, 
      color: 'from-yellow-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1590285836796-f772deafabfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 89
    },
    { 
      id: 'gamedev', 
      name: 'Game Dev', 
      nameThai: 'พัฒนาเกม',
      icon: Gamepad2, 
      color: 'from-red-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1759701546763-3473c6fcc803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 156
    },
    { 
      id: 'qa', 
      name: 'QA/Testing', 
      nameThai: 'ทดสอบคุณภาพ',
      icon: Bug, 
      color: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1554350747-ec45fd24f51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 127
    },
    { 
      id: 'product', 
      name: 'Product Management', 
      nameThai: 'บริหารผลิตภัณฑ์',
      icon: BarChart3, 
      color: 'from-blue-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1769988057652-c7b274646557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 203
    },
    { 
      id: 'security', 
      name: 'Cybersecurity', 
      nameThai: 'ความปลอดภัยไซเบอร์',
      icon: Shield, 
      color: 'from-slate-600 to-slate-800',
      image: 'https://images.unsplash.com/photo-1693314184947-af516631ff1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      jobs: 145
    }
  ];

  // Phase 1: Courses
  const courses = coursesData;

  // Phase 1 & 2: Marketplace
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechFlow', type: 'Full-time', salary: '฿80k - ฿120k', skills: ['React', 'TypeScript', 'Tailwind'] },
    { id: 2, title: 'Backend Engineer', company: 'DataCore', type: 'Full-time', salary: '฿70k - ฿100k', skills: ['Node.js', 'PostgreSQL', 'Docker'] },
  ];
  const freelanceProjects = [
    { id: 1, title: 'E-commerce Redesign', budget: '฿45,000', deadline: '3 weeks', skills: ['Figma', 'React'] },
    { id: 2, title: 'API Integration for POS', budget: '฿20,000', deadline: '1 week', skills: ['Node.js', 'API'] },
  ];

  // Phase 2: Team Matching
  const developers = [
    { id: 1, name: 'Sarah J.', role: 'Frontend Dev', match: 98, status: 'Available', skills: ['React', 'Vue'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { id: 2, name: 'Mike T.', role: 'Backend Dev', match: 92, status: 'Busy', skills: ['Go', 'Python'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { id: 3, name: 'Emily R.', role: 'UI Designer', match: 88, status: 'Available', skills: ['Figma', 'Adobe XD'], image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
    { id: 4, name: 'David L.', role: 'Full Stack', match: 95, status: 'Available', skills: ['MERN', 'Next.js'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 5, name: 'Jessica W.', role: 'DevOps', match: 90, status: 'Available', skills: ['Docker', 'AWS'], image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150' },
    { id: 6, name: 'Tom H.', role: 'Mobile Dev', match: 85, status: 'Available', skills: ['Flutter', 'Swift'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
  ];

  // Phase 3: Corporate
  const partners = [
    { name: 'Google Cloud', type: 'Tech Partner' },
    { name: 'Microsoft', type: 'Education Partner' },
    { name: 'Agoda', type: 'Hiring Partner' },
    { name: 'SCB 10X', type: 'Venture Partner' },
  ];

  const getActiveTabLabel = () => {
    const item = {
      'home': 'หน้าหลัก',
      'courses': 'คอร์สเรียน',
      'articles': 'บทความการเรียนรู้',
      'marketplace': 'Marketplace',
      'community': 'Community',
      'teammatch': 'สร้างโปรเจค (Team Match)',
      'corporate': 'Corporate Portal',
      'future': 'Scale & Security',
      'resume': 'AI Resume'
    }[activeTab];
    return item || 'Dashboard';
  };

  return (
    <SidebarProvider>
      <AppSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userName={userName}
        careerName={careerName}
        onLogout={onLogout}
      />
      
      <SidebarInset className="bg-slate-50">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-xl px-4 sticky top-0 z-50 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
                    Rocket Grow
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getActiveTabLabel()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* AI Chatbot - Available everywhere */}
        <AIChatbot />

        <div className="flex-1 p-6 md:p-8 pt-6 max-w-7xl mx-auto w-full">
          
          {/* Global XP Banner */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
              <Award className="w-64 h-64 -mr-16 -mt-16" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner ring-1 ring-white/30">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-500/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-400/30">Level {level}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">{userXP.toLocaleString()} XP</h2>
                  <p className="text-blue-100 text-sm font-medium opacity-90">อีก {xpToNextLevel} XP เพื่อขึ้น Level {level + 1}</p>
                </div>
              </div>
              <div className="w-full md:max-w-md space-y-2">
                <div className="flex justify-between text-xs font-medium text-blue-100 opacity-90">
                  <span>ความก้าวหน้า</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <Progress value={xpProgress} className="h-2.5 bg-blue-900/30 rounded-full [&>div]:bg-white" />
              </div>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* --- PHASE 1: Dashboard / Home --- */}
            {activeTab === 'home' && (
              <HomeTab userName={userName} careerName={careerName} onNavigate={setActiveTab} />
            )}

            {/* --- PHASE 1: Courses --- */}
            {activeTab === 'courses' && (
              <CoursesTab careerName={careerName} />
            )}

            {/* --- New Section: Learning Articles --- */}
            {activeTab === 'articles' && (
              <LearningArticlesTab />
            )}

            {/* --- PHASE 1 & 2: Marketplace --- */}
            {activeTab === 'marketplace' && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center py-12 px-4 bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 max-w-3xl mx-auto">
                    <p className="text-blue-600 font-semibold mb-2">หางานที่ใช่..</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">เปลี่ยนทักษะให้เป็นประสบการณ์</h1>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Search className="w-5 h-5 text-[#3300FF]" />
                      </div>
                      <Input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ค้นหาแบบงานที่สนใจ หรือ ชื่องาน..."
                        className="pl-12 pr-4 h-14 text-base rounded-2xl border-2 border-blue-200 focus:border-[#3300FF] focus-visible:ring-[#3300FF] bg-white shadow-md shadow-blue-100/50"
                      />
                      <Button 
                        size="icon" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-[#3300FF] hover:bg-[#2200DD] shadow-lg"
                      >
                        <Search className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">AI Search • เพิ่มโอกาสทำงานกับ 2,000+ บริษัท</p>
                  </div>
                </div>

                {/* Category Icons - Horizontal Scrollable */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {careerCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`flex flex-col items-center gap-2 min-w-[100px] p-4 rounded-2xl transition-all group hover:bg-slate-50 ${
                            selectedCategory === category.id ? 'bg-blue-50 border-2 border-[#3300FF]' : 'border-2 border-transparent'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-slate-900 text-center leading-tight">{category.name}</span>
                          <span className="text-[10px] text-slate-400">{category.jobs} งาน</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Categories with Images */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedCategory 
                        ? careerCategories.find(c => c.id === selectedCategory)?.name 
                        : 'หมวดหมู่แนะนำ'}
                    </h2>
                    <Button variant="link" className="text-[#3300FF] hover:text-[#2200DD]">
                      ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(selectedCategory 
                      ? [careerCategories.find(c => c.id === selectedCategory)!] 
                      : careerCategories.slice(0, 8)
                    ).map((category) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group cursor-pointer"
                      >
                        <Card className="overflow-hidden rounded-2xl border-none shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <ImageWithFallback 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                              <p className="text-xs text-white/90">{category.nameThai}</p>
                              <div className="flex items-center gap-1 mt-2 text-xs">
                                <Briefcase className="w-3 h-3" />
                                <span>{category.jobs} งาน</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- PHASE 2: Team Match --- */}
            {activeTab === 'teammatch' && (
              <div className="space-y-6">
                
                {projectMode === 'select' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <h2 className="text-3xl font-bold text-slate-900">เริ่มสร้างโปรเจคของคุณ</h2>
                      <p className="text-slate-500 text-lg">เลือกรูปแบบการทำงานที่คุณต้องการ ไม่ว่าจะลุยเดี่ยวหรือหาทีมที่ใช่</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      <Card 
                        className="group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-blue-500 rounded-3xl"
                        onClick={() => setProjectMode('solo')}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-8 text-center relative z-10 space-y-6">
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                            <Laptop className="w-10 h-10" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">ทำคนเดียว (Solo)</h3>
                            <p className="text-slate-500">สร้างโปรเจคส่วนตัว เชื่อมต่อ GitHub และเริ่มลุยงานด้วยตัวคุณเอง</p>
                          </div>
                          <Button variant="outline" className="w-full rounded-xl group-hover:bg-blue-600 group-hover:text-white border-blue-200">เลือกทำคนเดียว</Button>
                        </CardContent>
                      </Card>

                      <Card 
                        className="group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-purple-500 rounded-3xl"
                        onClick={() => setProjectMode('team')}
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-8 text-center relative z-10 space-y-6">
                          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600 group-hover:scale-110 transition-transform shadow-lg shadow-purple-200">
                            <Users className="w-10 h-10" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">หาทีม (Team Match)</h3>
                            <p className="text-slate-500">ค้นหาเพื่อนร่วมทีม 2-5 คนที่ Skill ตรงกันด้วย AI Matching</p>
                          </div>
                          <Button variant="outline" className="w-full rounded-xl group-hover:bg-purple-600 group-hover:text-white border-purple-200">เลือกหาทีม</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {projectMode === 'solo' && (
                  <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                    <Button 
                      variant="ghost" 
                      onClick={() => setProjectMode('select')}
                      className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> ย้อนกลับ
                    </Button>

                    <Card className="rounded-3xl border-slate-200 shadow-lg overflow-hidden">
                      <div className="bg-slate-900 p-6 text-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
                          <Laptop className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">สร้างโปรเจคเดี่ยว</h3>
                          <p className="text-slate-400 text-sm">กรอกรายละเอียดเพื่อเริ่ม Project ใหม่</p>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                           <Label className="text-base font-semibold">เชื่อมต่อ Source Code</Label>
                           <Button 
                            variant="outline" 
                            size="lg"
                            className={`w-full justify-start gap-3 h-14 rounded-xl text-base ${githubConnected ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800' : 'hover:bg-slate-50'}`}
                            onClick={() => {
                              setGithubConnected(!githubConnected);
                              toast.success(githubConnected ? 'ยกเลิกการเชื่อมต่อ GitHub' : 'เชื่อมต่อ GitHub สำเร็จ!');
                            }}
                           >
                             <Github className="w-5 h-5" />
                             {githubConnected ? 'Connected: user/repo-name' : 'Connect with GitHub'}
                             {githubConnected && <CheckCircle2 className="w-5 h-5 ml-auto text-green-600" />}
                           </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="p-name" className="text-base font-semibold">ชื่อโปรเจค</Label>
                            <Input 
                              id="p-name" 
                              placeholder="เช่น E-commerce Platform, AI Chatbot" 
                              className="h-12 rounded-xl"
                              value={projectDetails.title}
                              onChange={e => setProjectDetails({...projectDetails, title: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="p-desc" className="text-base font-semibold">รายละเอียดโปรเจค</Label>
                            <textarea 
                              id="p-desc" 
                              placeholder="อธิบายเกี่ยวกับโปรเจคของคุณ สิ่งที่อยากทำ และเทคโนโลยีที่จะใช้..." 
                              className="w-full min-h-[120px] p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent text-sm"
                              value={projectDetails.description}
                              onChange={e => setProjectDetails({...projectDetails, description: e.target.value})}
                            />
                          </div>
                        </div>

                        <Button 
                          className="w-full h-12 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                          disabled={!projectDetails.title || !projectDetails.description}
                          onClick={() => {
                            toast.success('สร้างโปรเจคสำเร็จ! ขอให้สนุกกับการเขียนโค้ด');
                            setProjectMode('select');
                            setProjectDetails({ title: '', description: '' });
                            setGithubConnected(false);
                          }}
                        >
                          สร้างโปรเจค
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {projectMode === 'team' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="flex items-center justify-between">
                       <Button 
                        variant="ghost" 
                        onClick={() => setProjectMode('select')}
                        className="pl-0 hover:bg-transparent hover:text-purple-600"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" /> ย้อนกลับ
                      </Button>
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="h-8 px-3 text-sm border-purple-200 text-purple-700 bg-purple-50">
                           สมาชิกในทีม: {selectedTeamMembers.length + 1}/5
                         </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 space-y-6">
                          <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                             <div>
                              <h2 className="text-2xl font-bold text-slate-900">ค้นหาเพื่อนร่วมทีม</h2>
                              <p className="text-slate-500">เลือกสมาชิก 2-5 คนเพื่อเริ่มโปรเจคกลุ่ม</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-2">
                              <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input type="search" placeholder="ค้นหาตามทักษะ..." className="pl-9 bg-white rounded-xl border-slate-200" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {developers.map(dev => {
                              const isSelected = selectedTeamMembers.includes(dev.id);
                              return (
                                <Card 
                                  key={dev.id} 
                                  className={`rounded-2xl border transition-all duration-200 ${
                                    isSelected 
                                      ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 shadow-md transform scale-[1.02]' 
                                      : 'border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
                                  }`}
                                >
                                  <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <ImageWithFallback src={dev.image} alt={dev.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                                        <div>
                                          <h3 className="font-bold text-slate-900">{dev.name}</h3>
                                          <p className="text-xs text-slate-500">{dev.role}</p>
                                        </div>
                                      </div>
                                      <Badge variant={dev.status === 'Available' ? 'default' : 'secondary'} className={dev.status === 'Available' ? 'bg-green-100 text-green-700 border-none' : ''}>
                                        {dev.status}
                                      </Badge>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Bot className="w-4 h-4 text-purple-600" />
                                        <span className="text-xs font-bold text-purple-600">Match: {dev.match}%</span>
                                      </div>
                                      <Progress value={dev.match} className="h-1.5 bg-purple-100 [&>div]:bg-purple-600" />
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                      {dev.skills.map(s => <Badge key={s} variant="outline" className="text-[10px] font-normal text-slate-500 bg-white">{s}</Badge>)}
                                    </div>

                                    <Button 
                                      className={`w-full rounded-xl font-medium transition-colors ${
                                        isSelected 
                                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200' 
                                          : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
                                      }`}
                                      onClick={() => {
                                        if (isSelected) {
                                          setSelectedTeamMembers(prev => prev.filter(id => id !== dev.id));
                                        } else {
                                          if (selectedTeamMembers.length >= 4) {
                                            toast.error('ทีมครบ 5 คนแล้ว (รวมคุณ)');
                                            return;
                                          }
                                          setSelectedTeamMembers(prev => [...prev, dev.id]);
                                        }
                                      }}
                                    >
                                      {isSelected ? 'ยกเลิกการเชิญ' : 'ชวนร่วมทีม'}
                                    </Button>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                       </div>

                       {/* Right Panel: Project Details */}
                       <div className="space-y-6">
                          <Card className="rounded-3xl border-slate-200 shadow-lg sticky top-24 overflow-hidden">
                            <div className="bg-purple-900 p-6 text-white">
                               <h3 className="text-lg font-bold flex items-center gap-2"><Rocket className="w-5 h-5" /> สร้างทีมโปรเจค</h3>
                               <p className="text-purple-200 text-xs mt-1">สมาชิก: {selectedTeamMembers.length + 1} คน</p>
                            </div>
                            <CardContent className="p-6 space-y-5">
                               {selectedTeamMembers.length > 0 && (
                                 <div className="flex -space-x-3 overflow-hidden py-2">
                                   <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 z-10">You</div>
                                   {selectedTeamMembers.map(id => {
                                     const dev = developers.find(d => d.id === id);
                                     return dev ? (
                                       <ImageWithFallback key={id} src={dev.image} alt={dev.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                     ) : null;
                                   })}
                                 </div>
                               )}

                               <div className="space-y-2">
                                  <Label className="text-sm font-semibold">GitHub Repository</Label>
                                   <Button 
                                    variant="outline" 
                                    size="sm"
                                    className={`w-full justify-start gap-2 h-10 rounded-lg text-sm ${githubConnected ? 'bg-green-50 border-green-200 text-green-700' : ''}`}
                                    onClick={() => {
                                      setGithubConnected(!githubConnected);
                                      toast.success(githubConnected ? 'Disconnected' : 'Connected to GitHub');
                                    }}
                                   >
                                     <Github className="w-4 h-4" />
                                     {githubConnected ? 'rocket-grow/team-project' : 'Connect GitHub'}
                                   </Button>
                                </div>

                                <div className="space-y-3">
                                  <div className="space-y-1">
                                    <Label className="text-sm font-semibold">ชื่อโปรเจค</Label>
                                    <Input 
                                      className="h-10 rounded-lg"
                                      placeholder="Project Name"
                                      value={projectDetails.title}
                                      onChange={e => setProjectDetails({...projectDetails, title: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-sm font-semibold">รายละเอียด</Label>
                                    <textarea 
                                      className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                      placeholder="รายละเอียดโปรเจค..."
                                      value={projectDetails.description}
                                      onChange={e => setProjectDetails({...projectDetails, description: e.target.value})}
                                    />
                                  </div>
                                </div>

                                <Button 
                                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200"
                                  disabled={selectedTeamMembers.length < 1 || !projectDetails.title}
                                  onClick={() => {
                                    toast.success(`สร้างทีม ${projectDetails.title} เรียบร้อยแล้ว!`);
                                    setProjectMode('select');
                                    setProjectDetails({ title: '', description: '' });
                                    setSelectedTeamMembers([]);
                                    setGithubConnected(false);
                                  }}
                                >
                                  สร้างทีมและเริ่มโปรเจค
                                </Button>
                            </CardContent>
                          </Card>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- Community Tab --- */}
            {activeTab === 'community' && (
              <CommunityTab userName={userName} />
            )}

            {/* --- PHASE 3: Corporate --- */}
            {activeTab === 'corporate' && (
              <div className="space-y-8">
                <Tabs defaultValue="overview">
                  <TabsList className="bg-slate-100 p-1 rounded-xl mb-6">
                    <TabsTrigger value="overview" className="rounded-lg">ภาพรวม & พันธมิตร</TabsTrigger>
                    <TabsTrigger value="challenges" className="rounded-lg">โจทย์จากองค์กร</TabsTrigger>
                    <TabsTrigger value="recruitment" className="rounded-lg">ระบบสรรหา (Recruit)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <Card className="bg-slate-900 text-white border-none rounded-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" /> สำหรับองค์กร</CardTitle>
                          <CardDescription className="text-slate-400">เข้าร่วมเป็นพันธมิตรกับ Rocket Grow วันนี้</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> เข้าถึง Talent Pool คุณภาพสูงกว่า 10,000 คน</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> สร้าง Employer Branding ผ่าน Corporate Challenges</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> ระบบ AI Pre-screening ลดเวลาคัดกรอง 60%</li>
                          </ul>
                          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold mt-4">ติดต่อเป็นพันธมิตร</Button>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        {partners.map((p, i) => (
                          <Card key={i} className="flex flex-col items-center justify-center p-6 text-center hover:shadow-md transition-all border-slate-100 rounded-2xl">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                              <Building2 className="w-6 h-6 text-slate-400" />
                            </div>
                            <h4 className="font-bold text-slate-900">{p.name}</h4>
                            <p className="text-xs text-slate-500">{p.type}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="challenges">
                     <Card className="border-dashed border-2 border-slate-200 bg-slate-50 rounded-2xl p-8 text-center">
                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">Corporate Challenges</h3>
                        <p className="text-slate-500 mb-4">พื้นที่สำหรับแสดงโจทย์ปัญหาจริงจากองค์กรพันธมิตร พร้อมเงินรางวัล</p>
                        <Button>ดู Challenge ทั้งหมด</Button>
                     </Card>
                  </TabsContent>

                  <TabsContent value="recruitment">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="rounded-2xl">
                        <CardHeader>
                          <CardTitle>Recruitment Pipeline</CardTitle>
                          <CardDescription>ติดตามสถานะผู้สมัครงาน</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                             {['New Applied (5)', 'Screening (2)', 'Interview (1)'].map((step, i) => (
                               <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                 <span className="font-medium text-slate-700">{step}</span>
                                 <ChevronRight className="w-4 h-4 text-slate-400" />
                               </div>
                             ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                        <CardHeader>
                          <CardTitle className="text-blue-900">Auto-Resume Generator</CardTitle>
                          <CardDescription className="text-blue-700">เครื่องมือสำหรับ Talent</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-blue-800 mb-4">
                            ระบบจะดึงข้อมูล XP, Project History และ Skill Assessment มาสร้าง Resume มาตรฐานให้อัตโนมัติ เพื่อส่งให้บริษัทพิจารณาได้ทันที
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">ทดลองใช้งาน</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* --- PHASE 4: Scale & Security --- */}
            {activeTab === 'future' && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Future Roadmap</h2>
                  <p className="text-slate-500">วิสัยทัศน์สำหรับการเติบโตและความปลอดภัยในอนาคต (Phase 4)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="rounded-2xl border-none shadow-lg bg-white relative overflow-hidden group">
                    <div className="absolute top-0 w-full h-1 bg-purple-500" />
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Bot className="w-6 h-6 text-purple-600" />
                      </div>
                      <CardTitle>AI Matching System</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-500 text-sm mb-4">
                        ระบบจับคู่ทักษะขั้นสูง ใช้ Deep Learning วิเคราะห์ Code Style, Soft Skills และ Culture Fit
                      </p>
                      <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600">
                        <div>Match_Score: 98.5%</div>
                        <div>Reason: Strong React patterns + Team leadership history</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border-none shadow-lg bg-white relative overflow-hidden group">
                    <div className="absolute top-0 w-full h-1 bg-green-500" />
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6 text-green-600" />
                      </div>
                      <CardTitle>Escrow Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-500 text-sm mb-4">
                        ระบบชำระเงินที่มีตัวกลางถือเงินไว้ จนกว่างานจะเสร็จสมบูรณ์ เพื่อความปลอดภัยของทั้งสองฝ่าย
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                         <span>Client Pay</span>
                         <ArrowRight className="w-3 h-3" />
                         <span className="font-bold text-slate-900">Vault</span>
                         <ArrowRight className="w-3 h-3" />
                         <span>Freelancer</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border-none shadow-lg bg-white relative overflow-hidden group">
                    <div className="absolute top-0 w-full h-1 bg-blue-500" />
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                         <Globe className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle>Global Expansion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-500 text-sm mb-4">
                        แผนขยายตลาดสู่ระดับภูมิภาค SEA และเชื่อมต่อกับตลาดงาน Global Tech
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">TH</Badge>
                        <Badge variant="outline">SG</Badge>
                        <Badge variant="outline">VN</Badge>
                        <Badge variant="outline">ID</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* --- Resume (Existing) --- */}
            {activeTab === 'resume' && (
               <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-100 pb-6">
                  <CardTitle className="text-2xl font-bold text-slate-900">AI Resume Generator</CardTitle>
                  <CardDescription className="text-base text-slate-500">สร้าง Resume อัตโนมัติจากประสบการณ์ที่คุณสะสมใน Rocket Grow</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 mb-8 border border-slate-200">
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
                        
                        <div className="flex items-start gap-6 mb-8">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200">
                            {userName.charAt(0)}
                          </div>
                          <div className="flex-1 pt-2">
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{userName}</h3>
                            <p className="text-lg text-slate-500 font-medium">{careerName}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge className="bg-slate-900 hover:bg-slate-800 text-white border-none rounded-md px-3 py-1">Level {level}</Badge>
                              <Badge variant="outline" className="border-slate-200 text-slate-600 rounded-md px-3 py-1">{userXP.toLocaleString()} XP</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">ทักษะและความสามารถ</h4>
                            <div className="flex flex-wrap gap-2">
                              {['HTML & CSS', 'JavaScript', 'React', 'Problem Solving', 'UI Design', 'Git'].map(skill => (
                                <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg px-3 py-1.5 text-sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">ประสบการณ์การเรียนรู้</h4>
                              <div className="space-y-4">
                                <div className="flex gap-3">
                                  <div className="mt-1 bg-green-100 p-1.5 rounded-lg text-green-600">
                                    <Trophy className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-900">สำเร็จ 12 บทเรียน</p>
                                    <p className="text-sm text-slate-500">Online Coursework</p>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="mt-1 bg-amber-100 p-1.5 rounded-lg text-amber-600">
                                    <Target className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-900">5 โปรเจคฝึกหัด</p>
                                    <p className="text-sm text-slate-500">Practical Projects</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">ประสบการณ์ทำงานจริง</h4>
                              <div className="space-y-4">
                                <div className="flex gap-3">
                                  <div className="mt-1 bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                                    <Briefcase className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-900">Tech Corp Challenge</p>
                                    <p className="text-sm text-slate-500">ระบบจองห้องประชุม</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-slate-900 hover:bg-slate-800 h-12 rounded-xl text-base shadow-lg shadow-slate-200">
                          <FileText className="w-5 h-5 mr-2" />
                          ดาวน์โหลด Resume (PDF)
                        </Button>
                        <Button variant="outline" className="flex-1 h-12 rounded-xl text-base border-slate-300 hover:bg-slate-50">
                          <Share className="w-5 h-5 mr-2" />
                          แชร์ Resume Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}