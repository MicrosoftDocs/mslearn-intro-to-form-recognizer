import className from "classnames";
import PropTypes from "prop-types";
import { useStore } from "../store/global.store";

const DocumentSelector = (props) => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

  if (props.menuStyle == "links") {
    // return the selector as links
    return (
      <div className="linkedDocumentSelector">
        <a
          href="#"
          onClick={() => setActiveTab("Invoices")}
          className={className({
            "linked-menu-item": true,
            "active-linked-menu-item": activeTab === "Invoices",
          })}
        >
          Invoices
        </a>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <a
          href="#"
          onClick={() => setActiveTab("Receipts")}
          className={className({
            "linked-menu-item": true,
            "active-linked-menu-item": activeTab === "Receipts",
          })}
        >
          Receipts
        </a>
      </div>
    );
  } else {
    // return the selector as tabbed navbar
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

DocumentSelector.propTypes = {
  menuStyle: PropTypes.string,
};
// Set default props
DocumentSelector.defaultProps = {
  menuStyle: "tabs",
};

export default DocumentSelector;
