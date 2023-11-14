import React from "react";
import placeholder_image from "../Images/card_placeholder_image.jpg";

export default function CardPlaceholder() {
  return (
    <>
      <div className="card mb-3">
        <div className=" row" aria-hidden="true">
          <div className="col-md-5">
            <img
              alt="NAN"
              src={placeholder_image}
              className="card-img-top"
              style={{ width: "45%", display: "inline" }}
            />
          </div>
          <div className="col-md-7">
            <div
              className="card-body"
              style={{ width: "45%", display: "inline" }}
            >
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-3"
              >
                _
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
