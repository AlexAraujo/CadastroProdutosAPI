using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Produto
    {
        public Int64 Id { get; set; }
        [MaxLength(40),Required(ErrorMessage = "Esse valor não pode ser nulo")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Esse valor não pode ser nulo")]
        public double Preco { get; set; }
    }
}