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
    title: 'The Ancient Library',
    emoji: '📚',
    blocks: [
      { type: 'heading', content: 'The Ancient Library', level: 1 },
      { type: 'text', content: 'Deep within the halls of knowledge, secrets await those who seek them.' },
      { type: 'divider' },
      { type: 'heading', content: 'Chapter 1: The First Clue', level: 2 },
      { type: 'text', content: 'In the dusty corners of forgotten shelves, a mysterious book caught my attention. Its leather cover was worn, but the golden embossing still gleamed in the dim light.' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
        imageAlt: 'Ancient books on shelf',
        hiddenMessage: 'FIRST_CLUE: Look for the red bookmark'
      },
      { type: 'text', content: 'The pages whispered stories of ancient times, but one page stood out - it had a peculiar watermark that seemed to glow when held to the light.' },
      { type: 'heading', content: 'The Discovery', level: 2 },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
        imageAlt: 'Open ancient book',
        hiddenMessage: 'SECOND_CLUE: The answer lies in page 237'
      },
      { type: 'text', content: 'What mysteries lie within these pages? Download the images and examine them carefully - you might find more than meets the eye.' }
    ]
  },
  '2': {
    id: '2',
    title: 'Mystery of the Hidden Vault',
    emoji: '🔐',
    blocks: [
      { type: 'heading', content: 'Mystery of the Hidden Vault', level: 1 },
      { type: 'text', content: 'Behind the portrait of the founder lies a secret that has been kept for generations.' },
      { type: 'divider' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800',
        imageAlt: 'Ornate vault door',
        hiddenMessage: 'VAULT_CODE: 7-3-9-2'
      },
      { type: 'text', content: 'The vault requires a four-digit code. Legends say it was hidden in plain sight, visible only to those who know where to look.' },
      { type: 'heading', content: 'The Mechanism', level: 2 },
      { type: 'text', content: 'Each tumbler represents a piece of history. Turn them in the right order, and the secrets of the past will be revealed.' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
        imageAlt: 'Lock mechanism',
        hiddenMessage: 'HINT: The founder was born in 1792'
      },
      { type: 'text', content: 'Time is running out. Can you crack the code before sunset?' }
    ]
  },
  '3': {
    id: '3',
    title: 'Secret Garden Clues',
    emoji: '🌸',
    blocks: [
      { type: 'heading', content: 'Secret Garden Clues', level: 1 },
      { type: 'text', content: 'In the heart of the garden, where roses bloom eternal, lies a path known only to the initiated.' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        imageAlt: 'Secret garden path',
        hiddenMessage: 'GARDEN_SECRET: Follow the white roses'
      },
      { type: 'divider' },
      { type: 'heading', content: 'The Rose Cipher', level: 2 },
      { type: 'text', content: 'Each rose holds a letter. Red for consonants, white for vowels. Count the petals to decode the message.' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        imageAlt: 'Rose garden',
        hiddenMessage: 'MESSAGE: TRUTH BLOOMS AT MIDNIGHT'
      },
      { type: 'text', content: 'When the moon is full and the nightingale sings, the garden reveals its deepest secrets.' }
    ]
  },
  '4': {
    id: '4',
    title: 'The Cipher Chronicles',
    emoji: '🔑',
    blocks: [
      { type: 'heading', content: 'The Cipher Chronicles', level: 1 },
      { type: 'text', content: 'Every great mystery needs a key. But what if the key itself is encrypted?' },
      { type: 'divider' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800',
        imageAlt: 'Ancient keys',
        hiddenMessage: 'MASTER_KEY: CIPHER_ALPHA_OMEGA'
      },
      { type: 'text', content: 'The ancient cipher masters left behind a series of encrypted messages. Each one leads to the next, forming an unbreakable chain of knowledge.' },
      { type: 'heading', content: 'Decryption Guide', level: 2 },
      { type: 'text', content: 'To decrypt the final message, you must first collect all the clues from the other pages. Only then will the pattern become clear.' },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800',
        imageAlt: 'Cipher wheel',
        hiddenMessage: 'FINAL_ANSWER: The treasure lies beneath the oak tree in the courtyard'
      },
      { type: 'text', content: 'You have all the pieces. Now, can you solve the ultimate puzzle?' }
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

        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Detective Tips
          </h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <li>• Hover over images to reveal download and clue options</li>
            <li>• Hidden messages are embedded in each image</li>
            <li>• Download images to examine them more carefully</li>
            <li>• Collect all clues to solve the complete mystery</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
