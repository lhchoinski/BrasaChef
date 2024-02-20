import { Cliente } from "./cliente.model";
import { ItemPedido } from "./item-pedido.model";

export interface Pedido {
  pedidoId?: number;
  cliente?: Cliente;
  itemPedido?: ItemPedido;
  valorTotal: string;
  createdAt?: Date;
}
