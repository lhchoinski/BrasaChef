import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: "app-produto-alterar",
  templateUrl: "./produto-alterar.component.html",
  styleUrls: ["./produto-alterar.component.css"],
})
export class ProdutoAlterarComponent implements OnInit {
  produtoId: number = 0;
  nome: string = "";
  preco: string | null = null;

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscreva-se aos parâmetros da rota para obter o produtoId
    this.route.params.subscribe((params) => {
      this.produtoId = +params['id']; // "+" converte o parâmetro para um número
      // Agora, você pode usar this.produtoId conforme necessário
    });
  }

  alterar(): void {
    let produto: Produto = {
      produtoId: this.produtoId, // Certifique-se de incluir o produtoId se necessário
      nome: this.nome,
      preco: this.preco!,
    };
  
    this.client
      .put<Produto>(
        `https://localhost:7119/api/Produto/alterar/${this.produtoId}`,
        produto
      )
      .subscribe({
        next: (produto) => {
          // ...
        },
        error: (erro) => {
          console.log(erro);
        },
        complete: () => {
          console.log('Requisição concluída.');
        },
      });
  }
}