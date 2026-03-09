import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Award,
  Users,
  Code,
  Lightbulb,
  HelpCircle,
  Rocket,
  Filter,
  Search,
  Plus,
  Send,
  Image as ImageIcon,
  Hash
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    level: number;
    role: string;
  };
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface CommunityTabProps {
  userName: string;
}

export function CommunityTab({ userName }: CommunityTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        level: 12,
        role: 'Frontend Developer'
      },
      title: 'วิธีทำ Animation ใน React ด้วย Framer Motion',
      content: 'เพิ่งเจอเทคนิคเจ๋งๆ ในการทำ animation ใน React ที่ทำให้ UX ดีขึ้นมาก! ใครสนใจมาแชร์ประสบการณ์กันครับ 🚀',
      category: 'Tutorial',
      tags: ['React', 'Animation', 'Frontend'],
      likes: 245,
      comments: 32,
      timestamp: '2 ชั่วโมงที่แล้ว',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        level: 15,
        role: 'Backend Engineer'
      },
      title: 'ถาม-ตอบ: Database indexing ควรทำยังไง?',
      content: 'กำลังทำโปรเจคที่มี data เยอะมาก query ช้ามาก มีใครแนะนำวิธี optimize ด้วย indexing ได้บ้างไหมครับ?',
      category: 'Q&A',
      tags: ['Database', 'Performance', 'Backend'],
      likes: 128,
      comments: 56,
      timestamp: '5 ชั่วโมงที่แล้ว',
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 3,
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
        level: 10,
        role: 'UX Designer'
      },
      title: 'แชร์ Design System ที่ใช้ในโปรเจคจริง',
      content: 'สร้าง Design System แบบ scalable ครั้งแรก เจอปัญหาเยอะมาก แต่สุดท้ายก็ได้ pattern ที่ดี มาแชร์ให้เพื่อนๆ',
      category: 'Showcase',
      tags: ['Design', 'Figma', 'Design System'],
      likes: 389,
      comments: 45,
      timestamp: '1 วันที่แล้ว',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 4,
      author: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        level: 18,
        role: 'Full Stack Developer'
      },
      title: 'จะเริ่มต้นเรียน AI/ML ดีไหม? แนะนำหน่อย',
      content: 'ทำงาน Web Dev มา 3 ปี อยากเรียนเพิ่ม AI/ML มีคอร์สไหนแนะนำบ้างครับ? หรือมีใครเปลี่ยน career path แบบนี้บ้าง',
      category: 'Discussion',
      tags: ['Career', 'AI/ML', 'Learning'],
      likes: 92,
      comments: 67,
      timestamp: '2 วันที่แล้ว',
      isLiked: false,
      isBookmarked: true
    },
    {
      id: 5,
      author: {
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        level: 9,
        role: 'Mobile Developer'
      },
      title: 'เพิ่ง Deploy แอพแรกขึ้น App Store! 🎉',
      content: 'ใช้เวลาทำ 3 เดือน เพิ่งผ่าน review ได้! ขอบคุณ community ที่ช่วยตอบคำถามตลอดเลย จะเอาประสบการณ์มาแชร์ครับ',
      category: 'Showcase',
      tags: ['Mobile', 'iOS', 'Success Story'],
      likes: 523,
      comments: 89,
      timestamp: '3 วันที่แล้ว',
      isLiked: true,
      isBookmarked: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Hash, color: 'from-slate-500 to-slate-700' },
    { id: 'tutorial', name: 'Tutorial', icon: Lightbulb, color: 'from-amber-500 to-orange-500' },
    { id: 'qa', name: 'Q&A', icon: HelpCircle, color: 'from-blue-500 to-cyan-500' },
    { id: 'showcase', name: 'Showcase', icon: Rocket, color: 'from-purple-500 to-pink-500' },
    { id: 'discussion', name: 'Discussion', icon: MessageSquare, color: 'from-green-500 to-emerald-500' }
  ];

  const trendingTopics = [
    { name: 'React 19', count: 234 },
    { name: 'Next.js', count: 189 },
    { name: 'Tailwind CSS', count: 156 },
    { name: 'TypeScript', count: 145 },
    { name: 'Node.js', count: 123 }
  ];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Community</h2>
          <p className="text-slate-500">แบ่งปันความรู้ ถามตอบ และเรียนรู้ไปด้วยกัน</p>
        </div>
        <Button 
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-gradient-to-r from-[#3300FF] to-indigo-600 hover:from-[#2200DD] hover:to-indigo-700 rounded-xl shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          เขียนโพสต์ใหม่
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl border-2 border-[#3300FF] shadow-lg">
            <CardHeader>
              <CardTitle>สร้างโพสต์ใหม่</CardTitle>
              <CardDescription>แชร์ความรู้ ถามคำถาม หรือโชว์ผลงานของคุณ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="หัวข้อโพสต์..." 
                className="text-lg font-semibold rounded-xl border-slate-200"
              />
              <Textarea 
                placeholder="เขียนเนื้อหา... (รองรับ Markdown)"
                rows={6}
                className="rounded-xl border-slate-200"
              />
              <div className="flex flex-wrap gap-2">
                <Input 
                  placeholder="เพิ่มแท็ก เช่น React, TypeScript"
                  className="flex-1 min-w-[200px] rounded-xl border-slate-200"
                />
                <select className="px-4 py-2 rounded-xl border border-slate-200 bg-white">
                  <option>Tutorial</option>
                  <option>Q&A</option>
                  <option>Showcase</option>
                  <option>Discussion</option>
                </select>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    รูปภาพ
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setShowNewPost(false)}>
                    ยกเลิก
                  </Button>
                  <Button className="bg-[#3300FF] hover:bg-[#2200DD] rounded-lg">
                    <Send className="w-4 h-4 mr-2" />
                    โพสต์
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาโพสต์, แท็ก..."
                className="pl-10 rounded-xl border-slate-200"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200 whitespace-nowrap">
              <Filter className="w-4 h-4 mr-2" />
              ตัวกรอง
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  <CardContent className="p-6">
                    {/* Author Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900">{post.author.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              Lv.{post.author.level}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">{post.author.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#3300FF] transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{post.content}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                        {post.category}
                      </Badge>
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`rounded-lg ${post.isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-500'}`}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-red-500' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg text-slate-500">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg text-slate-500">
                          <Share2 className="w-4 h-4 mr-2" />
                          แชร์
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmark(post.id)}
                        className={`rounded-lg ${post.isBookmarked ? 'text-amber-500' : 'text-slate-400'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-500' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Community Stats */}
          <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-[#3300FF] to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                สถิติ Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">สมาชิกทั้งหมด</span>
                <span className="text-2xl font-bold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">โพสต์วันนี้</span>
                <span className="text-2xl font-bold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">ออนไลน์</span>
                <span className="text-2xl font-bold">1,234</span>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                หัวข้อยอดนิยม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                      idx === 0 ? 'from-amber-400 to-orange-500' :
                      idx === 1 ? 'from-slate-400 to-slate-500' :
                      idx === 2 ? 'from-orange-400 to-amber-600' :
                      'from-slate-300 to-slate-400'
                    } flex items-center justify-center text-white text-sm font-bold`}>
                      {idx + 1}
                    </div>
                    <span className="font-medium text-slate-900 group-hover:text-[#3300FF] transition-colors">
                      #{topic.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{topic.count} โพสต์</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                ผู้ช่วยเหลือยอดเยี่ยม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'John Doe', points: 1250, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
                { name: 'Jane Smith', points: 980, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
                { name: 'Bob Wilson', points: 875, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' }
              ].map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <ImageWithFallback
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.points} คะแนน</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                    #{idx + 1}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
