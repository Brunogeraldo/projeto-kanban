import React, { useState } from 'react';

const Cartao = ({ cartao, onUpdate, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [titulo, setTitulo] = useState(cartao.titulo);
    const [descricao, setDescricao] = useState(cartao.descricao);

    const handleSave = () => {
        onUpdate(cartao.id, { ...cartao, titulo, descricao });
        setEditing(false);
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
                    <button onClick={() => onDelete(cartao.id)}>Excluir</button>
                </>
            )}
        </div>
    );
};

export default Cartao;