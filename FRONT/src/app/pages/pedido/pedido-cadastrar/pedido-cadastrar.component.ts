import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente.model";
import { Produto } from "src/app/models/produto.model";
import { Pedido } from "src/app/models/pedido.model";

@Component({
  selector: 'app-pedido-cadastrar',
  templateUrl: './pedido-cadastrar.component.html',
  styleUrls: ['./pedido-cadastrar.component.css']
})
export class PedidoCadastrarComponent implements OnInit {
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  clienteSelecionado: Cliente | null = null;
  produtoSelecionado: Produto | null = null;
 
  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarClientes(): void {
    // Lógica para carregar os clientes do servidor
    // Exemplo:
    // this.client.get<Cliente[]>("https://localhost:7119/api/Cliente").subscribe(clientes => this.clientes = clientes);
  }

  carregarProdutos(): void {
    // Lógica para carregar os produtos do servidor
    // Exemplo:
    // this.client.get<Produto[]>("https://localhost:7119/api/Produto").subscribe(produtos => this.produtos = produtos);
  }


  cadastrar(): void {
    if (!this.clienteSelecionado || !this.produtoSelecionado) {
      return;
    }

    let pedido: Pedido = {
      cliente: this.clienteSelecionado,
     
      valorTotal: "", // Preencha o valor total conforme necessário
      createdAt: new Date(), // Preencha a data de criação conforme necessário
    };
    
    

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
}
