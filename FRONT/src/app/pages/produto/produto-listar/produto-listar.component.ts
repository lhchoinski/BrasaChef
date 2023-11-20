import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: "app-produto-listar",
  templateUrl: "./produto-listar.component.html",
  styleUrls: ["./produto-listar.component.css"],
})
export class ProdutoListarComponent {
  colunasTabela: string[] = [
    "id",
    "nome",
    "preco",
    "deletar",
    "alterar",
  ];
  produtos: Produto[] = [];

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  }

  ngOnInit(): void {
    this.client
      .get<Produto[]>("https://localhost:7119/api/Produto/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (produtos) => {
          console.table(produtos);
          this.produtos = produtos;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(produtoId: number) {
    this.client
      .delete<Produto[]>(
        `https://localhost:7119/api/Produto/deletar/${produtoId}`
      )
      .subscribe({
        //Requisição com sucesso
        next: (produtos) => {
          this.produtos = produtos;
          this.snackBar.open(
            "Produto deletado com sucesso!!",
            "E-commerce",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
