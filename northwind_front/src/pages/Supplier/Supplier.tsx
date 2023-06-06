import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SupplierInfoInterface, SupplierResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import Button from "../../components/Button/Button";

import StyledColumnsFlexWrapper from "../../components/styles/ColumnsFlexWrapper.styled";
import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";

export default function Supplier() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfoInterface | []>(
    []
  );
  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<SupplierResponseAPI>(
        `http://localhost:3000/supplier/${id}`
      );
      setSupplierInfo(result[0]);
      log.forEach((el) => addQuery(el));
      addQueryResult(results);
    };

    if (!ignore.current) {
      ignore.current = true;
      getAndSetData();
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        <div>Supplier information</div>
        <StyledColumnsFlexWrapper columns={2} width="70%">
          {Object.entries(supplierInfo).map((el, i) => {
            const pHeader = fromCmlToStrUpperFirst(el[0]);
            if (el[0].includes("ID")) {
              return;
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
        <div style={{ margin: "10px 0 0 10px" }}>
          <Button to="/suppliers" />
        </div>
      </LeftSpaceFlexWrapper>
    </main>
  );
}
