using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CognitiveServicesDemo.FormRecognizer.Models
{
    public enum ModelType
    {
        Invoices = 0,
        Receipts = 1
    }

    public static class ModelTypeExtensions
    {
        public static string ConvertToString(this ModelType modelType)
        {
            return modelType switch
            {
                ModelType.Invoices => "invoices",
                ModelType.Receipts => "receipts",
                _ => null
            };
        }

        public static ModelType? ConvertToModelType(this string modelTypeString)
        {
            if (string.IsNullOrWhiteSpace(modelTypeString))
            {
                return null;
            }
            var trimmedValue = Regex.Replace(modelTypeString, @"\s", "");
            return trimmedValue switch
            {
                "invoices" => ModelType.Invoices,
                "receipts" => ModelType.Receipts,
                _ => null
            };
        }
    }
}
