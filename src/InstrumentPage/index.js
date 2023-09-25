import React from "react";
import "./styles.css";
import useInstrumentPage from "./useInstrumentPage";

const InstrumentPage = ({ page = "", setPage = () => {} }) => {
  const { quotesToShow } = useInstrumentPage({ page });

  return (
    <div className="container">
      <div className="header">
        <div className="title">Quotes for {page}</div>

        <div className="inputContainer" onClick={() => setPage("")}>
          Back to Instruments Page
        </div>
      </div>

      {(quotesToShow || []).map((element) => {
        return (
          <div className="quote">{Math.round(element?.price * 100) / 100}</div>
        );
      })}
    </div>
  );
};

export default InstrumentPage;
