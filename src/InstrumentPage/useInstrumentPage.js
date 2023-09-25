import { useCallback, useEffect, useState } from "react";

const useInstrumentPage = ({ page = "" }) => {
  const [apiData, setApiData] = useState({});

  const getApi = useCallback(async () => {
    try {
      const res = await fetch(
        `https://prototype.sbulltech.com/api/v2/quotes/${page}`
      );

      setApiData(await res.json());
    } catch (error) {
      console.log("error :: ", error);
    }
  }, [page]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  const quotesToShow = apiData?.payload?.[page];

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      (quotesToShow || []).every((element) => {
        const valid_till_time = element?.valid_till || null;
        const validity = new Date(`${valid_till_time}Z`);

        if (date > validity) {
          getApi();

          return false;
        } else return true;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [apiData, getApi, quotesToShow]);

  (quotesToShow || []).sort((a, b) => (a.price > b.price ? 1 : -1));

  return {
    apiData,
    quotesToShow,
  };
};

export default useInstrumentPage;
