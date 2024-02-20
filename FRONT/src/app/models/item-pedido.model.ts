import { Produto } from "./produto.model";

export interface ItemPedido {
    Id: number;
    produto: Produto;
    quatidade: number;
    


}