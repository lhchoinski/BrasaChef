namespace Brasachef_API.Models;

    public class Pedido
    {
        public int? PedidoId { get; set; }
        public Cliente? Cliente { get; set; }
        public int ClienteId { get; set; } 
         public List<ItemPedido> Itens { get; set; } = new List<ItemPedido>();
        public double? ValorTotal { get; set; }  
        public DateTime? CreatedAt { get; internal set; }
    }