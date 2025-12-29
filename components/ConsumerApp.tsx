
import React, { useState } from 'react';
import { VideoAsset, VideoStatus } from '../types';
import { IconPlay, IconServer, IconCpu, IconExternalLink, IconCopy } from './Icons';

interface ConsumerAppProps {
  videos: VideoAsset[];
}

export const ConsumerApp: React.FC<ConsumerAppProps> = ({ videos }) => {
  const [filter, setFilter] = useState('all');
  const readyVideos = videos.filter(v => v.status === VideoStatus.PUBLISHED);
  
  const filteredVideos = filter === 'all' 
    ? readyVideos 
    : readyVideos.filter(v => v.metadata?.category === filter);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'horror_attacks', label: 'هجمات' },
    { id: 'true_horror', label: 'رعب' },
    { id: 'dangerous_scenes', label: 'مشاهد خطرة' }
  ];

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-300 font-sans flex flex-col" dir="rtl">
      {/* Header - Industrial Style */}
      <nav className="border-b border-slate-800 bg-[#0f1115] sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                <IconServer />
            </div>
            <span className="font-black text-xl text-white tracking-tight uppercase">Media<span className="text-blue-500">Node</span> Portal</span>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-slate-900 border border-slate-800 rounded-lg p-1">
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filter === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
            <span className="text-[10px] font-mono bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20">System Online</span>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-black text-white mb-2">مكتبة الأصول الرقمية</h2>
                <p className="text-slate-500 text-sm">إدارة وعرض ملفات الفيديو المعالجة عبر بروتوكول HLS.</p>
            </div>
            <div className="text-right">
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest block mb-1">إحصائيات المجلد</span>
                <span className="text-white font-mono text-xl">{readyVideos.length} <span className="text-slate-500 text-xs">ملفات نشطة</span></span>
            </div>
        </div>

        {readyVideos.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl">
                <div className="text-slate-700 mb-4"><IconCpu /></div>
                <p className="text-slate-600 font-bold">لا توجد أصول متاحة حالياً في قاعدة البيانات.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map(video => (
                    <div key={video.id} className="group bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                        {/* Thumbnail/Player Area */}
                        <div className="relative aspect-video bg-black flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:scale-110 group-hover:text-blue-500 group-hover:border-blue-500 transition-all z-20">
                                <IconPlay />
                            </div>
                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm z-20 uppercase tracking-tighter">HLS 3s</span>
                        </div>

                        {/* Metadata Area */}
                        <div className="p-4">
                            <h3 className="text-white font-bold text-sm truncate mb-1">{video.metadata?.title || video.filename}</h3>
                            <p className="text-slate-500 text-xs line-clamp-1 mb-4">{video.metadata?.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-600 font-bold uppercase">الحجم المضغوط</span>
                                    <span className="text-[11px] font-mono text-blue-400">{video.compressedSize || video.size}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-slate-800 text-slate-400 rounded hover:text-white transition-colors"><IconCopy /></button>
                                    <button className="p-2 bg-slate-800 text-slate-400 rounded hover:text-blue-500 transition-colors"><IconExternalLink /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="p-8 border-t border-slate-900 text-center">
         <p className="text-slate-700 text-[10px] font-mono tracking-[0.3em] uppercase">CloudStream Engine v2.0 // Secured by R2</p>
      </footer>
    </div>
  );
};
