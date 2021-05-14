const LandingPage = () => {
  return (
    // <div className="container"></div>
    <div className="row m-0">
      <div
        className="col-sm main-bg-div"
        style={{
          "background-image": "url('/dude-with-notebook.png')",
          "background-repeat": "no-repeat",
          "background-size": "cover",
        }}
      ></div>
      <div className="col-sm ml-5">
        <div className="container">
          {/* logo */}
          <div className="mt-5 pb-5">
            <img
              style={{ height: "30px" }}
              className="img-fluid"
              alt="Microsoft"
              src="/site-logo.png"
            />
          </div>

          {/* welcome */}
          <div className="mt-5">
            <p className="h4">
              <strong>Welcome to Form Recognizer</strong>
              <br />
              To get started, select a form type below:
            </p>
          </div>

          {/* conversion */}
          <div className="mt-4">
            <p className="small">I want to convert:</p>
          </div>

          {/* menu */}
          <div className="mt-4">
            <nav class="nav nav-pills nav-justified">
              <a class="nav-item nav-link" href="#">
                Invoices
              </a>
              <a class="nav-item nav-link active" href="#">
                Receipts
              </a>
            </nav>
          </div>

          {/* separator */}
          <div className="mt-5">
            <hr size="2" />
          </div>

          {/* submit */}
          <div className="mt-5">
            <div className="row justify-content-end">
              <div className="mr-3">
                <button type="button" className="btn btn-primary">
                  &nbsp; Next Step &nbsp; &gt; &nbsp;
                </button>
              </div>
            </div>
          </div>

          {/* space at the bottom for mobile */}
          <div className="mt-5">
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
