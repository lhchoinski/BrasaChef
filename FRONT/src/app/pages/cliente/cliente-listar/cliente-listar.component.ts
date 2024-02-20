import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Cliente } from "src/app/models/cliente.model";
import { Produto } from "src/app/models/produto.model";

@Component({
  selector: "app-cliente-listar",
  templateUrl: "./cliente-listar.component.html",
  styleUrls: ["./cliente-listar.component.css"],
})
export class ClienteListarComponent {
  colunasTabela: string[] = [
    "id",
    "nome",
    "contato",
    "endereco",
    "deletar",
    "alterar",
  ];
  clientes: Cliente[] = [];
  router: any;

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  }

  ngOnInit(): void {
    this.client
      .get<Cliente[]>("https://localhost:7119/api/Cliente/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (clientes) => {
          console.table(clientes);
          this.clientes = clientes;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(clienteId: number) {
    this.client
      .delete<Cliente[]>(
        `https://localhost:7119/api/Cliente/delete/${clienteId}`
      )
      .subscribe({
        next: (produto) => {
          this.snackBar.open(
            "Produto alterado com sucesso!!",
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
