import className from "classnames";
import { useStore } from "../store/global.store";

const DocumentSelector = (props) => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

  if (props.menuStyle == "links") {
    // return the selector as links
    return (<p>Linked selector here</p>)

  } else {
    // return the selector as navbar
    return (
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
    );
  }

};

// Set default props
DocumentSelector.defaultProps = {
  menuStyle: "nav",
};

export default DocumentSelector;
