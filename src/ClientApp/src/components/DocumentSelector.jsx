import className from "classnames";
import { useStore } from "../store/global.store";

const DocumentSelector = () => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

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
              Invoices
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
