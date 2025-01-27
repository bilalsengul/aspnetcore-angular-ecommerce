using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        public string CartId { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }

        [Required]
        [EmailAddress]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required]
        public string ShippingAddress { get; set; } = string.Empty;
        
        public List<OrderItem> OrderItems { get; set; } = new();
    }
} 