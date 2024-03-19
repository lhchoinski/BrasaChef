import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Pedido } from "src/app/models/pedido.model";
import { Cliente } from "src/app/models/cliente.model";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: 'app-pedido-cadastrar',
  templateUrl: './pedido-cadastrar.component.html',
  styleUrls: ['./pedido-cadastrar.component.css']
})
export class PedidoCadastrarComponent implements OnInit {
  
  pedido: Pedido = { clienteId: 0, itens: [] };
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  cadastrar(): void {
    this.client.post<Pedido>(
      "https://localhost:7119/api/pedido/post",
      this.pedido
    ).subscribe({
      next: () => {
        this.snackBar.open("Pedido cadastrado com sucesso!!", "Fechar", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/pedido/listar"]);
      },
      error: (erro) => {
        console.error("Erro ao cadastrar pedido:", erro);
      }
    });
  }

  adicionarItem(): void {
    this.pedido.itens.push({ produtoId: 0, quantidade: 0 });
  }

  removerItem(index: number): void {
    this.pedido.itens.splice(index, 1);
  }

  ngOnInit(): void {
    this.client.get<Cliente[]>("https://localhost:7119/api/cliente/getAll")
      .subscribe({
        next: (clientes) => {
          this.clientes = clientes;
        },
        error: (error) => {
          console.error("Erro ao buscar clientes:", error);
        }
      });

    this.client.get<Produto[]>("https://localhost:7119/api/produto/getAll")
      .subscribe({
        next: (produtos) => {
          this.produtos = produtos;
        },
        error: (error) => {
          console.error("Erro ao buscar produtos:", error);
        }
      });
  }
}
