using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class AddToCartRequest
    {
        [Required]
        [JsonPropertyName("cartId")]
        public string CartId { get; set; }
        
        [Required]
        [JsonPropertyName("productId")]
        public int ProductId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }
    }
} 