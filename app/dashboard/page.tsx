'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  emoji: string;
  lastEdited: string;
}

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (!userId || !storedUsername) {
      router.push('/login');
      return;
    }

    setUsername(storedUsername);

    // Hardcoded notes for the game
    setNotes([
      {
        id: '1',
        title: 'The Ancient Library',
        emoji: '📚',
        lastEdited: 'Just now'
      },
      {
        id: '2',
        title: 'Mystery of the Hidden Vault',
        emoji: '🔐',
        lastEdited: '2 hours ago'
      },
      {
        id: '3',
        title: 'Secret Garden Clues',
        emoji: '🌸',
        lastEdited: 'Yesterday'
      },
      {
        id: '4',
        title: 'The Cipher Chronicles',
        emoji: '🔑',
        lastEdited: 'Last week'
      }
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">{username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm text-left text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          <div className="mb-4">
            <h3 className="px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Your Pages
            </h3>
            <div className="space-y-1">
              {notes.map((note) => (
                <Link
                  key={note.id}
                  href={`/note/${note.id}`}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors group"
                >
                  <span className="text-lg">{note.emoji}</span>
                  <span className="text-sm truncate flex-1">{note.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome, {username}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Explore your mystery pages and uncover hidden messages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/note/${note.id}`}
                className="group p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">{note.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {note.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Last edited {note.lastEdited}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              How to Play
            </h2>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• Click on any page to view its contents</li>
              <li>• Each page contains images with hidden messages</li>
              <li>• Download images to examine them closely</li>
              <li>• Find all the hidden clues to solve the mystery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
