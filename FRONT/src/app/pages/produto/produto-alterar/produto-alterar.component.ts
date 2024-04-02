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
  qtda: string = ""

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.produtoId = +params['id'];
      this.obterDetalhesProduto();
    });
  }

  obterDetalhesProduto(): void {
    this.client
      .get<Produto>(`https://localhost:7119/api/Produto/${this.produtoId}`)
      .subscribe({
        next: (produto) => {
          this.nome = produto.nome;
          this.preco = produto.preco;
          this.qtda = produto.qtda;
        },
        error: (erro) => {
          console.log(erro);
        },
        complete: () => {
          console.log('Requisição de detalhes do produto concluída.');
        },
      });
  }


  alterar(): void {
    let produto: Produto = {
      produtoId: this.produtoId,
      nome: this.nome,
      preco: this.preco!,
      qtda: this.qtda
    };



    this.client
      .put<Produto>(
        `https://localhost:7119/api/Produto/alterar/${this.produtoId}`,
        produto
      )
      .subscribe({

        next: (produto) => {
          this.snackBar.open(
            "Produto Alterado com sucesso!!",
            "Brasa Chef",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/produto/listar"]);
        },

        error: (erro) => {
          console.log(erro);
        },
      });


  }
}