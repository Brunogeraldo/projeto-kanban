import React, { useState } from 'react';
import axios from 'axios';

const Cartao = ({ cartao, onUpdate, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [titulo, setTitulo] = useState(cartao.titulo);
    const [descricao, setDescricao] = useState(cartao.descricao);

    const handleSave = async () => {
        try {
            const cartaoAtualizado = { ...cartao, titulo, descricao };
            await axios.put(`http://localhost:3000/tarefas/${cartao.id}`, cartaoAtualizado);
            onUpdate(cartao.id, cartaoAtualizado);
            setEditing(false);
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/tarefas/${cartao.id}`);
            onDelete(cartao.id);
        } catch (error) {
            console.error('Erro ao excluir cartão:', error);
        }
    };

    return (
        <div className="cartao">
            {editing ? (
                <>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={() => setEditing(false)}>Cancelar</button>
                </>
            ) : (
                <>
                    <h3>{cartao.titulo}</h3>
                    <p>{cartao.descricao}</p>
                    <button onClick={() => setEditing(true)}>Editar</button>
                    <button onClick={handleDelete}>Excluir</button>
                </>
            )}
        </div>
    );
};

export default Cartao;
