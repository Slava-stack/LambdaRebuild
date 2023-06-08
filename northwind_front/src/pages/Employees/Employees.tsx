import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useQueriesStore from "../../store/queriesStore";
import { EmployeesReponseAPI, EmployeesRow } from "../../types/types";
import PaginatedItems from "../../components/PaginatedTable/PaginatedTable";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Employees() {
  const AMOUNT_OF_VALUES_PER_PAGE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery } = useQueriesStore();
  const [responseDataRows, setResponseDataRows] = useState<EmployeesRow[]>([]);

  const page = useRef(searchParams.get("p") || "");
  const ignore = useRef(false);

  const setPageParams = (page: string) => {
    setSearchParams({ p: page });
  };

  useEffect(() => {
    const getEmployeesData = async () => {
      try {
        const {
          data: { log, result },
        } = await axios.get<EmployeesReponseAPI>(
          "https://northwind-api-9rxg.onrender.com/employees"
        );
        setResponseDataRows(result);
        log.forEach((el) => addQuery(el));
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getEmployeesData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {responseDataRows.length > 0 && (
          <PaginatedItems
            itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
            items={responseDataRows}
            whereTo={"employee"}
            setPageParams={setPageParams}
            initialPage={page.current}
          />
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
