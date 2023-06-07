import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { OrderInfoInterface, OrderResponseAPI } from "../../types/types";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";
import useQueriesStore from "../../store/queriesStore";
import getDate from "../../helpers/getDate";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import Button from "../../components/Button/Button";
import useWindowWidthResize from "../../hooks/windowWidth";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";
import StyledColumnsFlexWrapper from "../../components/styles/ColumnsFlexWrapper.styled";

export default function Order() {
  const AMOUNT_OF_VALUES_PER_PAGE = 20;
  const { addQuery, addQueryResult } = useQueriesStore();
  const [orderInfo, setOrderInfo] = useState<OrderInfoInterface>(
    {} as OrderInfoInterface
  );
  const windowWidth = useWindowWidthResize();

  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<OrderResponseAPI>(
        `http://localhost:3000/order/${id}`
      );
      setOrderInfo(result);
      addQueryResult(results);
      log.forEach((el) => addQuery(el));
    };

    if (!ignore.current) {
      ignore.current = true;
      getAndSetData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        {Object.keys(orderInfo).length && (
          <>
            <p>Order information</p>
            <StyledColumnsFlexWrapper
              columns={windowWidth < 800 ? 2 : 3}
              width="80%"
            >
              {Object.entries(orderInfo.OrderInformation[0]).map((el, i) => {
                const pHeader = fromCmlToStrUpperFirst(el[0]);
                let value = el[1];

                const isDollarValues =
                  el[0].includes("Discount") ||
                  el[0].includes("Price") ||
                  el[0].includes("Freight");
                if (isDollarValues) {
                  value = "$ " + (+el[1]).toFixed(2);
                }
                if (el[0] === "CustomerID") {
                  return (
                    <div key={i}>
                      <p className="p-header">{pHeader.replace("i d", "id")}</p>
                      <Link to={`/customer/${el[1]}`}>
                        <p>{value}</p>
                      </Link>
                    </div>
                  );
                }
                if (el[0].includes("Date")) {
                  return (
                    <div key={i}>
                      <p className="p-header">{pHeader}</p>
                      <p>{getDate(new Date(value).toString())}</p>
                    </div>
                  );
                }
                if (el[1]) {
                  return (
                    <div key={i}>
                      <p className="p-header">{pHeader}</p>
                      <p>{value}</p>
                    </div>
                  );
                }
              })}
            </StyledColumnsFlexWrapper>
            <div>Products in Order</div>
            {orderInfo?.ProductsInOrder?.length > 0 && (
              <PaginatedTable
                items={orderInfo.ProductsInOrder}
                itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
                whereTo="product"
              />
            )}
            <Button to="/orders" />
          </>
        )}
      </LeftSpaceFlexWrapper>
    </main>
  );
}
