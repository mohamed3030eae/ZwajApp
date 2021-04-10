using System;

namespace ZwajApp.API.Models
{
    public class Payment
    {
         public int Id { get; set; } 
         //تاريخ السداد
        public DateTime PaymentDate {get; set;}
        //القيمة
        public double Amount { get; set; } 
        public int UserId { get; set; } 
        //الموقع الخاص بالسداد
        public string ReceiptUrl { get; set; } 
        public string Description  { get; set; }
        //العملة
        public string Currency  { get; set; }
        //اختبار هل تم السداد أم لا
        public bool IsPaid { get; set; }
    }
}