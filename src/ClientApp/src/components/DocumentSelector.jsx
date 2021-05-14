import className from "classnames";
import { useState } from "react";
import { useStore } from "../store/global.store";

const DocumentSelector = () => {
  const [activeTab, setActiveTab] = useState("Invoices");
  const informationTitle = "Invoices";
  return (
    <div className="mt-4">
      <div className="documentSelector">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("Invoices")}
              className={className({
                "nav-link": true,
                active: activeTab === "Invoices",
              })}
              aria-current="page"
            >
              {informationTitle}
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("Receipts")}
              className={className({
                "nav-link": true,
                active: activeTab === "Receipts",
              })}
            >
              Receipts
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentSelector;
