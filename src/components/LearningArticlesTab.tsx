import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft, 
  Award,
  Clock,
  HelpCircle,
  Share2,
  Bookmark,
  PlayCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces
interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  description: string;
  content: React.ReactNode;
  quiz: Quiz;
}

interface Quiz {
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

// Mock Data
const categories = [
  'All', 'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science', 
  'UX Design', 'Mobile Dev', 'Cloud Architecture', 'AI/ML', 'Blockchain', 
  'Game Dev', 'QA/Testing', 'Product Management', 'Cybersecurity'
];

const articles: Article[] = [
  {
    id: 'art-1',
    title: 'เจาะลึก React Hooks ที่ควรรู้ในปี 2024',
    category: 'Frontend',
    readTime: '10 นาที',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    description: 'ทำความเข้าใจ React Hooks ที่สำคัญและการใช้งานจริงเพื่อเพิ่มประสิทธิภาพโค้ดของคุณ',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>
          React Hooks ได้เปลี่ยนวิธีการเขียน React Component ของเราไปอย่างสิ้นเชิง ตั้งแต่เปิดตัวใน React 16.8 
          มันช่วยให้เราสามารถใช้ State และ Lifecycle features ใน Functional Components ได้
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">1. useState: พื้นฐานที่ขาดไม่ได้</h3>
        <p>
          useState เป็น Hook ที่ใช้บ่อยที่สุด ใช้สำหรับจัดการ State ภายใน Component 
          รูปแบบการใช้งานคือ <code>const [state, setState] = useState(initialValue);</code>
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">2. useEffect: จัดการ Side Effects</h3>
        <p>
          ใช้สำหรับจัดการ Side Effects เช่น การดึงข้อมูลจาก API, การสมัครรับข้อมูล (Subscription), 
          หรือการแก้ไข DOM โดยตรง มันทำงานคล้ายกับ componentDidMount, componentDidUpdate และ componentWillUnmount รวมกัน
        </p>
        <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-blue-500 my-4">
          <p className="italic">
            <strong>Pro Tip:</strong> อย่าลืมใส่ Dependency Array ใน useEffect เพื่อป้องกันการ render loop ที่ไม่จำเป็น
          </p>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">3. useMemo และ useCallback</h3>
        <p>
          สองตัวนี้ช่วยในเรื่อง Performance Optimization โดย useMemo จะจดจำผลลัพธ์การคำนวณ (Memoization) 
          ส่วน useCallback จะจดจำฟังก์ชัน เพื่อไม่ให้สร้างใหม่ทุกครั้งที่ render
        </p>
      </div>
    ),
    quiz: {
      question: 'Hook ใดที่ใช้สำหรับจัดการ Side Effects ใน React?',
      options: [
        { id: 'a', text: 'useState' },
        { id: 'b', text: 'useEffect' },
        { id: 'c', text: 'useContext' },
        { id: 'd', text: 'useReducer' }
      ],
      correctAnswer: 'b'
    }
  },
  {
    id: 'art-2',
    title: 'Docker 101: เริ่มต้น Containerization สำหรับมือใหม่',
    category: 'DevOps',
    readTime: '15 นาที',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop',
    description: 'เรียนรู้พื้นฐานของ Docker และวิธีการสร้าง Container แรกของคุณ',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>
          ในยุคของ Cloud Native, Docker กลายเป็นเครื่องมือมาตรฐานที่นักพัฒนาทุกคนควรใช้เป็น 
          ช่วยแก้ปัญหา "It works on my machine" ได้อย่างชะงัด
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Container คืออะไร?</h3>
        <p>
          Container คือหน่วยของซอฟต์แวร์ที่บรรจุโค้ดและ dependencies ทั้งหมดที่จำเป็นเพื่อให้แอปพลิเคชันทำงานได้ 
          ทำให้สามารถรันได้ในทุกสภาพแวดล้อมอย่างราบรื่น
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">คำสั่งพื้นฐาน</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><code>docker pull</code>: ดาวน์โหลด Image จาก Registry</li>
          <li><code>docker run</code>: สร้างและเริ่ม Container จาก Image</li>
          <li><code>docker ps</code>: ดูรายการ Container ที่กำลังทำงาน</li>
          <li><code>docker build</code>: สร้าง Image จาก Dockerfile</li>
        </ul>
      </div>
    ),
    quiz: {
      question: 'คำสั่งใดใช้สำหรับดูรายการ Container ที่กำลังทำงานอยู่?',
      options: [
        { id: 'a', text: 'docker images' },
        { id: 'b', text: 'docker run' },
        { id: 'c', text: 'docker ps' },
        { id: 'd', text: 'docker start' }
      ],
      correctAnswer: 'c'
    }
  },
  {
    id: 'art-3',
    title: 'UX Writing: เขียนอย่างไรให้ผู้ใช้รัก',
    category: 'UX Design',
    readTime: '8 นาที',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800&auto=format&fit=crop',
    description: 'เทคนิคการใช้คำใน Interface เพื่อสร้างประสบการณ์ที่ดีที่สุดให้กับผู้ใช้งาน',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>
          UX Writing ไม่ใช่แค่การเขียนคำให้ถูกต้องตามหลักไวยากรณ์ แต่คือการสื่อสารกับผู้ใช้ 
          เพื่อนำทางพวกเขาไปสู่เป้าหมายได้อย่างราบรื่นที่สุด
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">หลักการ Clear, Concise, Useful</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Clear:</strong> ชัดเจน ไม่กำกวม หลีกเลี่ยงศัพท์เทคนิค</li>
          <li><strong>Concise:</strong> กระชับ ตรงประเด็น ตัดคำฟุ่มเฟือย</li>
          <li><strong>Useful:</strong> เป็นประโยชน์ บอกผู้ใช้ว่าต้องทำอะไรต่อไป</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Tone of Voice</h3>
        <p>
          เลือกน้ำเสียงให้เหมาะสมกับแบรนด์และสถานการณ์ เช่น ข้อความ Error ควรใช้น้ำเสียงที่เห็นอกเห็นใจและแนะนำวิธีแก้ปัญหา 
          ไม่ใช่โทษผู้ใช้
        </p>
      </div>
    ),
    quiz: {
      question: 'หลักการสำคัญของ UX Writing คืออะไร?',
      options: [
        { id: 'a', text: 'Long, Detailed, Formal' },
        { id: 'b', text: 'Clear, Concise, Useful' },
        { id: 'c', text: 'Funny, Sarcastic, Witty' },
        { id: 'd', text: 'Fast, Cheap, Good' }
      ],
      correctAnswer: 'b'
    }
  },
  {
    id: 'art-4',
    title: 'เจาะลึก Clean Architecture ใน Go',
    category: 'Backend',
    readTime: '20 นาที',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=800&auto=format&fit=crop',
    description: 'การออกแบบโครงสร้างโปรเจกต์ Go ให้รองรับการขยายตัวและดูแลรักษาง่าย',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>Clean Architecture ช่วยแยก Business Logic ออกจาก Framework และ External Dependencies ทำให้โค้ดของเรา Test ง่ายและยืดหยุ่น</p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Layers หลัก</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Entities:</strong> กฎทางธุรกิจระดับองค์กร</li>
          <li><strong>Use Cases:</strong> กฎทางธุรกิจระดับแอปพลิเคชัน</li>
          <li><strong>Interface Adapters:</strong> แปลงข้อมูลระหว่าง Use Cases และ External Agencies</li>
          <li><strong>Frameworks & Drivers:</strong> เครื่องมือภายนอก เช่น Database, Web Framework</li>
        </ul>
      </div>
    ),
    quiz: {
      question: 'เลเยอร์ใดใน Clean Architecture ที่ควรเป็นอิสระจาก Framework ภายนอกมากที่สุด?',
      options: [
        { id: 'a', text: 'Frameworks & Drivers' },
        { id: 'b', text: 'Interface Adapters' },
        { id: 'c', text: 'Entities' },
        { id: 'd', text: 'Presenters' }
      ],
      correctAnswer: 'c'
    }
  },
  {
    id: 'art-5',
    title: 'Data Visualization ด้วย Python',
    category: 'Data Science',
    readTime: '12 นาที',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    description: 'สร้างกราฟสวยๆ และสื่อความหมายได้ดีด้วย Matplotlib และ Seaborn',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>การนำเสนอข้อมูลให้เข้าใจง่ายเป็นทักษะสำคัญของ Data Scientist</p>
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Matplotlib vs Seaborn</h3>
        <p>Matplotlib เป็นพื้นฐานที่ยืดหยุ่นสูง ส่วน Seaborn สร้างมาบน Matplotlib อีกทีเพื่อให้เขียนโค้ดน้อยลงและได้กราฟที่สวยงามทันที</p>
      </div>
    ),
    quiz: {
      question: 'ไลบรารีใดที่สร้างมาบน Matplotlib เพื่อให้ใช้งานง่ายขึ้น?',
      options: [
        { id: 'a', text: 'NumPy' },
        { id: 'b', text: 'Pandas' },
        { id: 'c', text: 'Seaborn' },
        { id: 'd', text: 'Scikit-learn' }
      ],
      correctAnswer: 'c'
    }
  }
];

