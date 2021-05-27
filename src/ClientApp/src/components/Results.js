import { useState } from "react";
import className from "classnames";
import { capitalize } from "../utility";

const windowWidth = window.innerWidth;
const tableClass = windowWidth >= 567 ? "table" : "collapsed-table";

const InvoiceResultTable = ({
  fields: {
    InvoiceDate,
    CustomerName,
    CustomerAddress,
    VendorName,
    InvoiceTotal,
  },
}) => (
  <table className={tableClass}>
    <thead>
      <tr>
        <th>Field</th>
        <th className="numeric">Value</th>
        <th className="numeric">Confidence</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Invoice Date</td>
        <td>{InvoiceDate?.valueData.text}</td>
        <td>{InvoiceDate?.confidence}</td>
      </tr>
      <tr>
        <td>Customer Name</td>
        <td>{CustomerName?.valueData.text}</td>
        <td>{CustomerName?.confidence}</td>
      </tr>
      <tr>
        <td>Customer Address</td>
        <td>{CustomerAddress?.valueData.text}</td>
        <td>{CustomerAddress?.confidence}</td>
      </tr>
      <tr>
        <td>Vendor Name</td>
        <td>{VendorName?.valueData.text}</td>
        <td>{VendorName?.confidence}</td>
      </tr>
      <tr>
        <td>Invoice Total</td>
        <td>{InvoiceTotal?.valueData.text}</td>
        <td>{InvoiceTotal?.confidence}</td>
      </tr>
    </tbody>
  </table>
);

const ReceiptsResultTable = (
  {
    fields: {
      MerchantName,
      MerchantAddress,
      MerchantPhoneNumber,
      TransactionDate,
      TransactionTime,
    },
  }
) => (
  <table className={tableClass}>
    <thead>
      <tr>
        <th>Field</th>
        <th className="numeric">Value</th>
        <th className="numeric">Confidence</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Merchant Name</td>
        <td>{MerchantName?.valueData.text}</td>
        <td>{MerchantName?.confidence}</td>
      </tr>
      <tr>
        <td>Merchant Address</td>
        <td>{MerchantAddress?.valueData.text}</td>
        <td>{MerchantAddress?.confidence}</td>
      </tr>
      <tr>
        <td>Merchant Phone Number</td>
        <td>{MerchantPhoneNumber?.valueData.text}</td>
        <td>{MerchantPhoneNumber?.confidence}</td>
      </tr>
      <tr>
        <td>Transaction Date</td>
        <td>{TransactionDate?.valueData.text}</td>
        <td>{TransactionDate?.confidence}</td>
      </tr>
      <tr>
        <td>Transaction Time</td>
        <td>{TransactionTime?.valueData.text}</td>
        <td>{TransactionTime?.confidence}</td>
      </tr>
    </tbody>
  </table>
);

export const Results = ({ selectedModel, imageData }) => {
  const [activeTab, setActiveTab] = useState("information");
  if (!imageData?.fields) {
    return null;
  }
  const renderResults = () => {
    switch (activeTab) {
      case "json": {
        return (
          <div>
            <pre className="w-100 bg-light p-4 json-pre">
              <code>{JSON.stringify(imageData, undefined, 2)}</code>
            </pre>
          </div>
        );
      }
      case "information":
      default: {
        return selectedModel === "invoices" ? (
          <InvoiceResultTable
            fields={imageData.fields}
            tableClass={tableClass}
          />
        ) : (
          <ReceiptsResultTable
            fields={imageData.fields}
            tableClass={tableClass}
          />
        );
      }
    }
  };
  const documentName = capitalize(selectedModel).slice(0, -1);
  const informationTitle = `Data found in ${documentName}`;
  return (
    <>
      <div className="d-flex justify-content-between mb-4 row">
        <div className="ml-3">
          <p className="h4 sub-title">{informationTitle}</p>
        </div>
        <div className="linkedSelector ml-3">
          <button
            type="button"
            onClick={() => setActiveTab("information")}
            className={className({
              btn: true,
              "btn-link": true,
              "linked-menu-item": true,
              "active-linked-menu-item": activeTab === "information",
            })}
          >
            {documentName} Information
          </button>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <button
            type="button"
            onClick={() => setActiveTab("json")}
            className={className({
              btn: true,
              "btn-link": true,
              "linked-menu-item": true,
              "active-linked-menu-item": activeTab === "json",
            })}
          >
            JSON
          </button>
        </div>
      </div>
      {renderResults()}
    </>
  );
};
