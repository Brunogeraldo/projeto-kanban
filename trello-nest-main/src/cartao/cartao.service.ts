import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartao } from './cartao.entity';
import { CriarCartaoDto } from './DTO/criar-cartao.dto';
import { AtualizarCartaoDto } from './DTO/atualizar-cartao.dto';
import { Tarefa } from '../tarefa/tarefa.entity';

@Injectable()
export class CartaoService {
  constructor(
    @InjectRepository(Cartao)
    private cartaoRepository: Repository<Cartao>,
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
  ) {}

  async create(criarCartaoDto: CriarCartaoDto): Promise<Cartao> {
    console.log('tarefaId recebido:', criarCartaoDto.tarefaId); // Log para depuração

    // Verifica se a tarefa existe
    const tarefa = await this.tarefaRepository.findOne({
        where: { id: criarCartaoDto.tarefaId },
    });

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    // Cria o cartão
    const cartao = this.cartaoRepository.create({
        ...criarCartaoDto,
        tarefa, // Associando a tarefa ao cartão
    });

    // Salva o cartão no banco de dados
    try {
        return await this.cartaoRepository.save(cartao);
    } catch (error) {
        console.error('Erro ao salvar o cartão:', error);
        throw new Error('Erro ao criar o cartão');
    }
}
  findAll(): Promise<Cartao[]> {
    return this.cartaoRepository.find({ relations: ['tarefa'] });
  }

  findOne(id: number): Promise<Cartao> {
    return this.cartaoRepository.findOne({
      where: { id },
      relations: ['tarefa'], // Para incluir a tarefa na busca
    });
  }

  async update(id: number, atualizarCartaoDto: AtualizarCartaoDto): Promise<Cartao> {
    // Verifique se atualizarCartaoDto não contém 'dataCriacao'
    await this.cartaoRepository.update(id, atualizarCartaoDto);
    return this.findOne(id);
}

  async remove(id: number): Promise<void> {
    await this.cartaoRepository.delete(id);
  }

  async atualizarStatus(id: number, status: 'A Fazer' | 'Em Progresso' | 'Concluído'): Promise<Cartao> {
    await this.cartaoRepository.update(id, { status });
    return this.findOne(id);
  }
  
}
