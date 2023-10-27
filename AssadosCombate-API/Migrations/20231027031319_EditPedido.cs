using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssadosCombate_API.Migrations
{
    /// <inheritdoc />
    public partial class EditPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_Pedido_Produtos_ProdutoId",
                table: "Item_Pedido");

            migrationBuilder.AlterColumn<int>(
                name: "ProdutoId",
                table: "Item_Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Pedido_Produtos_ProdutoId",
                table: "Item_Pedido",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_Pedido_Produtos_ProdutoId",
                table: "Item_Pedido");

            migrationBuilder.AlterColumn<int>(
                name: "ProdutoId",
                table: "Item_Pedido",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Pedido_Produtos_ProdutoId",
                table: "Item_Pedido",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId");
        }
    }
}
