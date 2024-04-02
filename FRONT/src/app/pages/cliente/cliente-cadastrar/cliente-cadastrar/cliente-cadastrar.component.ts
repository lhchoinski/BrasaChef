import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Produto } from "src/app/models/produto.model";
import { Cliente } from "src/app/models/cliente.model";

@Component({
  selector: "app-cliente-cadastrar",
  templateUrl: "./cliente-cadastrar.component.html",
  styleUrls: ["./cliente-cadastrar.component.css"],
})
export class ClienteCadastrarComponent {
  nome: string = "";
  contato: string = "";
  endereco: string = "";


  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  formatarContato(contato: string): string {

    const cleaned = ('' + contato).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {

      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return contato;
  }

  cadastrar(): void {
    let cliente: Cliente = {
      nome: this.nome,
      contato: this.contato,
      endereco: this.endereco
    };

    this.client
      .post<Produto>(
        "https://localhost:7119/api/Cliente/post",
        cliente
      )
      .subscribe({

        next: (produto) => {
          this.snackBar.open(
            "Cliente cadastrado com sucesso!!",
            "Brasa Chef",
            {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/cliente/listar"]);
        },

        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
