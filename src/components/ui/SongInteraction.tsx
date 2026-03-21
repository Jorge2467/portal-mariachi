'use client';

import { useState, useTransition, useOptimistic } from 'react';
import { Heart, Star, StarHalf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

interface SongInteractionProps {
  songId: string;
  initialRating: number;
  initialVoteCount: number;
  initialIsFavorite: boolean;
  userId?: string | null;
}

export default function SongInteraction({ 
  songId, 
  initialRating, 
  initialVoteCount, 
  initialIsFavorite,
  userId 
}: SongInteractionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Optimistic UI States
  const [optRating, addOptRating] = useOptimistic(
    { rating: initialRating || 0, count: initialVoteCount || 0 },
    (state, newVote: number) => {
      const newCount = state.count + 1;
      const newAvg = ((state.rating * state.count) + newVote) / newCount;
      return { rating: newAvg, count: newCount };
    }
  );

  const [optFavorite, toggleOptFavorite] = useOptimistic(
    initialIsFavorite,
    (state) => !state
  );

  const handleVote = async (score: number) => {
    if (!userId) {
      setAuthModalOpen(true);
      return;
    }
    
    startTransition(async () => {
      addOptRating(score);
      try {
        await fetch(`/api/songs/${songId}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score })
        });
        router.refresh();
      } catch (e) {
        console.error("Error voting:", e);
      }
    });
  };

  const handleFavorite = async () => {
    if (!userId) {
      setAuthModalOpen(true);
      return;
    }

    startTransition(async () => {
      toggleOptFavorite(undefined);
      try {
        await fetch(`/api/songs/${songId}/favorite`, {
          method: 'POST'
        });
        router.refresh();
      } catch (e) {
        console.error("Error toggling favorite:", e);
      }
    });
  };

  // Render Stars Component
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(optRating.rating / 2); // Convert 10 scale to 5 scale
    const hasHalfStar = (optRating.rating / 2) % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <button key={i} onClick={() => handleVote(i * 2)} className="hover:scale-125 transition-transform">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          </button>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <button key={i} onClick={() => handleVote(i * 2)} className="hover:scale-125 transition-transform">
            <StarHalf className="w-6 h-6 fill-amber-400 text-amber-400" />
          </button>
        );
      } else {
        stars.push(
          <button key={i} onClick={() => handleVote(i * 2)} className="hover:scale-125 transition-transform">
            <Star className="w-6 h-6 text-neutral-600 hover:text-amber-400/50" />
          </button>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-900/50 backdrop-blur-md border border-white/5 p-4 rounded-3xl">
      
      {/* Favorite Button */}
      <button 
        onClick={handleFavorite}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-syne font-bold ${
          optFavorite 
            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]' 
            : 'bg-neutral-800 text-neutral-400 border border-transparent hover:bg-neutral-700 hover:text-rose-400'
        }`}
      >
        <Heart className={`w-5 h-5 ${optFavorite ? 'fill-rose-400' : ''}`} />
        {optFavorite ? 'Guardado' : 'Favorito'}
      </button>

      <div className="w-px h-8 bg-white/10 hidden sm:block" />

      {/* 10-Point Rating converted to 5 visual stars */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {renderStars()}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            {optRating.rating > 0 ? optRating.rating.toFixed(1) : 'N/A'}
          </span>
          <span className="text-xs text-neutral-500 font-inter font-medium">
            {optRating.count} votos
          </span>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
