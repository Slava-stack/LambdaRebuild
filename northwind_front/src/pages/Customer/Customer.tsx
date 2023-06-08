import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CustomerInfoInterface, CustomerResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import Button from "../../components/Button/Button";
import useWindowWidthResize from "../../hooks/windowWidth";

import StyledColumnsFlexWrapper from "../../components/styles/ColumnsFlexWrapper.styled";
import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Customers() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoInterface | []>(
    []
  );
  const windowWidth = useWindowWidthResize();
  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<CustomerResponseAPI>(
        `https://northwind-api-9rxg.onrender.com/customer/${id}`
      );
      setCustomerInfo(result[0]);
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
        <p>Customer information</p>
        <StyledColumnsFlexWrapper
          width="80%"
          columns={windowWidth < 800 ? 2 : 3}
        >
          {Object.entries(customerInfo).map((el, i) => {
            if (el[0].includes("ID")) {
              return;
            }
            if (el[1]) {
              return (
                <div key={i}>
                  <p className="p-header">{fromCmlToStrUpperFirst(el[0])}</p>
                  <p>{el[1]}</p>
                </div>
              );
            }
          })}
        </StyledColumnsFlexWrapper>
        <Button to="/customers" />
      </LeftSpaceFlexWrapper>
    </main>
  );
}
