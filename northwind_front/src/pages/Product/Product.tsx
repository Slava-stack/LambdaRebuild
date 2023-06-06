import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ProductInfoInterface, ProductReponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import Button from "../../components/Button/Button";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";
import StyledColumnsFlexWrapper from "../../components/styles/ColumnsFlexWrapper.styled";

export default function Product() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [productInfo, setProductInfo] = useState<ProductInfoInterface | []>([]);
  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  const supplierIdIndex = Object.keys(productInfo).indexOf("SupplierID");
  const supplierValue = Object.values(productInfo)[supplierIdIndex];

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<ProductReponseAPI>(
        `http://localhost:3000/product/${id}`
      );
      setProductInfo(result[0]);
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
        <p>Product information</p>
        <StyledColumnsFlexWrapper columns={2} width="70%">
          {Object.entries(productInfo).map((el, i) => {
            const pHeader = fromCmlToStrUpperFirst(el[0]);
            if (el[0].includes("ID")) {
              return;
            }
            if (el[0].includes("Price")) {
              return (
                <div key={i}>
                  <p className="p-header">{pHeader}</p>
                  <p>${el[1]}</p>
                </div>
              );
            }
            if (el[0] === "CompanyName") {
              return (
                <div key={i}>
                  <p className="p-header">{pHeader}</p>
                  <Link to={`http://localhost:3001/supplier/${supplierValue}`}>
                    <p>{el[1]}</p>
                  </Link>
                </div>
              );
            }
            if (typeof el[1] === "object") {
              return (
                <div key={i}>
                  <p className="p-header">{pHeader}</p>
                  <p>{el[1].data[0]}</p>
                </div>
              );
            }
            if (el[1]) {
              return (
                <div key={i}>
                  <p className="p-header">{pHeader}</p>
                  <p>{el[1]}</p>
                </div>
              );
            }
          })}
        </StyledColumnsFlexWrapper>
        <Button to="/products" />
      </LeftSpaceFlexWrapper>
    </main>
  );
}
