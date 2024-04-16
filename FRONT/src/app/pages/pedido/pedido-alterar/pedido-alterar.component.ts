import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Pedido } from "src/app/models/pedido.model";
import { Cliente } from "src/app/models/cliente.model";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: 'app-pedido-alterar',
  templateUrl: './pedido-alterar.component.html',
  styleUrls: ['./pedido-alterar.component.css']
})
export class PedidoAlterarComponent implements OnInit {

  pedidoId: number = 0;
  pedido: Pedido = { clienteId: 0, itens: [] };
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.pedidoId = +params['id'];
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

      this.obterDetalhesPedido();

    });
  }

  obterDetalhesPedido(): void {
    this.client
      .get<Pedido>(`https://localhost:7119/api/Pedido/${this.pedidoId}`)
      .subscribe({
        next: (pedido) => {
          this.pedido = pedido;

        },
        error: (erro) => {
          console.log(erro);
        },
        complete: () => {
          console.log('Requisição de detalhes do pedido concluída.');
        },
      });
  }

  adicionarItem(): void {
    this.pedido.itens.push({ produtoId: 0, quantidade: 0 });
  }

  removerItem(index: number): void {
    this.pedido.itens.splice(index, 1);
  }

  alterar(): void {
    let pedido: Pedido = {
      pedidoId: this.pedidoId,
      clienteId: this.pedido.clienteId,
      itens: this.pedido.itens
    };

    this.client
      .put<Pedido>(
        `https://localhost:7119/api/Pedido/put/${this.pedidoId}`,
        pedido
      )
      .subscribe({
        next: (pedido) => {
          this.snackBar.open(
            "Pedido Alterado com sucesso!!",
            "Brasa Chef",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/pedido/listar"]);
        },

        error: (erro) => {
          console.log(erro);
        },
      });


  }
}
