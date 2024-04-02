import { Produto } from "./produto.model";

export interface ItemPedido {
  id?: number;
  produtoId: number;
  quantidade: number;
  produto?: Produto;
}