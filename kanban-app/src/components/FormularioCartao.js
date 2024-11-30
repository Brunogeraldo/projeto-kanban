import React, { useState } from 'react';
import axios from 'axios';
import './FormularioCartao.css';

const FormularioTarefa = ({ onTarefaCriada, tarefaParaEditar, onTarefaAtualizada }) => {
    const [titulo, setTitulo] = useState(tarefaParaEditar ? tarefaParaEditar.titulo : '');
    const [descricao, setDescricao] = useState(tarefaParaEditar ? tarefaParaEditar.descricao : '');
    const [status, setStatus] = useState(tarefaParaEditar ? tarefaParaEditar.status : 'A Fazer');
    const [prioridade, setPrioridade] = useState(tarefaParaEditar ? tarefaParaEditar.prioridade : 'Média');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tarefa = {
            titulo,
            descricao,
            status,
            prioridade,
        };

        try {
            if (tarefaParaEditar) {
                // Atualizar tarefa existente
                const response = await axios.put(`http://localhost:3000/tarefas/${tarefaParaEditar.id}`, tarefa);
                onTarefaAtualizada(response.data); // Passa a tarefa atualizada para o Kanban
            } else {
                // Criar nova tarefa
                const response = await axios.post('http://localhost:3000/tarefas', tarefa);
                onTarefaCriada(response.data); // Chama a função para atualizar o quadro Kanban
            }
            setTitulo('');
            setDescricao('');
            setStatus('A Fazer');
            setPrioridade('Média');
        } catch (error) {
            console.error('Erro ao criar/atualizar tarefa:', error);
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
            <button type="submit">{tarefaParaEditar ? 'Atualizar' : 'Criar'} Tarefa</button>
        </form>
    );
};

export default FormularioTarefa;
