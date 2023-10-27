namespace AssadosCombate_API.Models
{
    public class Item_Pedido
    {
        public int Id { get; set; }
        public Produto? produto { get; set; }
        public int Quantidade { get; set; }
        public int ProdutoId { get;set;}

    }
}
