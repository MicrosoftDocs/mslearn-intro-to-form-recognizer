using Azure;
using Azure.AI.FormRecognizer;
using Azure.AI.FormRecognizer.Models;
using CognitiveServicesDemo.FormRecognizer.Models;
using System;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CognitiveServicesDemo.FormRecognizer.Services
{
    // TODO: Check if we wanna an interface here to make it look more real
    public class InvoiceRecognizerService
    {
        private static readonly RecognizeInvoicesOptions OperationOptions = new RecognizeInvoicesOptions() { Locale = "en-US" };
        private FormRecognizerOptions _options;
        private FormRecognizerClient _client;

        public InvoiceRecognizerService(FormRecognizerOptions options)
        {
            _options = options;
        }


        public async Task<RecognizedForm> Analyze(Uri invoiceUri)
        {
            RecognizeInvoicesOperation operation = await GetClient().StartRecognizeInvoicesFromUriAsync(invoiceUri, OperationOptions);
            Response<RecognizedFormCollection> operationResponse = await operation.WaitForCompletionAsync();
            RecognizedFormCollection invoices = operationResponse.Value;

            return ProcessResults(invoices);
        }

        public async Task<RecognizedForm> Analyze(Stream fileStream)
        {
            var options = new RecognizeInvoicesOptions() { Locale = "en-US" };

            RecognizeInvoicesOperation operation = await GetClient().StartRecognizeInvoicesAsync(fileStream, options);
            Response<RecognizedFormCollection> operationResponse = await operation.WaitForCompletionAsync();
            RecognizedFormCollection invoices = operationResponse.Value;

            return ProcessResults(invoices);
        }

        private RecognizedForm ProcessResults(RecognizedFormCollection invoices)
        {
            // To see the list of the supported fields returned by service and its corresponding types, consult:
            // https://aka.ms/formrecognizer/invoicefields
            RecognizedForm invoice = invoices.Single();

            // TODO: Update code to return json with results
            if (invoice.Fields.TryGetValue("InvoiceId", out FormField invoiceIdField))
            {
                if (invoiceIdField.Value.ValueType == FieldValueType.String)
                {
                    string invoiceId = invoiceIdField.Value.AsString();
                    Console.WriteLine($"Invoice Id: '{invoiceId}', with confidence {invoiceIdField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("InvoiceDate", out FormField invoiceDateField))
            {
                if (invoiceDateField.Value.ValueType == FieldValueType.Date)
                {
                    DateTime invoiceDate = invoiceDateField.Value.AsDate();
                    Console.WriteLine($"Invoice Date: '{invoiceDate}', with confidence {invoiceDateField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("DueDate", out FormField dueDateField))
            {
                if (dueDateField.Value.ValueType == FieldValueType.Date)
                {
                    DateTime dueDate = dueDateField.Value.AsDate();
                    Console.WriteLine($"Due Date: '{dueDate}', with confidence {dueDateField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("VendorName", out FormField vendorNameField))
            {
                if (vendorNameField.Value.ValueType == FieldValueType.String)
                {
                    string vendorName = vendorNameField.Value.AsString();
                    Console.WriteLine($"Vendor Name: '{vendorName}', with confidence {vendorNameField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("VendorAddress", out FormField vendorAddressField))
            {
                if (vendorAddressField.Value.ValueType == FieldValueType.String)
                {
                    string vendorAddress = vendorAddressField.Value.AsString();
                    Console.WriteLine($"Vendor Address: '{vendorAddress}', with confidence {vendorAddressField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("CustomerName", out FormField customerNameField))
            {
                if (customerNameField.Value.ValueType == FieldValueType.String)
                {
                    string customerName = customerNameField.Value.AsString();
                    Console.WriteLine($"Customer Name: '{customerName}', with confidence {customerNameField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("CustomerAddress", out FormField customerAddressField))
            {
                if (customerAddressField.Value.ValueType == FieldValueType.String)
                {
                    string customerAddress = customerAddressField.Value.AsString();
                    Console.WriteLine($"Customer Address: '{customerAddress}', with confidence {customerAddressField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("CustomerAddressRecipient", out FormField customerAddressRecipientField))
            {
                if (customerAddressRecipientField.Value.ValueType == FieldValueType.String)
                {
                    string customerAddressRecipient = customerAddressRecipientField.Value.AsString();
                    Console.WriteLine($"Customer address recipient: '{customerAddressRecipient}', with confidence {customerAddressRecipientField.Confidence}");
                }
            }

            if (invoice.Fields.TryGetValue("InvoiceTotal", out FormField invoiceTotalField))
            {
                if (invoiceTotalField.Value.ValueType == FieldValueType.Float)
                {
                    float invoiceTotal = invoiceTotalField.Value.AsFloat();
                    Console.WriteLine($"Invoice Total: '{invoiceTotal}', with confidence {invoiceTotalField.Confidence}");
                }
            }

            return invoice;
        }

        private FormRecognizerClient GetClient()
        {
            if (_client == null)
            {
                string endpoint = _options.Endpoint;
                string apiKey = ConfigurationManager.AppSettings[ApiKey];
                var credential = new AzureKeyCredential(apiKey);

                _client = new FormRecognizerClient(new Uri(endpoint), credential);
            }

            return _client;
        }
    }
}
