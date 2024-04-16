using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brasachef_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Pedidos_PedidoId",
                table: "ItemPedido");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedido_Produtos_ProdutoId",
                table: "ItemPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemPedido",
                table: "ItemPedido");

            migrationBuilder.RenameTable(
                name: "ItemPedido",
                newName: "ItensPedidos");

            migrationBuilder.RenameIndex(
                name: "IX_ItemPedido_ProdutoId",
                table: "ItensPedidos",
                newName: "IX_ItensPedidos_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemPedido_PedidoId",
                table: "ItensPedidos",
                newName: "IX_ItensPedidos_PedidoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItensPedidos",
                table: "ItensPedidos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItensPedidos_Pedidos_PedidoId",
                table: "ItensPedidos",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "PedidoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItensPedidos_Produtos_ProdutoId",
                table: "ItensPedidos",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensPedidos_Pedidos_PedidoId",
                table: "ItensPedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_ItensPedidos_Produtos_ProdutoId",
                table: "ItensPedidos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItensPedidos",
                table: "ItensPedidos");

            migrationBuilder.RenameTable(
                name: "ItensPedidos",
                newName: "ItemPedido");

            migrationBuilder.RenameIndex(
                name: "IX_ItensPedidos_ProdutoId",
                table: "ItemPedido",
                newName: "IX_ItemPedido_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_ItensPedidos_PedidoId",
                table: "ItemPedido",
                newName: "IX_ItemPedido_PedidoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemPedido",
                table: "ItemPedido",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Pedidos_PedidoId",
                table: "ItemPedido",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "PedidoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedido_Produtos_ProdutoId",
                table: "ItemPedido",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
