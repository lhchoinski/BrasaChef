import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListarComponent } from "./pages/produto/produto-listar/produto-listar.component";
import { ProdutoCadastrarComponent } from "./pages/produto/produto-cadastrar/produto-cadastrar.component";
import { ProdutoAlterarComponent } from "./pages/produto/produto-alterar/produto-alterar.component";
import { ClienteListarComponent } from "./pages/cliente/cliente-listar/cliente-listar.component";
import { ClienteCadastrarComponent } from "./pages/cliente/cliente-cadastrar/cliente-cadastrar/cliente-cadastrar.component";
import { ClienteAlterarComponent } from "./pages/cliente/cliente-alterar/cliente-alterar.component";
import { PedidoListarComponent } from "./pages/pedido/pedido-listar/pedido-listar.component";

const routes: Routes = [
  
  {
    path: "pages/produto/listar",
    component: ProdutoListarComponent,
  },
  {
    path: "pages/produto/cadastrar",
    component: ProdutoCadastrarComponent,
  },
  {
    path: "pages/produto/alterar/:id",
    component: ProdutoAlterarComponent,
  },
  {
    path: "pages/cliente/listar",
    component: ClienteListarComponent,
  },
  {
    path: "pages/cliente/cadastrar",
    component: ClienteCadastrarComponent,
  },
  {
    path: "pages/cliente/alterar/:id",
    component: ClienteAlterarComponent,
  },
  {
    path: "pages/pedido/listar",
    component: PedidoListarComponent,
  },
  {
    path: "pages/pedido/cadastrar",
    component: PedidoListarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
