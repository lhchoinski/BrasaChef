import { Cliente } from "./cliente.model";
import { ItemPedido } from "./itemPedido.model";

export interface Pedido {
  pedidoId?: number;
  cliente?: Cliente;
  clienteId: number;
  itens: ItemPedido[];
  valorTotal?: number;
  createdAt?: Date;
}