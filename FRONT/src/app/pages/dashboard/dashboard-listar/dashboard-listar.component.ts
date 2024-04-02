// dashboard-listar.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-listar',
  templateUrl: './dashboard-listar.component.html',
  styleUrls: ['./dashboard-listar.component.css']
})
export class DashboardListarComponent implements OnInit {
  totalClientes: number = 0;
  totalPedidos: number = 0;
  totalProdutos: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obterTotalClientes();
    this.obterTotalPedidos();
    this.obterTotalProdutos();
  }

  obterTotalClientes() {
    this.http.get<any>('https://localhost:7119/api/Cliente/getAll')
      .subscribe(
        data => {
          console.log('Dados dos clientes:', data);
          this.totalClientes = data.length;
        },
        error => {
          console.error('Erro ao obter total de clientes:', error);
        }
      );
  }

  obterTotalPedidos() {
    this.http.get<any>('https://localhost:7119/api/Pedido/getAll')
      .subscribe(
        data => {
          console.log('Dados dos pedidos:', data);
          this.totalPedidos = data.length;
        },
        error => {
          console.error('Erro ao obter total de pedidos:', error);
        }
      );
  }

  obterTotalProdutos() {
    this.http.get<any>('https://localhost:7119/api/Produto/getAll')
      .subscribe(
        data => {
          console.log('Dados dos produtos:', data);
          this.totalProdutos = data.length;
        },
        error => {
          console.error('Erro ao obter total de produtos:', error);
        }
      );
  }
}
