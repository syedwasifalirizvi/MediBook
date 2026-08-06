import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowRight, Heart, Shield, Sparkles } from 'lucide-react';

const mockArticles = [
  {
    id: '1',
    title: '10 Essential Tips for Cardiovascular Health and Heart Vitality',
    category: 'Cardiology',
    author: 'Dr. Sarah Jenkins',
    readTime: '5 min read',
    date: 'Jan 28, 2026',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    summary: 'Discover key lifestyle changes, dietary recommendations, and simple daily habits that significantly reduce risks of heart disease.',
  },
  {
    id: '2',
    title: 'Navigating Modern Tele-health: Getting the Most Out of Video Consults',
    category: 'Digital Health',
    author: 'Dr. Michael Chen',
    readTime: '4 min read',
    date: 'Jan 24, 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    summary: 'Prepare effectively for your virtual doctor visits, prepare medical questions, and ensure seamless communication with your specialist.',
  },
  {
    id: '3',
    title: 'Understanding Child Immunity: Preventive Care Guidelines for Parents',
    category: 'Pediatrics',
    author: 'Dr. Emily Rodriguez',
    readTime: '6 min read',
    date: 'Jan 19, 2026',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    summary: 'Comprehensive insights into seasonal immunization schedules, nutrition boosters, and pediatric wellness milestones.',
  },
  {
    id: '4',
    title: 'Ergonomics in the Remote Age: Preventing Chronic Back & Neck Pain',
    category: 'Orthopedics',
    author: 'Dr. David Kim',
    readTime: '7 min read',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
    summary: 'Practical spine health strategies, workplace desk setups, and daily stretches to relieve musculoskeletal tension.',
  },
];

export const ArticlesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A56F63]">Health Hub</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937]">Verified Medical Articles & Guides</h1>
        <p className="text-sm text-[#6B7280]">
          Empowering patients with evidence-based health insights written and peer-reviewed by board-certified physicians.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockArticles.map((article) => (
          <div
            key={article.id}
            className="glass-card rounded-3xl overflow-hidden border border-black/10 hover:border-[#0F3040] transition-all group flex flex-col justify-between shadow-card hover:shadow-soft"
          >
            <div>
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F3040] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5 text-[#A56F63]" /> {article.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#1F2937] group-hover:text-[#0F3040] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#6B7280] leading-relaxed">{article.summary}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-black/5 text-xs">
              <span className="text-[#6B7280]">{article.date}</span>
              <span className="font-bold text-[#0F3040] group-hover:text-[#D99B7F] flex items-center gap-1 transition-colors cursor-pointer">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
