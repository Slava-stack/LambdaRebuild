import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useQueriesStore from "../../store/queriesStore";
import { SuppliersReponseAPI, SuppliersRow } from "../../types/types";
import PatinatedTable from "../../components/PaginatedTable/PaginatedTable";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Suppliers() {
  const AMOUNT_OF_VALUES_PER_PAGE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery } = useQueriesStore();
  const [responseDataRows, setResponseDataRows] = useState<SuppliersRow[]>([]);

  const page = useRef(searchParams.get("p") || "");
  const ignore = useRef(false);

  const setPageParams = (page: string) => {
    setSearchParams({ p: page });
  };

  useEffect(() => {
    const getSuppliersData = async () => {
      try {
        const {
          data: { log, result },
        } = await axios.get<SuppliersReponseAPI>(
          "https://northwind-api-9rxg.onrender.com/suppliers"
        );
        setResponseDataRows(result);
        log.forEach((el) => addQuery(el));
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getSuppliersData();
    }

    return () => {};
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {responseDataRows.length > 0 && (
          <PatinatedTable
            itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
            items={responseDataRows}
            whereTo="supplier"
            setPageParams={setPageParams}
            initialPage={page.current}
          />
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
