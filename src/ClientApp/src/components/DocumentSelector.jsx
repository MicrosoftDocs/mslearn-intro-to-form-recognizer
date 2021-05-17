import className from "classnames";
import PropTypes from "prop-types";
import { useStore } from "../store/global.store";

const DocumentSelector = (props) => {
  const selectedDocumentType = useStore((state) => state.selectedDocumentType);
  const setSelectedDocumentType = useStore((state) => state.setSelectedDocumentType);

  if (props.menuStyle == "links") {
    // return the selector as links
    return (
      <div className="linkedDocumentSelector">
        <a
          href="#"
          onClick={() => setSelectedDocumentType("Invoices")}
          className={className({
            "linked-menu-item": true,
            "active-linked-menu-item": selectedDocumentType === "Invoices",
          })}
        >
          Invoices
        </a>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <a
          href="#"
          onClick={() => setSelectedDocumentType("Receipts")}
          className={className({
            "linked-menu-item": true,
            "active-linked-menu-item": selectedDocumentType === "Receipts",
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
              onClick={() => setSelectedDocumentType("Invoices")}
              className={className({
                "nav-link": true,
                active: selectedDocumentType === "Invoices",
              })}
              aria-current="page"
            >
              Invoices
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setSelectedDocumentType("Receipts")}
              className={className({
                "nav-link": true,
                active: selectedDocumentType === "Receipts",
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
