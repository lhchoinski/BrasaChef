namespace Brasachef_API.Models;
public class ItemPedido
{
    public int? Id { get; set; }
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
    public Produto? Produto { get; set; }
}