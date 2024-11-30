// AtualizarTarefa.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { StatusTarefa } from '../tarefa.entity'; // Importe o enum StatusTarefa

export class AtualizarTarefaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsEnum(StatusTarefa) // Valida que o status deve ser um dos valores do enum StatusTarefa
  status?: StatusTarefa;
}
