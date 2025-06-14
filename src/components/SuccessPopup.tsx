
import React from "react";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
}

const SuccessPopup = ({ open, onClose }: SuccessPopupProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="bg-slate-800 border-2 border-yellow-500 rounded-2xl px-6 py-8 max-w-md w-full shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 text-2xl font-bold focus:outline-none"
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="mb-6">
          <img 
            src="https://fomrs-acad-lider.lovable.app/lovable-uploads/cd5b5d51-f39e-4ded-9d8a-686459ccc11b.png"
            alt="Academia de Líderes Logo"
            className="mx-auto h-20 md:h-24 mb-4"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Academia de Líderes Módulo l</h1>
        <h2 className="text-lg md:text-xl font-semibold text-yellow-400 mb-4">Cadastro Alunos</h2>
        <p className="text-yellow-200 font-semibold mb-4">
          Seu cadastro foi feito com sucesso, parabéns!<br />
          Aqui se inicia uma nova jornada,<br />
          <span className="text-yellow-400">Academia de Líderes - Módulo l</span>
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;
