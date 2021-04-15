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
    public class ReceiptRecognizerService
    {
        private static readonly RecognizeReceiptsOptions OperationOptions = new RecognizeReceiptsOptions() { Locale = "en-US" };
        private FormRecognizerOptions _options;
        private FormRecognizerClient _client;

        public ReceiptRecognizerService(FormRecognizerOptions options)
        {
            _options = options;
        }


        public async Task<RecognizedForm> Analyze(Uri receiptUri)
        {
            RecognizeReceiptsOperation operation = await GetClient().StartRecognizeReceiptsFromUriAsync(receiptUri, OperationOptions);
            Response<RecognizedFormCollection> operationResponse = await operation.WaitForCompletionAsync();
            RecognizedFormCollection Receipts = operationResponse.Value;

            return ProcessResults(Receipts);
        }

        public async Task<RecognizedForm> Analyze(Stream fileStream)
        {
            RecognizeReceiptsOperation operation = await GetClient().StartRecognizeReceiptsAsync(fileStream, OperationOptions);
            Response<RecognizedFormCollection> operationResponse = await operation.WaitForCompletionAsync();
            RecognizedFormCollection Receipts = operationResponse.Value;

            return ProcessResults(Receipts);
        }

        private RecognizedForm ProcessResults(RecognizedFormCollection Receipts)
        {
            // To see the list of the supported fields returned by service and its corresponding types, consult:
            // https://aka.ms/formrecognizer/receiptfields
            RecognizedForm receipt = Receipts.Single();

            if (receipt.Fields.TryGetValue("MerchantName", out FormField merchantNameField))
            {
                if (merchantNameField.Value.ValueType == FieldValueType.String)
                {
                    string merchantName = merchantNameField.Value.AsString();

                    Console.WriteLine($"Merchant Name: '{merchantName}', with confidence {merchantNameField.Confidence}");
                }
            }

            if (receipt.Fields.TryGetValue("TransactionDate", out FormField transactionDateField))
            {
                if (transactionDateField.Value.ValueType == FieldValueType.Date)
                {
                    DateTime transactionDate = transactionDateField.Value.AsDate();

                    Console.WriteLine($"Transaction Date: '{transactionDate}', with confidence {transactionDateField.Confidence}");
                }
            }

            if (receipt.Fields.TryGetValue("Items", out FormField itemsField))
            {
                if (itemsField.Value.ValueType == FieldValueType.List)
                {
                    foreach (FormField itemField in itemsField.Value.AsList())
                    {
                        Console.WriteLine("Item:");

                        if (itemField.Value.ValueType == FieldValueType.Dictionary)
                        {
                            IReadOnlyDictionary<string, FormField> itemFields = itemField.Value.AsDictionary();

                            if (itemFields.TryGetValue("Name", out FormField itemNameField))
                            {
                                if (itemNameField.Value.ValueType == FieldValueType.String)
                                {
                                    string itemName = itemNameField.Value.AsString();

                                    Console.WriteLine($"  Name: '{itemName}', with confidence {itemNameField.Confidence}");
                                }
                            }

                            if (itemFields.TryGetValue("TotalPrice", out FormField itemTotalPriceField))
                            {
                                if (itemTotalPriceField.Value.ValueType == FieldValueType.Float)
                                {
                                    float itemTotalPrice = itemTotalPriceField.Value.AsFloat();

                                    Console.WriteLine($"  Total Price: '{itemTotalPrice}', with confidence {itemTotalPriceField.Confidence}");
                                }
                            }
                        }
                    }
                }
            }

            if (receipt.Fields.TryGetValue("Total", out FormField totalField))
            {
                if (totalField.Value.ValueType == FieldValueType.Float)
                {
                    float total = totalField.Value.AsFloat();

                    Console.WriteLine($"Total: '{total}', with confidence '{totalField.Confidence}'");
                }
            }

            return receipt;
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
