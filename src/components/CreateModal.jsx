// src/components/CreateModal.jsx
import React from "react";
import "../styles/mobile.css";

export default function CreateModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <h3>Criar</h3>

        <button>🧠 Novo módulo</button>
        <button>💬 Chat com IA</button>
        <button>📦 Importar app</button>

        <button className="close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
