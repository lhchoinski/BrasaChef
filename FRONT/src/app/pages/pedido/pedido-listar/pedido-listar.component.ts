import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Produto } from "src/app/models/produto.model";
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-pedido-listar',
  templateUrl: './pedido-listar.component.html',
  styleUrls: ['./pedido-listar.component.css']
})
export class PedidoListarComponent {
  colunasTabela: string[] = [
    "id",
    "cliente",
    "itemPedido",
    "valorTotal",
    "deletar",
    "alterar",
  ];
  pedidos: Pedido[] = [];
  router: any;

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  }
  
  ngOnInit(): void {
    this.client
      .get<Pedido[]>("https://localhost:7119/api/pedido/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (pedidos) => {
          console.table(pedidos);
          this.pedidos = pedidos;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(pedidoId: number) {
    this.client
      .delete<Pedido[]>(
        `https://localhost:7119/api/pedido/delete/${pedidoId}`
      )
      .subscribe({
        next: (pedidos) => {
          this.snackBar.open(
            "Pedido alterado com sucesso!!",
            "Fechar",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          // Recarrega a página após a navegação
          window.location.reload();
        },
        error: (erro) => {
          console.log(erro);
        },
      });
      
  }
}

