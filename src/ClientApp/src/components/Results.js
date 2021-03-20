import { useState } from "react";
import className from "classnames";

const InvoiceResultTable = ({
  fields: {
    InvoiceDate,
    CustomerName,
    CustomerAddress,
    VendorName,
    InvoiceTotal,
  },
}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Confidence</th>
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

const ReceiptsResultTable = ({
  fields: {
    MerchantName,
    MerchantAddress,
    MerchantPhoneNumber,
    TransactionDate,
    TransactionTime,
  },
}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Confidence</th>
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
            <pre className="w-100 bg-light p-4" style={{ maxHeight: "500px" }}>
              <code>{JSON.stringify(imageData, undefined, 2)}</code>
            </pre>
          </div>
        );
      }
      case "information":
      default: {
        return selectedModel === "invoices" ? (
          <InvoiceResultTable fields={imageData.fields} />
        ) : (
          <ReceiptsResultTable fields={imageData.fields} />
        );
      }
    }
  };
  const informationTitle = `${selectedModel
    .charAt(0)
    .toUpperCase()}${selectedModel.slice(1)} information`;
  return (
    <>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("information")}
              className={className({
                "nav-link": true,
                active: activeTab === "information",
              })}
              aria-current="page"
            >
              {informationTitle}
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("json")}
              className={className({
                "nav-link": true,
                active: activeTab === "json",
              })}
            >
              Json
            </button>
          </li>
        </ul>
      </div>
      {renderResults()}
    </>
  );
};
