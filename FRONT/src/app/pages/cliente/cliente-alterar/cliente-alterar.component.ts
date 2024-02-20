import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "src/app/models/produto.model";
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
  ) {}

  formatarContato(contato: string): string {
    // Remove todos os caracteres não numéricos do número de telefone
    const cleaned = ('' + contato).replace(/\D/g, '');
    
    // Separa o número em ddd, prefixo e sufixo
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  
    if (match) {
      // Formata o número no formato (ddd) xxxxx-xxxx
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
  
    // Retorna o número original se não puder ser formatado
    return contato;
  }
  ngOnInit(): void {
    // Subscreva-se aos parâmetros da rota para obter o produtoId
    this.route.params.subscribe((params) => {
      this.clienteId = +params['id']; // "+" converte o parâmetro para um número
      // Agora, você pode usar this.produtoId para fazer uma requisição GET e obter os detalhes do produto
      this.obterDetalhesCliente();
    });
  }
  
  obterDetalhesCliente(): void {
    this.client
      .get<Cliente>(`https://localhost:7119/api/Cliente/${this.clienteId}`)
      .subscribe({
        next: (cliente) => {
          // Preencha as propriedades do componente com os detalhes do produto
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
      clienteId: this.clienteId, // Certifique-se de incluir o produtoId se necessário
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
        //A requição funcionou
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
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
      
      
  }
}
