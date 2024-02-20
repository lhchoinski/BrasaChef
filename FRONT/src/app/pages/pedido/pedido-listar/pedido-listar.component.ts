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
  cadastrar(): void {
     

    let pedido = {
      clienteId: 1,
      itemPedido: [
        { ProdutoId: 1, quantidade: 2 },
        { ProdutoId: 3, quantidade: 3 }
      ]
    };
    console.log(pedido)
    
    

    this.client
      .post<Pedido>(
        "https://localhost:7119/api/Pedido/post",
        pedido
      )
      .subscribe({
        //A requisição funcionou
        next: (pedido) => {
          this.snackBar.open(
            "Pedido cadastrado com sucesso!!",
            "Brasa Chef",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/pedido/listar"]);
        },
        //A requisição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
  ngOnInit(): void {
    this.client
      .get<Pedido[]>("https://localhost:7119/api/Pedido/getAll")
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
        `https://localhost:7119/api/Pedido/deletar/${pedidoId}`
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