export function LearningArticlesTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Filter articles
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setQuizStarted(false);
    setSelectedAnswer('');
    setQuizSubmitted(false);
    setIsCorrect(false);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  const handleSubmitQuiz = () => {
    if (!selectedArticle || !selectedAnswer) return;
    
    const correct = selectedAnswer === selectedArticle.quiz.correctAnswer;
    setIsCorrect(correct);
    setQuizSubmitted(true);
    
    if (correct) {
      toast.success('ยินดีด้วย! คุณตอบถูก รับไปเลย 50 XP');
    } else {
      toast.error('เสียใจด้วย ยังไม่ถูก ลองใหม่อีกครั้งนะ');
    }
  };

  // Article Detail View
  if (selectedArticle) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4 text-slate-500 hover:text-blue-600 hover:bg-blue-50 pl-0 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับไปหน้าบทความ
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <ImageWithFallback 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">{selectedArticle.category}</Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200">
                  <Clock className="w-3 h-3 mr-1" /> {selectedArticle.readTime}
                </Badge>
                <Badge variant="outline" className={`border-slate-200 ${
                  selectedArticle.difficulty === 'Beginner' ? 'text-green-600' :
                  selectedArticle.difficulty === 'Intermediate' ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {selectedArticle.difficulty}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    RG
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Rocket Grow Team</p>
                    <p className="text-xs text-slate-500">เผยแพร่เมื่อ 2 วันที่แล้ว</p>
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                     <Bookmark className="w-5 h-5" />
                   </Button>
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                     <Share2 className="w-5 h-5" />
                   </Button>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-lg">
                {selectedArticle.content}
              </div>
            </div>

            {/* Quiz Section */}
            <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">ทดสอบความเข้าใจ</h3>
                  <p className="text-slate-500 text-sm">ตอบถูกรับ XP เพิ่มทันที</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-semibold text-lg mb-4 text-slate-900">{selectedArticle.quiz.question}</h4>
                
                <RadioGroup 
                  value={selectedAnswer} 
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                  disabled={quizSubmitted && isCorrect}
                >
                  {selectedArticle.quiz.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label 
                        htmlFor={option.id} 
                        className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedAnswer === option.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                            : 'bg-slate-50 border-transparent hover:bg-slate-100'
                        } ${
                          quizSubmitted && option.id === selectedArticle.quiz.correctAnswer
                            ? '!bg-green-50 !border-green-200 !text-green-700'
                            : ''
                        } ${
                          quizSubmitted && selectedAnswer === option.id && !isCorrect
                            ? '!bg-red-50 !border-red-200 !text-red-700'
                            : ''
                        }`}
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-6 flex items-center justify-between">
                  {quizSubmitted ? (
                    <div className={`flex items-center gap-2 font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" /> ถูกต้อง! (+50 XP)
                        </>
                      ) : (
                         <>
                          <span>ไม่ถูกต้อง ลองอีกครั้งนะ</span>
                          <Button 
                            variant="link" 
                            className="text-slate-500 underline" 
                            onClick={() => {
                              setQuizSubmitted(false);
                              setSelectedAnswer('');
                            }}
                          >
                            ลองใหม่
                          </Button>
                         </>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">เลือกคำตอบที่คิดว่าถูกต้องที่สุด</span>
                  )}
                  
                  {!isCorrect && (
                    <Button 
                      onClick={handleSubmitQuiz} 
                      disabled={!selectedAnswer}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 rounded-xl"
                    >
                      ส่งคำตอบ
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Recommendations */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-4">บทความที่เกี่ยวข้อง</h3>
                 <div className="space-y-4">
                   {articles
                     .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                     .slice(0, 3)
                     .map(article => (
                       <div 
                         key={article.id} 
                         className="group cursor-pointer flex gap-3 items-start"
                         onClick={() => handleArticleClick(article)}
                       >
                         <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                           <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                         </div>
                         <div>
                           <h4 className="font-semibold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                             {article.title}
                           </h4>
                           <span className="text-xs text-slate-500 mt-1 block">{article.readTime}</span>
                         </div>
                       </div>
                     ))
                   }
                   {articles.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category).length === 0 && (
                     <p className="text-sm text-slate-400">ยังไม่มีบทความอื่นในหมวดหมู่นี้</p>
                   )}
                 </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <BookOpen className="w-32 h-32" />
                </div>
                <h3 className="font-bold text-xl mb-2 relative z-10">อยากเรียนรู้เพิ่มเติม?</h3>
                <p className="text-blue-100 text-sm mb-4 relative z-10">
                  สมัครคอร์สเรียนเต็มรูปแบบเพื่อพัฒนาทักษะของคุณให้เชี่ยวชาญ
                </p>
                <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 relative z-10 font-bold border-none">
                  ดูคอร์สเรียนทั้งหมด
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">บทความการเรียนรู้</h2>
          <p className="text-slate-500 mt-1">อัพเดทความรู้ใหม่ๆ ฟรี! พร้อมแบบทดสอบวัดความเข้าใจ</p>
        </div>
        
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredArticles.map((article) => (
            <motion.div
              layout
              key={article.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="group h-full cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-sm rounded-2xl overflow-hidden flex flex-col"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-slate-900 backdrop-blur shadow-sm hover:bg-white border-none">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      article.difficulty === 'Beginner' ? 'text-green-600' :
                      article.difficulty === 'Intermediate' ? 'text-orange-500' : 'text-red-500'
                    }`}>{article.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                      อ่านบทความ <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">ไม่พบบทความ</h3>
          <p className="text-slate-500">ลองเลือกหมวดหมู่อื่นดูนะ</p>
        </div>
      )}
    </div>
  );
}
