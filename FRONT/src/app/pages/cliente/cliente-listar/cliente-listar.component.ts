import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/models/cliente.model";

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

  }

  ngOnInit(): void {
    this.client
      .get<Cliente[]>("https://localhost:7119/api/Cliente/getAll")
      .subscribe({

        next: (clientes) => {
          console.table(clientes);
          this.clientes = clientes;
        },

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
        next: (cliente) => {
          this.snackBar.open(
            "Produto deletado com sucesso!!",
            "Fechar",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );

          window.location.reload();
        },
        error: (erro) => {
          console.log(erro);
        },
      });

  }
}
