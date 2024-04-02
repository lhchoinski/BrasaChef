import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
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

  }

  ngOnInit(): void {
    this.client
      .get<Pedido[]>("https://localhost:7119/api/pedido/getAll")
      .subscribe({

        next: (pedidos) => {
          console.table(pedidos);
          this.pedidos = pedidos;
        },

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

          window.location.reload();
        },
        error: (erro) => {
          console.log(erro);
        },
      });

  }
}

