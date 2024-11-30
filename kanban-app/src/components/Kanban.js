import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Kanban.css'; // Importa o arquivo CSS para estilização
import FormularioTarefa from './FormularioCartao'; // Importa o formulário para criar novas tarefas

const Kanban = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('Todas');
    const [detalhesCartao, setDetalhesCartao] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar a pesquisa

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tarefas');
                setTarefas(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar tarefas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTarefas();
    }, []);

    const handleTarefaCriada = (novaTarefa) => {
        setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
    };

    const tarefasFiltradas = () => {
        let tarefasFiltradas = tarefas;

        // Filtra tarefas por status
        if (filtro === 'Concluídas') {
            tarefasFiltradas = tarefasFiltradas.filter(tarefa => tarefa.status === 'Concluído');
        } else if (filtro === 'Mais Recentes') {
            tarefasFiltradas = [...tarefasFiltradas].sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
        }

        // Filtra tarefas por palavra-chave no título ou descrição
        if (searchTerm) {
            tarefasFiltradas = tarefasFiltradas.filter(tarefa =>
                tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (tarefa.descricao && tarefa.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        return tarefasFiltradas; // Retorna as tarefas filtradas
    };

    const mostrarDetalhes = (tarefa) => {
        setDetalhesCartao(tarefa);
    };

    const fecharDetalhes = () => {
        setDetalhesCartao(null);
    };

    const handleDragStart = (e, tarefaId) => {
        e.dataTransfer.setData('tarefaId', tarefaId);
    };

    const handleDrop = async (e, novoStatus) => {
        const tarefaId = e.dataTransfer.getData('tarefaId');
        const tarefaAtualizada = tarefas.find(tarefa => tarefa.id === parseInt(tarefaId));

        if (tarefaAtualizada) {
            const updatedTask = { status: novoStatus };
            try {
                await axios.patch(`http://localhost:3000/tarefas/${tarefaId}`, updatedTask);
                setTarefas(prevTarefas => 
                    prevTarefas.map(tarefa => 
                        tarefa.id === tarefaAtualizada.id ? { ...tarefa, status: novoStatus } : tarefa
                    )
                );
            } catch (err) {
                console.error('Erro ao atualizar tarefa:', err);
            }
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar tarefas: {error.message}</div>;

    return (
        <div>
            <h1>Kanban</h1>
            <FormularioTarefa onTarefaCriada={handleTarefaCriada} /> {/* Formulário para criar novas tarefas */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="search">Pesquisar Tarefa: </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite uma palavra-chave"
                />
            </div>
            <div className="kanban" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {['A Fazer', 'Em Progresso', 'Concluído'].map(status => (
                    <div 
                        key={status} 
                        className="kanban -column"
                        onDragOver={(e) => e.preventDefault()} // Permitir o drop
                        onDrop={(e) => handleDrop(e, status)}
                        style={{
                            width: '30%',
                            backgroundColor: '#f0f0f0',
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>{status}</h2>
                        {tarefasFiltradas().filter(tarefa => tarefa.status === status).map(tarefa => (
                            <div 
                                key={tarefa.id} 
                                draggable 
                                onDragStart={(e) => handleDragStart(e, tarefa.id)} 
                                style={{
                                    backgroundColor: '#fff',
                                    margin: '5px 0',
                                    padding: '10px',
                                    borderRadius: '3px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <h3>{tarefa.titulo}</h3>
                                <p>{tarefa.descricao}</p>
                                <button onClick={() => mostrarDetalhes(tarefa)}>Ver Detalhes</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {detalhesCartao && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Detalhes da Tarefa</h2>
                    <p><strong>Título:</strong> {detalhesCartao.titulo}</p>
                    <p><strong>Descrição:</strong> {detalhesCartao.descricao}</p>
                    <button onClick={fecharDetalhes}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default Kanban;