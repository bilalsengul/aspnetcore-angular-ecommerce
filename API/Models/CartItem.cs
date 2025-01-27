using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        
        [Required]
        public string CartId { get; set; } = string.Empty;
        
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
} 