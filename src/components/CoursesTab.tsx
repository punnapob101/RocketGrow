import React, { useState } from 'react';
import { Star, Users, Search, TrendingUp, Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { coursesData } from './CoursesData';
import { motion, AnimatePresence } from 'motion/react';
import { Progress } from './ui/progress';

interface CoursesTabProps {
  careerName: string;
}

const careerCategories = [
  { id: 'all', name: 'All', nameThai: 'ทั้งหมด', color: 'from-slate-500 to-slate-700' },
  { id: 'frontend', name: 'Frontend', nameThai: 'พัฒนาหน้าเว็บ', color: 'from-blue-500 to-cyan-500' },
  { id: 'backend', name: 'Backend', nameThai: 'พัฒนาระบบหลังบ้าน', color: 'from-emerald-500 to-teal-500' },
  { id: 'fullstack', name: 'Full Stack', nameThai: 'นักพัฒนาเต็มรูปแบบ', color: 'from-purple-500 to-pink-500' },
  { id: 'devops', name: 'DevOps', nameThai: 'วิศวกรระบบ', color: 'from-orange-500 to-amber-500' },
  { id: 'datascience', name: 'Data Science', nameThai: 'นักวิทยาศาสตร์ข้อมูล', color: 'from-indigo-500 to-blue-500' },
  { id: 'uxdesign', name: 'UX Design', nameThai: 'ออกแบบประสบการณ์', color: 'from-pink-500 to-rose-500' },
  { id: 'mobile', name: 'Mobile Dev', nameThai: 'พัฒนาแอพมือถือ', color: 'from-cyan-500 to-blue-500' },
  { id: 'cloud', name: 'Cloud Architecture', nameThai: 'สถาปนิกคลาวด์', color: 'from-sky-500 to-indigo-500' },
  { id: 'aiml', name: 'AI/ML', nameThai: 'ปัญญาประดิษฐ์', color: 'from-violet-500 to-purple-500' },
  { id: 'blockchain', name: 'Blockchain', nameThai: 'เทคโนโลยีบล็อกเชน', color: 'from-yellow-500 to-orange-500' },
  { id: 'gamedev', name: 'Game Dev', nameThai: 'พัฒนาเกม', color: 'from-red-500 to-pink-500' },
  { id: 'qa', name: 'QA/Testing', nameThai: 'ทดสอบคุณภาพ', color: 'from-green-500 to-emerald-500' },
  { id: 'product', name: 'Product Management', nameThai: 'บริหารผลิตภัณฑ์', color: 'from-blue-500 to-indigo-500' },
  { id: 'security', name: 'Cybersecurity', nameThai: 'ความปลอดภัยไซเบอร์', color: 'from-slate-600 to-slate-800' }
];

// ฟังก์ชันคำนวณเปอร์เซ็นต์ความตรงสายงาน
const calculateCareerMatch = (courseCategory: string, userCareer: string): number => {
  // แปลงชื่อสายงานเป็น id
  const normalizeCareer = (career: string): string => {
    const mapping: { [key: string]: string } = {
      'Frontend': 'frontend',
      'Backend': 'backend',
      'Full Stack': 'fullstack',
      'DevOps': 'devops',
      'Data Science': 'datascience',
      'UX Design': 'uxdesign',
      'Mobile Dev': 'mobile',
      'Cloud Architecture': 'cloud',
      'AI/ML': 'aiml',
      'Blockchain': 'blockchain',
      'Game Dev': 'gamedev',
      'QA/Testing': 'qa',
      'Product Management': 'product',
      'Cybersecurity': 'security'
    };
    return mapping[career] || career.toLowerCase().replace(/\s+/g, '');
  };

  const normalizedCourse = normalizeCareer(courseCategory);
  const normalizedUser = normalizeCareer(userCareer);

  // ตรงเป้าหมาย 100%
  if (normalizedCourse === normalizedUser) return 100;

  // ความเกี่ยวข้องสูง (85-95%)
  const highRelevance: { [key: string]: string[] } = {
    'frontend': ['fullstack', 'uxdesign', 'mobile'],
    'backend': ['fullstack', 'devops', 'cloud'],
    'fullstack': ['frontend', 'backend', 'devops'],
    'devops': ['backend', 'cloud', 'fullstack'],
    'datascience': ['aiml', 'backend', 'product'],
    'uxdesign': ['frontend', 'product', 'mobile'],
    'mobile': ['frontend', 'fullstack', 'uxdesign'],
    'cloud': ['devops', 'backend', 'fullstack'],
    'aiml': ['datascience', 'backend', 'cloud'],
    'blockchain': ['backend', 'fullstack', 'security'],
    'gamedev': ['frontend', 'mobile', 'aiml'],
    'qa': ['devops', 'backend', 'frontend'],
    'product': ['uxdesign', 'datascience', 'fullstack'],
    'security': ['backend', 'devops', 'cloud']
  };

  if (highRelevance[normalizedUser]?.includes(normalizedCourse)) {
    return 85 + Math.floor(Math.random() * 10);
  }

  // ความเกี่ยวข้องปานกลาง (60-75%)
  const mediumRelevance: { [key: string]: string[] } = {
    'frontend': ['backend', 'devops', 'gamedev'],
    'backend': ['frontend', 'datascience', 'security'],
    'fullstack': ['mobile', 'cloud', 'uxdesign'],
    'devops': ['frontend', 'security', 'qa'],
    'datascience': ['cloud', 'fullstack', 'blockchain'],
    'uxdesign': ['gamedev', 'datascience', 'backend'],
    'mobile': ['backend', 'devops', 'gamedev'],
    'cloud': ['aiml', 'security', 'qa'],
    'aiml': ['fullstack', 'gamedev', 'frontend'],
    'blockchain': ['cloud', 'devops', 'aiml'],
    'gamedev': ['backend', 'fullstack', 'aiml'],
    'qa': ['fullstack', 'security', 'cloud'],
    'product': ['backend', 'frontend', 'aiml'],
    'security': ['fullstack', 'qa', 'blockchain']
  };

  if (mediumRelevance[normalizedUser]?.includes(normalizedCourse)) {
    return 60 + Math.floor(Math.random() * 15);
  }

  // ความเกี่ยวข้องต่ำ (40-55%)
  return 40 + Math.floor(Math.random() * 15);
};

export function CoursesTab({ careerName }: CoursesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'students'>('match');

  // กรองและค้นหาคอร์ส
  const filteredCourses = coursesData
    .map(course => ({
      ...course,
      matchPercentage: calculateCareerMatch(course.category, careerName)
    }))
    .filter(course => {
      // กรองตามหมวดหมู่
      const categoryMatch = selectedCategory === 'all' || 
        course.category.toLowerCase().replace(/\s+/g, '') === selectedCategory ||
        course.category === careerCategories.find(c => c.id === selectedCategory)?.name;
      
      // กรองตามคำค้นหา
      const searchMatch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchPercentage - a.matchPercentage;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'students') return b.students - a.students;
      return 0;
    });

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const getMatchText = (percentage: number) => {
    if (percentage >= 90) return 'ตรงสายงานมาก';
    if (percentage >= 75) return 'ตรงสายงาน';
    if (percentage >= 60) return 'เกี่ยวข้องสายงาน';
    return 'สนใจเพิ่มเติม';
  };

  return (
    <div className="space-y-6">
      {/* Header Search Section */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100 shadow-sm">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            ค้นหาคอร์สเรียนที่ใช่สำหรับคุณ
          </h1>
          <p className="text-slate-600">
            แนะนำคอร์สตามสายงาน <span className="font-semibold text-blue-600">{careerName}</span> ของคุณ
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search className="w-5 h-5 text-[#3300FF]" />
          </div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคอร์สที่สนใจ เช่น React, Python, UX Design..."
            className="pl-12 pr-12 h-14 text-base rounded-2xl border-2 border-blue-200 focus:border-[#3300FF] focus-visible:ring-[#3300FF] bg-white shadow-md shadow-blue-100/50"
          />
          {searchQuery && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{filteredCourses.length} คอร์สพบ</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>เรียงตามความตรงสายงาน</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {careerCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-[#3300FF] text-white border-[#3300FF] shadow-lg shadow-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat.name}
            {selectedCategory === cat.id && (
              <Badge className="bg-white/20 text-white border-none h-5 px-1.5 text-xs">
                {filteredCourses.length}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {selectedCategory === 'all' ? 'คอร์สทั้งหมด' : careerCategories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="match">ความตรงสายงาน</option>
            <option value="rating">คะแนนสูงสุด</option>
            <option value="students">ยอดนิยม</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-none shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/95 backdrop-blur text-slate-900 border-none shadow-sm hover:bg-white font-medium">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1.5 rounded-xl border-2 backdrop-blur-md font-bold text-sm shadow-lg ${getMatchColor(course.matchPercentage)}`}>
                      {course.matchPercentage}%
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  {/* Match Indicator */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-600">
                        {getMatchText(course.matchPercentage)}
                      </span>
                      <span className="text-xs font-bold" style={{ color: course.matchPercentage >= 90 ? '#16a34a' : course.matchPercentage >= 75 ? '#3300FF' : '#ea580c' }}>
                        {course.matchPercentage}%
                      </span>
                    </div>
                    <Progress 
                      value={course.matchPercentage} 
                      className="h-1.5 bg-slate-100"
                    >
                      <div 
                        className="h-full transition-all rounded-full"
                        style={{ 
                          width: `${course.matchPercentage}%`,
                          backgroundColor: course.matchPercentage >= 90 ? '#16a34a' : course.matchPercentage >= 75 ? '#3300FF' : '#ea580c'
                        }}
                      />
                    </Progress>
                  </div>

                  <h3 className="font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xl font-bold text-blue-600">{course.price}</span>
                    <Button 
                      size="sm" 
                      className="rounded-xl bg-[#3300FF] hover:bg-[#2200DD] shadow-md hover:shadow-lg transition-all"
                    >
                      สมัครเรียน
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">ไม่พบคอร์สที่ค้นหา</h3>
          <p className="text-slate-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่อื่นดูนะ</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            รีเซ็ตการค้นหา
          </Button>
        </div>
      )}
    </div>
  );
}