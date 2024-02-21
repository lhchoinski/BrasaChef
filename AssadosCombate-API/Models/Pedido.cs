namespace AssadosCombate_API.Models;

    public class Pedido
    {
        public int? PedidoId { get; set; }
        public Cliente? Cliente { get; set; }
        public int ClienteId { get; set; }
        public Produto? Produto { get; set; } 
        public int ProdutoId { get; set; } 
        public double? ValorTotal { get; set; }  
        public DateTime? CreatedAt { get; internal set; }
    }