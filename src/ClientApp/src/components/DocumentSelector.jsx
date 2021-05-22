import className from "classnames";
import PropTypes from "prop-types";
import { useStore } from "../store/global.store";
import { useHistory } from "react-router-dom";

const DocumentSelector = (props) => {
  const history = useHistory();
  const selectedDocumentType = useStore((state) => state.selectedDocumentType);
  const setSelectedDocumentType = useStore(
    (state) => state.setSelectedDocumentType
  );

  /**
   * Sets the selected document type in globals state
   * goes fo File Selector component so user may choose a document
   * @param {*} documentType 
   */
  const onChangeDocumentType = (documentType) => {
    setSelectedDocumentType(documentType);
    history.push("/fileselector");
  };

  if (props.menuStyle === "links") {
    // return the selector as links
    return (
      <div className="linkedSelector">
        <button
          type="button"
          onClick={() => onChangeDocumentType("Invoices")}
          className={className({
            "btn": true,
            "btn-link": true,
            "linked-menu-item": true,
            "active-linked-menu-item": selectedDocumentType === "Invoices",
          })}
        >
          Invoices
        </button>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <button
          type="button"
          onClick={() => onChangeDocumentType("Receipts")}
          className={className({
            btn: true,
            "btn-link": true,
            "linked-menu-item": true,
            "active-linked-menu-item": selectedDocumentType === "Receipts",
          })}
        >
          Receipts
        </button>
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
