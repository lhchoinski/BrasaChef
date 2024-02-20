import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProdutoListarComponent } from "./pages/produto/produto-listar/produto-listar.component";
import { ProdutoCadastrarComponent } from "./pages/produto/produto-cadastrar/produto-cadastrar.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProdutoAlterarComponent } from './pages/produto/produto-alterar/produto-alterar.component';
import { ClienteListarComponent } from './pages/cliente/cliente-listar/cliente-listar.component';
import { ClienteCadastrarComponent } from './pages/cliente/cliente-cadastrar/cliente-cadastrar/cliente-cadastrar.component';
import { ClienteAlterarComponent } from './pages/cliente/cliente-alterar/cliente-alterar.component';
import { PedidoListarComponent } from './pages/pedido/pedido-listar/pedido-listar.component';
import { PedidoCadastrarComponent } from './pages/pedido/pedido-cadastrar/pedido-cadastrar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoListarComponent,
    ProdutoCadastrarComponent,
    ProdutoAlterarComponent,
    ClienteListarComponent,
    ClienteCadastrarComponent,
    ClienteAlterarComponent,
    PedidoListarComponent,
    PedidoCadastrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
