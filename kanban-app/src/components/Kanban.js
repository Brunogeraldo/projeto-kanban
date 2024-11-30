import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Kanban.css'; // Certifique-se de ter um arquivo CSS para estilização
import FormularioTarefa from './FormularioCartao'; // Importando o formulário

const Kanban = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('Todas'); // Estado para o filtro
    const [detalhesCartao, setDetalhesCartao] = useState(null); // Estado para detalhes do cartão

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
        if (filtro === 'Concluídas') {
            return tarefas.filter(tarefa => tarefa.status === 'Concluído');
        } else if (filtro === 'Mais Recentes') {
            return [...tarefas].sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
        }
        return tarefas; // Retorna todas as tarefas se o filtro for "Todas"
    };

    const mostrarDetalhes = (tarefa) => {
        setDetalhesCartao(tarefa); // Define a tarefa selecionada para mostrar os detalhes
    };

    const fecharDetalhes = () => {
        setDetalhesCartao(null); // Limpa os detalhes ao fechar
    };

    const handleDragStart = (e, tarefaId) => {
        // Guarda o ID da tarefa que está sendo arrastada
        e.dataTransfer.setData('tarefaId', tarefaId);
    };

    const handleDrop = async (e, novoStatus) => {
        const tarefaId = e.dataTransfer.getData('tarefaId');
        const tarefaAtualizada = tarefas.find(tarefa => tarefa.id === parseInt(tarefaId));
    
        if (tarefaAtualizada) {
            // Cria um objeto com os dados que serão atualizados (no caso, apenas o status)
            const updatedTask = { status: novoStatus };
    
            try {
                // Usando PATCH para atualizar o status da tarefa no backend
                await axios.patch(`http://localhost:3000/tarefas/${tarefaId}`, updatedTask);
    
                // Atualizando o estado local imediatamente após a requisição
                setTarefas(prevTarefas => 
                    prevTarefas.map(tarefa => 
                        tarefa.id === tarefaId ? { ...tarefa, status: novoStatus } : tarefa
                    )
                );
            } catch (err) {
                console.error('Erro ao atualizar tarefa:', err);
            }
        }
    };
    

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessário para permitir o "drop"
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tarefas/${id}`);
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar tarefas: {error.message}</p>;

    // Agrupando tarefas por status
    const tarefasAgrupadas = {
        'A Fazer': [],
        'Em Progresso': [],
        'Concluído': [],
    };

    tarefasFiltradas().forEach(tarefa => {
        tarefasAgrupadas[tarefa.status].push(tarefa);
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="filtro">Filtrar tarefas: </label>
                <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="Todas">Todas</option>
                    <option value="Concluídas">Concluídas</option>
                    <option value="Mais Recentes">Mais Recentes</option>
                </select>
            </div>
            <div className="kanban" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {Object.entries(tarefasAgrupadas).map(([status]) => (
                    <div 
                        key={status} 
                        className="kanban-column"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                        style={{
                            width: '30%',
                            backgroundColor: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>{status}</h2>
                        {tarefasAgrupadas[status].map((tarefa) => (
                            <div 
                                key={tarefa.id} 
                                className="kanban-card" 
                                draggable 
                                onDragStart={(e) => handleDragStart(e, tarefa.id)}
                                onClick={() => mostrarDetalhes(tarefa)}
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                }}
                            >
                                <h3>{tarefa.titulo}</h3>
                                <p>{tarefa.descricao}</p>
                                <p><strong>Data de Criação:</strong> {new Date(tarefa.dataCriacao).toLocaleDateString()}</p>

                                {/* Botão de deletar */}
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(tarefa.id)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        marginTop: '5px',
                                    }}
                                >
                                    Deletar
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <FormularioTarefa onTarefaCriada={handleTarefaCriada} />

            {/* Detalhes do Cartão */}
            {detalhesCartao && (
                <div className="detalhes-cartao">
                    <h2>Detalhes da Tarefa</h2>
                    <h3>{detalhesCartao.titulo}</h3>
                    <p><strong>Descrição:</strong> {detalhesCartao.descricao}</p>
                    <p><strong>Status:</strong> {detalhesCartao.status}</p>
                    <p><strong>Data de Criação:</strong> {new Date(detalhesCartao.dataCriacao).toLocaleDateString()}</p>
                    <button onClick={fecharDetalhes}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default Kanban;
