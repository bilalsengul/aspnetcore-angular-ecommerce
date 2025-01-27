using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class CheckoutRequest
    {
        [Required]
        [EmailAddress]
        public string CustomerEmail { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public string CartId { get; set; }
    }
} 