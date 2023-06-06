import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { OrdersReponseAPI, OrdersRow } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Orders() {
  const AMOUNT_OF_VALUES_PER_PAGE = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery } = useQueriesStore();
  const [responseDataRows, setResponseDataRows] = useState<OrdersRow[]>([]);

  const page = useRef(searchParams.get("p") || "");
  const ignore = useRef(false);

  const setPageParams = (page: string) => {
    setSearchParams({ p: page });
  };

  useEffect(() => {
    const getOrdersData = async () => {
      try {
        const {
          data: { result, log },
        } = await axios.get<OrdersReponseAPI>("http://localhost:3000/orders");
        setResponseDataRows(result);
        log.forEach((el) => addQuery(el));
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getOrdersData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {responseDataRows.length > 0 && (
          <PaginatedTable
            itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
            items={responseDataRows}
            whereTo="order"
            setPageParams={setPageParams}
            initialPage={page.current}
          />
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
