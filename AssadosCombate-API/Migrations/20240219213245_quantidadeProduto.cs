using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssadosCombate_API.Migrations
{
    /// <inheritdoc />
    public partial class quantidadeProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Qtda",
                table: "Produtos",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qtda",
                table: "Produtos");
        }
    }
}
