
namespace AssadosCombate_API.Models
{
    public class Pedido
    {
        public int? Id { get; set; }
        public Cliente? Cliente { get; set; }
        public Item_Pedido? ItemPedido { get; set; } 
        public double? ValorTotal { get; set; }  
        public int ClienteId { get; set; }
        public int? ProdutoId { get; set; }
        public DateTime CreatedAt { get; internal set; }
    }
}
