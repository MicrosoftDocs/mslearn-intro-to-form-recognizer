using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azure.AI.FormRecognizer.Models;
using CognitiveServicesDemo.FormRecognizer.Models;
using CognitiveServicesDemo.FormRecognizer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CognitiveServicesDemo.FormRecognizer.Controllers
{
    [ApiController]
    [Route("form-recognizer")]
    public class FormRecognizerController : ControllerBase
    {
        private readonly ILogger<FormRecognizerController> _logger;
        private readonly InvoiceRecognizerService _invoiceRecognizerService;
        private readonly ReceiptRecognizerService _receiptRecognizerService;

        public FormRecognizerController(ILogger<FormRecognizerController> logger, InvoiceRecognizerService invoiceRecognizerService, ReceiptRecognizerService receiptRecognizerService)
        {
            _logger = logger;
            _invoiceRecognizerService = invoiceRecognizerService;
            _receiptRecognizerService = receiptRecognizerService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormFile file, [FromForm] string model)
        {
            if (file.Length == 0)
            {
                return BadRequest("You must provide a file");
            }

            var modelType = model.ConvertToModelType();
            if (modelType == null)
            {
                return BadRequest("You must provide a valid model property on the request.");
            }

            var filePath = Path.GetTempFileName();

            try
            {

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                using var stream = new FileStream(filePath, FileMode.Open);

                RecognizedForm result;
                if (modelType == ModelType.Invoices)
                {
                    result = await _invoiceRecognizerService.Analyze(stream);
                }
                else
                {
                    result = await _receiptRecognizerService.Analyze(stream);
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError("Error analyzing file", e);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
            finally
            {
                // Try Delete
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> Post([FromBody] AnalyseImageRequest request)
        {
            if (request.Uri == default(Uri))
            {
                return BadRequest("You must provide a valid uri property on the request.");
            }

            var modelType = request.Model.ConvertToModelType();
            if (modelType == null)
            {
                return BadRequest("You must provide a valid model property on the request.");
            }

            try
            {
                RecognizedForm result;
                if (modelType == ModelType.Invoices)
                {
                    result = await _invoiceRecognizerService.Analyze(request.Uri);
                }
                else
                {
                    result = await _receiptRecognizerService.Analyze(request.Uri);
                }

                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError("Error analyzing file", e);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
