import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useQueriesStore from "../../store/queriesStore";
import { ProductsReponseAPI, ProductsRow } from "../../types/types";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Products() {
  const AMOUNT_OF_VALUES_PER_PAGE = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery } = useQueriesStore();
  const [responseDataRows, setResponseDataRows] = useState<ProductsRow[]>([]);

  const page = useRef(searchParams.get("p") || "");
  const ignore = useRef(false);

  const setPageParams = (page: string) => {
    setSearchParams({ p: page });
  };

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const {
          data: { log, result },
        } = await axios.get<ProductsReponseAPI>(
          "http://localhost:3000/products"
        );
        setResponseDataRows(result);
        log.forEach((el) => addQuery(el));
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getProductsData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {responseDataRows.length > 0 && (
          <PaginatedTable
            itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
            items={responseDataRows}
            whereTo="product"
            setPageParams={setPageParams}
            initialPage={page.current}
          />
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
