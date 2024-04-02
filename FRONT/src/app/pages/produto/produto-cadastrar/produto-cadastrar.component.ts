import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Produto } from "src/app/models/produto.model";



@Component({
  selector: "app-produto-cadastrar",
  templateUrl: "./produto-cadastrar.component.html",
  styleUrls: ["./produto-cadastrar.component.css"],
})
export class ProdutoCadastrarComponent {

  nome: string = "";
  preco: string = "";
  qtda: string = "";


  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  cadastrar(): void {
    let produto: Produto = {
      nome: this.nome,
      preco: this.preco,
      qtda: this.qtda
    };

    this.client
      .post<Produto>(
        "https://localhost:7119/api/Produto/post",
        produto
      )
      .subscribe({

        next: (produto) => {
          this.snackBar.open(
            "Produto cadastrado com sucesso!!",
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
