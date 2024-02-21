import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente.model";
import { Produto } from "src/app/models/produto.model";
import { Pedido } from "src/app/models/pedido.model";

@Component({
  selector: 'app-pedido-cadastrar',
  templateUrl: './pedido-cadastrar.component.html',
  styleUrls: ['./pedido-cadastrar.component.css']
})
export class PedidoCadastrarComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
 
}
