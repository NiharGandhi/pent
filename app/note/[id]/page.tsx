'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface NoteContent {
  id: string;
  title: string;
  emoji: string;
  blocks: Block[];
}

interface Block {
  type: 'heading' | 'text' | 'image' | 'divider';
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  hiddenMessage?: string;
  level?: 1 | 2 | 3;
}

const sampleNotes: Record<string, NoteContent> = {
  '1': {
    id: '1',
    title: 'Ideas for Seminars',
    emoji: '💡',
    blocks: [
      { type: 'heading', content: 'Ideas for Seminars', level: 1 },
      { type: 'text', content: 'Here are some great seminar ideas for our upcoming company events:' },
      { type: 'divider' },
      { type: 'heading', content: '1. Cybersecurity Awareness Seminar', level: 2 },
      { type: 'text', content: 'An essential training session covering best practices for online security, password management, phishing detection, and data protection.' },
      { type: 'heading', content: '2. Work Life Balance Seminar', level: 2 },
      { type: 'text', content: 'Learn techniques for maintaining healthy boundaries, managing stress, and achieving better balance between professional and personal life.' },
      { type: 'heading', content: '3. Conflict Resolution Seminar', level: 2 },
      { type: 'text', content: 'Develop skills in communication, negotiation, and mediation to effectively resolve workplace conflicts and build stronger team relationships.' },
      {
        type: 'image',
        imageUrl: '/seminar.webp',
        imageAlt: 'Seminar presentation'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Christmas Trip to Switzerland Itinerary',
    emoji: '🎄',
    blocks: [
      { type: 'heading', content: 'Christmas Trip to Switzerland Itinerary', level: 1 },
      { type: 'text', content: 'Our exciting winter adventure through the Swiss Alps!' },
      { type: 'divider' },
      { type: 'heading', content: '1. Visit Lindt Chocolate Factory', level: 2 },
      { type: 'text', content: 'Experience the magical world of Swiss chocolate making at the famous Lindt factory. Enjoy tastings and shop for delicious souvenirs.' },
      { type: 'heading', content: '2. Ride the Glacier Express', level: 2 },
      { type: 'text', content: 'Take the scenic train journey through the Swiss Alps, one of the most breathtaking railway routes in the world.' },
      { type: 'heading', content: '3. Take a boat trip on Lake Geneva', level: 2 },
      { type: 'text', content: 'Cruise across the pristine waters of Lake Geneva, surrounded by mountains and charming lakeside villages.' },
      { type: 'heading', content: '4. Visit Jungfraujoch mountain', level: 2 },
      { type: 'text', content: 'Journey to the "Top of Europe" and experience stunning views, ice palaces, and the highest railway station in Europe.' },
      {
        type: 'image',
        imageUrl: '/switzerland.jpeg',
        imageAlt: 'Switzerland landscape'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'To Do List',
    emoji: '🐕',
    blocks: [
      { type: 'heading', content: 'HR To Do List', level: 1 },
      { type: 'text', content: 'Important tasks for today:' },
      { type: 'divider' },
      { type: 'heading', content: '1. Email the list of candidates', level: 2 },
      { type: 'text', content: 'Send out the shortlisted candidate profiles to the department heads for review before the interviews next week.' },
      { type: 'heading', content: '2. Fire Alice and Bob', level: 2 },
      { type: 'text', content: 'Schedule termination meetings with Alice and Bob. Prepare severance packages and ensure IT access is revoked appropriately.' },
      { type: 'heading', content: '3. Grab lunch with Darth', level: 2 },
      { type: 'text', content: 'Meet with Darth at 12:30 PM to discuss the Q4 hiring strategy and team restructuring plans.' },
      { type: 'heading', content: '4. Walk fluffy', level: 2 },
      { type: 'text', content: 'Take the office therapy dog Fluffy for his afternoon walk around the campus. Don\'t forget treats!' },
      {
        type: 'image',
        imageUrl: '/doge.png',
        imageAlt: 'Fluffy the dog'
      }
    ]
  },
  '4': {
    id: '4',
    title: 'High School Reunion Agenda',
    emoji: '🎓',
    blocks: [
      { type: 'heading', content: 'High School Reunion Agenda', level: 1 },
      { type: 'text', content: 'Planning checklist for our 10-year reunion:' },
      { type: 'divider' },
      { type: 'heading', content: '1. Send out invites', level: 2 },
      { type: 'text', content: 'Finalize the guest list and send digital invitations with RSVP options. Include event details, date, time, and venue information.' },
      { type: 'heading', content: '2. Call Catering', level: 2 },
      { type: 'text', content: 'Contact the catering company to confirm menu selections, dietary restrictions, and final headcount for the event.' },
      { type: 'heading', content: '3. Buy Decorations', level: 2 },
      { type: 'text', content: 'Purchase school colors balloons, banners, table centerpieces, and a photo backdrop with our graduation year.' },
      { type: 'heading', content: '4. Print yearbooks', level: 2 },
      { type: 'text', content: 'Order reprints of our senior yearbook as keepsakes and create a "Where Are They Now?" booklet with updates from classmates.' },
      {
        type: 'image',
        imageUrl: '/useless.png',
        imageAlt: 'High school memories'
      }
    ]
  }
};

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<NoteContent | null>(null);
  const [showHiddenMessage, setShowHiddenMessage] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const noteId = params.id as string;
    if (sampleNotes[noteId]) {
      setNote(sampleNotes[noteId]);
    }
  }, [params.id, router]);

  const downloadImage = (imageUrl: string, fileName: string) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'image.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(err => console.error('Error downloading image:', err));
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-12 py-3 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-12 py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-6xl">{note.emoji}</span>
        </div>

        <div className="space-y-6">
          {note.blocks.map((block, index) => {
            switch (block.type) {
              case 'heading':
                const headingClasses = {
                  1: 'text-5xl font-bold text-slate-900 dark:text-white mb-4',
                  2: 'text-3xl font-bold text-slate-900 dark:text-white mb-3 mt-8',
                  3: 'text-2xl font-semibold text-slate-900 dark:text-white mb-2'
                };
                const level = block.level || 1;
                const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';
                return React.createElement(
                  HeadingTag,
                  { key: index, className: headingClasses[level] },
                  block.content
                );

              case 'text':
                return (
                  <p key={index} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {block.content}
                  </p>
                );

              case 'divider':
                return (
                  <hr key={index} className="my-8 border-slate-200 dark:border-slate-700" />
                );

              case 'image':
                return (
                  <div key={index} className="my-8 group">
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={block.imageUrl}
                        alt={block.imageAlt || 'Image'}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-3">
                          <button
                            onClick={() => downloadImage(block.imageUrl!, `${note.title}-${index}.jpg`)}
                            className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg"
                          >
                            Download Image
                          </button>
                          {block.hiddenMessage && (
                            <button
                              onClick={() => setShowHiddenMessage({ ...showHiddenMessage, [index]: !showHiddenMessage[index] })}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                            >
                              {showHiddenMessage[index] ? 'Hide' : 'Reveal'} Clue
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {block.imageAlt && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center italic">
                        {block.imageAlt}
                      </p>
                    )}
                    {showHiddenMessage[index] && block.hiddenMessage && (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                        <p className="text-sm font-mono text-yellow-900 dark:text-yellow-300">
                          {block.hiddenMessage}
                        </p>
                      </div>
                    )}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
