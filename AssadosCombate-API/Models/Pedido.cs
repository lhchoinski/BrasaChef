namespace AssadosCombate_API.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        public Cliente? Cliente { get; set; }
        public Item_Pedido? ItemPedido { get; set; } 
        public string? ValorTotal { get; set; }  
    }
}
