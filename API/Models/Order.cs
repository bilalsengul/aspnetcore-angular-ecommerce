using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public string CartId { get; set; }
        public decimal TotalAmount { get; set; }
        public string CustomerEmail { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new();
    }
} 