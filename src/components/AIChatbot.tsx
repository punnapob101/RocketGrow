import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  BookOpen,
  HelpCircle,
  Code
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'สวัสดีค่ะ! ฉันคือ Rocket AI Assistant 🚀 ฉันพร้อมช่วยตอบคำถามเกี่ยวกับคอร์สเรียน การใช้งาน และแนะนำเส้นทางการเรียนรู้ให้คุณค่ะ',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'แนะนำคอร์สสำหรับ Frontend',
        'ระบบ XP ทำงานยังไง?',
        'วิธีหางานใน Marketplace'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: { [key: string]: string } = {
    'frontend': 'สำหรับผู้เริ่มต้น Frontend แนะนำให้เริ่มจาก:\n\n1. **HTML & CSS Fundamentals** - เรียนรู้พื้นฐานการสร้างเว็บไซต์\n2. **JavaScript Essentials** - ภาษาโปรแกรมสำหรับเว็บ\n3. **React for Beginners** - Framework ยอดนิยม\n4. **Responsive Design with Tailwind** - ทำเว็บให้รองรับทุกหน้าจอ\n\nคุณสามารถเริ่มเรียนได้ที่หน้า "คอร์สเรียน" เลยนะคะ! 📚',
    
    'xp': 'ระบบ XP (Experience Points) ของ Rocket Grow ทำงานแบบนี้ค่ะ:\n\n✨ **การได้รับ XP:**\n- เรียนจบบทเรียน: +50-200 XP\n- ทำโปรเจคสำเร็จ: +300-1000 XP\n- ทำงาน Marketplace: +500-2000 XP\n- ช่วยเหลือใน Community: +10-50 XP\n\n📈 **Level System:**\n- ทุก 1,000 XP = เลื่อน Level 1\n- ไม่มีขีดจำกัด XP!\n- Level สูง = โอกาสได้งานดีขึ้น\n\nเก็บ XP ไปเรื่อยๆ นะคะ! 🎯',
    
    'marketplace': 'การหางานใน Marketplace มีขั้นตอนง่ายๆ ค่ะ:\n\n1. **เข้าไปที่หน้า Marketplace** 🏪\n2. **เลือกหมวดหมู่** ที่คุณสนใจ (Frontend, Backend, Design, ฯลฯ)\n3. **ใช้ AI Search** พิมพ์ทักษะหรือตำแหน่งที่ต้องการ\n4. **ดูรายละเอียดงาน** และกด Apply\n5. **รอการจับคู่** จากระบบ AI Matching\n\n💡 **Tips:** ยิ่ง Level และ XP สูง โอกาสได้รับเชิญให้สัมภาษณ์ก็มากขึ้นนะคะ!',
    
    'default': 'ขอโทษนะคะ ฉันอาจจะไม่เข้าใจคำถามของคุณ 😅\n\nคุณสามารถถามเกี่ยวกับ:\n- 📚 คอร์สเรียนและแนะนำเส้นทาง\n- 💼 การหางานใน Marketplace\n- ⭐ ระบบ XP และ Level\n- 🤝 การใช้งาน Team Match\n- 🏢 Corporate Portal\n\nหรือลองคลิกข้อเสนอแนะด้านล่างได้เลยค่ะ!'
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('frontend') || lowerMessage.includes('หน้าเว็บ')) {
      return botResponses.frontend;
    } else if (lowerMessage.includes('xp') || lowerMessage.includes('ระดับ') || lowerMessage.includes('level')) {
      return botResponses.xp;
    } else if (lowerMessage.includes('marketplace') || lowerMessage.includes('หางาน') || lowerMessage.includes('งาน')) {
      return botResponses.marketplace;
    } else if (lowerMessage.includes('backend') || lowerMessage.includes('หลังบ้าน')) {
      return 'สำหรับ Backend Developer แนะนำให้เรียน:\n\n1. **Node.js & Express** - สร้าง API\n2. **Database Management** - PostgreSQL, MongoDB\n3. **API Design** - RESTful & GraphQL\n4. **Docker & DevOps Basics** - Deploy แบบมืออาชีพ\n\nเริ่มต้นได้ที่หน้าคอร์สเลยค่ะ! 🚀';
    } else if (lowerMessage.includes('ux') || lowerMessage.includes('design') || lowerMessage.includes('ดีไซน์')) {
      return 'สำหรับ UX/UI Designer:\n\n1. **UX Fundamentals** - หลักการออกแบบประสบการณ์\n2. **Figma Mastery** - เครื่องมือดีไซน์ยอดนิยม\n3. **User Research** - ทำความเข้าใจผู้ใช้\n4. **Prototyping** - สร้าง Prototype ที่ใช้งานได้\n\nพร้อมจะเป็น Designer มือโปรแล้วหรือยัง? 🎨';
    } else if (lowerMessage.includes('team') || lowerMessage.includes('ทีม')) {
      return 'ระบบ Team Match ช่วยคุณหาเพื่อนร่วมทีมที่ใช่!\n\n🤖 **AI Matching:**\n- วิเคราะห์ทักษะและความสามารถ\n- Match ตาม Project ที่เหมาะสม\n- แสดง Compatibility Score\n\n📊 **วิธีใช้:**\n1. ไปที่หน้า "หาทีม"\n2. ดูผู้ใช้ที่ Match กับคุณ\n3. กดชวนร่วมทีม\n\nทำงานเป็นทีม ประสบการณ์จริง! 💪';
    } else if (lowerMessage.includes('สวัสดี') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'สวัสดีค่ะ! ยินดีที่ได้รู้จักนะคะ 😊\nมีอะไรให้ช่วยไหมคะ? ถามมาได้เลย!';
    } else if (lowerMessage.includes('ขอบคุณ') || lowerMessage.includes('thank')) {
      return 'ยินดีค่ะ! 🌟 มีคำถามอื่นๆ ถามได้ตลอดเวลานะคะ\nขอให้สนุกกับการเรียนรู้! 🚀';
    }
    
    return botResponses.default;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['แนะนำคอร์สอื่น', 'เกี่ยวกับ Marketplace', 'วิธีเพิ่ม XP']
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-br from-[#3300FF] to-indigo-600 hover:from-[#2200DD] hover:to-indigo-700 shadow-2xl shadow-[#3300FF]/30 relative group"
            >
              <MessageCircle className="w-7 h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              
              {/* Tooltip */}
              <span className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                💬 ถามอะไรก็ได้!
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] flex flex-col"
          >
            <Card className="flex flex-col h-full border-none shadow-2xl rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-[#3300FF] to-indigo-600 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center ring-2 ring-white/30">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        Rocket AI
                        <Sparkles className="w-4 h-4" />
                      </h3>
                      <p className="text-xs text-blue-100">ออนไลน์ • ตอบทันที</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      message.sender === 'bot' 
                        ? 'bg-gradient-to-br from-[#3300FF] to-indigo-600' 
                        : 'bg-gradient-to-br from-slate-600 to-slate-800'
                    }`}>
                      {message.sender === 'bot' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'bot'
                          ? 'bg-white border border-slate-200 shadow-sm'
                          : 'bg-gradient-to-br from-[#3300FF] to-indigo-600 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs rounded-full border-[#3300FF] text-[#3300FF] hover:bg-[#3300FF] hover:text-white transition-all"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#3300FF] to-indigo-600">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 bg-white border-t border-slate-100">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick('แนะนำคอร์ส Frontend')}
                    className="flex items-center gap-2 text-xs whitespace-nowrap rounded-xl hover:bg-blue-50 hover:text-[#3300FF]"
                  >
                    <BookOpen className="w-3 h-3" />
                    คอร์สเรียน
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick('ระบบ XP ทำงานยังไง?')}
                    className="flex items-center gap-2 text-xs whitespace-nowrap rounded-xl hover:bg-blue-50 hover:text-[#3300FF]"
                  >
                    <HelpCircle className="w-3 h-3" />
                    ระบบ XP
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick('แนะนำ Backend')}
                    className="flex items-center gap-2 text-xs whitespace-nowrap rounded-xl hover:bg-blue-50 hover:text-[#3300FF]"
                  >
                    <Code className="w-3 h-3" />
                    Backend
                  </Button>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="พิมพ์คำถามของคุณ..."
                    className="flex-1 rounded-xl border-slate-200 focus-visible:ring-[#3300FF]"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="rounded-xl bg-gradient-to-br from-[#3300FF] to-indigo-600 hover:from-[#2200DD] hover:to-indigo-700 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
