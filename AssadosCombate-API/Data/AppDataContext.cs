﻿using AssadosCombate_API.Models;
using Microsoft.EntityFrameworkCore;

namespace AssadosCombate_API.Data;
public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
    {

    }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Pedido>()
        .HasKey(p => p.PedidoId); // Define a chave primária PedidoId

    // Outras configurações...

}

}

