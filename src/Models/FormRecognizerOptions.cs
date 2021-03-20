using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CognitiveServicesDemo.FormRecognizer.Models
{
    public class FormRecognizerOptions
    {
        public const string FormRecognizer = "FormRecognizer";

        public string Endpoint { get; set; }

        public string ApiKey { get; set; }
    }
}
