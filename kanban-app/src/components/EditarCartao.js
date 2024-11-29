import React, { useState } from 'react';
import axios from 'axios';

const EditarCartao = ({ cartao, onCartaoAtualizado, onCancel }) => {
    const [titulo, setTitulo] = useState(cartao.titulo);
    const [descricao, setDescricao] = useState(cartao.descricao);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cartaoAtualizado = { ...cartao, titulo, descricao };
        try {
            await axios.put(`http://localhost:3000/cartoes/${cartao.id}`, cartaoAtualizado);
            onCartaoAtualizado(cartaoAtualizado);
            onCancel();
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default EditarCartao;