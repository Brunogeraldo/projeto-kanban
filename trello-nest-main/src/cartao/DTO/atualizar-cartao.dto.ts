// src/cartao/DTO/atualizar-cartao.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class AtualizarCartaoDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  // Não inclua dataCriacao aqui, pois não pertence ao Cartao
}