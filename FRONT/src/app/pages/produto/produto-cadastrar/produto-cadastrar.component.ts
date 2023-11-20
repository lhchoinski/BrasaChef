import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: "app-produto-cadastrar",
  templateUrl: "./produto-cadastrar.component.html",
  styleUrls: ["./produto-cadastrar.component.css"],
})
export class ProdutoCadastrarComponent {
  nome: string = "";
  preco: string = "";
 

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}


  cadastrar(): void {
    let produto: Produto = {
      nome: this.nome,
      preco: this.preco,
    };

    this.client
      .post<Produto>(
        "https://localhost:7119/api/Produto/post",
        produto
      )
      .subscribe({
        //A requição funcionou
        next: (produto) => {
          this.snackBar.open(
            "Produto cadastrado com sucesso!!",
            "E-commerce",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/produto/listar"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
