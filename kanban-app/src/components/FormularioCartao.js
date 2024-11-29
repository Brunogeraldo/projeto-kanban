// src/components/FormularioTarefa.js
import React, { useState } from 'react';
import axios from 'axios';
import './FormularioCartao.css'

const FormularioTarefa = ({ onTarefaCriada }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('A Fazer');
    const [prioridade, setPrioridade] = useState('Média');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novaTarefa = {
            titulo,
            descricao,
            status,
            prioridade,
        };

        try {
            const response = await axios.post('http://localhost:3000/tarefas', novaTarefa);
            console.log('Tarefa criada:', response.data);
            onTarefaCriada(response.data); // Chama a função para atualizar o quadro Kanban
            setTitulo('');
            setDescricao('');
            setStatus('A Fazer');
            setPrioridade('Média');
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                required
            />
            <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da tarefa"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="A Fazer">A Fazer</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Concluído">Concluído</option>
            </select>
            <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
            </select>
            <button type="submit">Criar Tarefa</button>
        </form>
    );
};

export default FormularioTarefa;