'use client';

import { useState, useTransition, useOptimistic } from 'react';
import { Send, MessageSquare, Loader2, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

interface Comment {
  id: string;
  userId: string;
  userName?: string;
  content: string;
  createdAt: Date;
}

interface BlogCommentsProps {
  postId: string;
  initialComments: Comment[];
  userId?: string | null;
}

export default function BlogComments({ postId, initialComments, userId }: BlogCommentsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [optComments, addOptComment] = useOptimistic(
    initialComments,
    (state, newComment: Comment) => [newComment, ...state]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!userId) {
      setAuthModalOpen(true);
      return;
    }

    const payload = commentText;
    setCommentText('');

    startTransition(async () => {
      // Optimistic Ingestion
      addOptComment({
        id: Math.random().toString(),
        userId: userId,
        userName: 'Tú (Publicando...)',
        content: payload,
        createdAt: new Date(),
      });

      try {
        await fetch(`/api/blog/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, content: payload })
        });
        router.refresh(); // Sync actual server data
      } catch(e) {
        console.error("Error posting comment", e);
      }
    });
  };

  return (
    <div className="mt-16 pt-16 border-t border-neutral-800">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-teal-500" />
        <h3 className="text-3xl font-syne font-bold">Discusión Abierta</h3>
        <span className="bg-neutral-800 text-neutral-400 px-3 py-1 rounded-full text-sm font-bold ml-2">
          {optComments.length}
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-12 relative">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900/50 border border-neutral-800 focus-within:border-teal-500/50 transition-colors">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Añade tu sabiduría o pregunta sobre este artículo..."
            className="w-full bg-transparent min-h-[120px] p-6 text-white placeholder-neutral-500 outline-none resize-y font-inter"
          />
          <div className="bg-neutral-900/80 px-4 py-3 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-xs text-neutral-500 font-medium">Sé respetuoso con los puristas y académicos.</span>
            <button 
              type="submit"
              disabled={isPending || !commentText.trim()}
              className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 text-white px-6 py-2 rounded-full font-bold transition-colors flex items-center gap-2"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Comentar
            </button>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {optComments.map((c) => (
          <div key={c.id} className="bg-neutral-900/30 border border-neutral-800/50 p-6 rounded-3xl flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center border border-white/10">
                <UserCircle className="w-6 h-6 text-neutral-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-white">{c.userName || 'Músico de la Comunidad'}</span>
                <span className="text-xs text-neutral-500">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-neutral-300 font-inter leading-relaxed">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
