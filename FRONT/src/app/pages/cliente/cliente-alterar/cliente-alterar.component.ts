import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente-alterar',
  templateUrl: './cliente-alterar.component.html',
  styleUrls: ['./cliente-alterar.component.css']
})
export class ClienteAlterarComponent {
  clienteId: number = 0;
  nome: string = "";
  contato: string = ""
  endereco: string = ""

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  formatarContato(contato: string): string {

    const cleaned = ('' + contato).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return contato;
  }
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.clienteId = +params['id'];

      this.obterDetalhesCliente();
    });
  }

  obterDetalhesCliente(): void {
    this.client
      .get<Cliente>(`https://localhost:7119/api/Cliente/${this.clienteId}`)
      .subscribe({
        next: (cliente) => {
          this.nome = cliente.nome;
          this.contato = cliente.contato;
          this.endereco = cliente.endereco;
        },
        error: (erro) => {
          console.log(erro);
        },
        complete: () => {
          console.log('Requisição de detalhes do cliente concluída.');
        },
      });
  }


  alterar(): void {
    let cliente: Cliente = {
      clienteId: this.clienteId,
      nome: this.nome,
      contato: this.contato,
      endereco: this.endereco
    };

    this.client
      .put<Cliente>(
        `https://localhost:7119/api/Cliente/put/${this.clienteId}`,
        cliente
      )
      .subscribe({

        next: (cliente) => {
          this.snackBar.open(
            "Cliente Alterado com sucesso!!",
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
