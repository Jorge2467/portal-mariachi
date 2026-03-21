'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { loginAction, registerAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleAuth(formData: FormData) {
    setErrorMsg(null);
    startTransition(async () => {
      const result = view === 'login' 
        ? await loginAction(formData) 
        : await registerAction(formData);
        
      if (result.error) {
        setErrorMsg(result.error);
      } else if (result.success) {
        onClose();
        router.push('/dashboard');
        router.refresh();
      }
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-bg-card/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-light hover:text-white transition-colors z-10"
              disabled={isPending}
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="heading-3 mb-2">{view === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
                <p className="text-sm text-text-light">
                  {view === 'login' 
                    ? 'Accede a tu cuenta para guardar partituras y publicar.' 
                    : 'Únete a la comunidad Mariachi más grande.'}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-mariachi-red/10 border border-mariachi-red/20 text-mariachi-red text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <form className="space-y-4" action={handleAuth}>
                <AnimatePresence mode="popLayout">
                  {view === 'register' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                    >
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Nombre Completo" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-text-light/50 focus:outline-none focus:border-gold-primary/50 transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Correo Electrónico" 
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-text-light/50 focus:outline-none focus:border-gold-primary/50 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="Contraseña" 
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-text-light/50 focus:outline-none focus:border-gold-primary/50 transition-colors"
                  />
                </div>

                {view === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-xs text-gold-light hover:text-white transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                <button disabled={isPending} type="submit" className="w-full btn-primary flex justify-center py-3 mt-4 disabled:opacity-50 transition-all">
                  {isPending ? <Loader2 className="animate-spin" size={20} /> : (
                    <>{view === 'login' ? 'Entrar' : 'Registrarse'} <ArrowRight size={18} className="ml-2" /></>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-text-light">
                {view === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button 
                  type="button"
                  onClick={() => { setView(view === 'login' ? 'register' : 'login'); setErrorMsg(null); }}
                  className="ml-2 text-gold-primary font-bold hover:text-white transition-colors"
                >
                  {view === 'login' ? 'Regístrate aquí' : 'Inicia Sesión'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
