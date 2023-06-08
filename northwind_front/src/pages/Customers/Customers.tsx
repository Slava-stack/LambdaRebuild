import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import useQueriesStore from "../../store/queriesStore";
import { CustomersReponseAPI, CustomersRow } from "../../types/types";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Customers() {
  const AMOUNT_OF_VALUES_PER_PAGE = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery } = useQueriesStore();
  const [responseDataRows, setResponseDataRows] = useState<CustomersRow[]>([]);

  const page = useRef(searchParams.get("p") || "");
  const ignore = useRef(false);

  const setPageParams = (page: string) => {
    setSearchParams({ p: page });
  };

  useEffect(() => {
    const getCustomersData = async () => {
      try {
        const {
          data: { log, result },
        } = await axios.get<CustomersReponseAPI>(
          "https://northwind-api-9rxg.onrender.com/customers"
        );
        setResponseDataRows(result);
        log.forEach((el) => addQuery(el));
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getCustomersData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {responseDataRows.length > 0 && (
          <PaginatedTable
            itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
            items={responseDataRows}
            whereTo={"customer"}
            setPageParams={setPageParams}
            initialPage={page.current}
          />
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
