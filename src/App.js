import "./App.css";
import React from "react";
import useApp from "./useApp";
import InstrumentPage from "./InstrumentPage";

const App = () => {
    const {
      searchResult = [],
      inputSearch = "",
      setInputSearch = () => {},
      response = [],
      page = "",
      setPage = () => {},
    } = useApp();

  if (page) {
    return <InstrumentPage page={page} setPage={setPage} />;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">INSTRUMENTS</div>

        <div className="inputContainer">
          <input
            type="text"
            value={inputSearch}
            style={{ width: "370px", height: "24px" }}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search Symbol/Name"
          />
        </div>
      </div>

      <div className="tableContainer">
        <div className="rowHeader">
          <div className="symbolHeader">Symbol</div>
          <div className="name">Name</div>
          <div className="sector">Sector</div>
        </div>

        {(searchResult.length > 0 ? searchResult : response || []).map((val) => {
          const { symbol, name, sector } = val.item || val;
          return (
            <div key={symbol} className="row">
              <div className="symbol" onClick={() => setPage(symbol)}>
                {symbol || "-"}
              </div>
              <div className="name">{name || "-"}</div>
              <div className="sector">{sector || "-"}</div>
            </div>
          );
        })}
        {searchResult.length === 0 && inputSearch.length > 0 && <div>Empty State</div>}
      </div>
    </div>
  );
};

export default App;