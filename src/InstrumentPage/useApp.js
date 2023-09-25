import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Papa from "papaparse";

const useApp = () => {
  const [response, setResponse] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState("");

  const getApi = async () => {
    try {
      await fetch("https://prototype.sbulltech.com/api/v2/instruments")
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          let parsedData = Papa.parse(data);
          parsedData = parsedData.data || [];

          let array = [];
          (parsedData || []).forEach((element, index) => {
            if (element[0] && index !== 0) {
              array = [
                ...array,
                {
                  symbol: element[0],
                  name: element[1],
                  sector: element[2],
                  validTill: element[3],
                },
              ];
            }
          });

          setResponse(array);
        });
    } catch (error) {
      console.log("error :: ", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(response, {
      keys: ["symbol", "name"],
      shouldSort: true,
      includeScore: true,
      threshold: 0.5,
    });

    const results = fuse.search(inputSearch);
    setSearchResult(results);
  }, [inputSearch, response]);

  return {
    searchResult,
    inputSearch,
    setInputSearch,
    response,
    page,
    setPage,
  };
};

export default useApp;
