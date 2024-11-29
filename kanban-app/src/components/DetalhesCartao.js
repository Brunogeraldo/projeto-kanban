// src/components/DetalhesCartao.js
import React, { useState } from 'react';

const DetalhesCartao = ({ cartao, onSave, onClose }) => {
    const [titulo, setTitulo] = useState(cartao.titulo);
    const [descricao, setDescricao] = useState(cartao.descricao);
    const [status, setStatus] = useState(cartao.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...cartao, titulo, descricao, status });
    };

    return (
        <div className="detalhes-cartao">
            <h2>Detalhes do Cartão</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="A Fazer">A Fazer</option>
                        <option value="Em Progresso">Em Progresso</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>Fechar</button>
            </form>
        </div>
    );
};

export default DetalhesCartao;