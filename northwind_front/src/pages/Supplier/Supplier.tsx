import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SupplierInfoInterface, SupplierResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import IndividualHeader from "../../components/IndividualHeader/IndividualHeader";
import IndividualFooter from "../../components/IndividualFooter/IndividualFooter";

import IndividualContainer from "../../components/styles/IndividualContainer.styled";
import InfoCartWrapper from "../../components/styles/InfoCartWrapper.styled";

export default function Supplier() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfoInterface>();
  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<SupplierResponseAPI>(
        `https://northwind-api-9rxg.onrender.com/supplier/${id}`
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
      <InfoCartWrapper>
        <IndividualHeader info="Supplier information" />
        <IndividualContainer>
          <div>
            <div className="field">
              <p>Company Name</p>
              <p>{supplierInfo?.CompanyName}</p>
            </div>
            <div className="field">
              <p>Contact Name</p>
              <p>{supplierInfo?.ContactName}</p>
            </div>
            <div className="field">
              <p>Contact Title</p>
              <p>{supplierInfo?.ContactTitle}</p>
            </div>
            <div className="field">
              <p>Address</p>
              <p>{supplierInfo?.Address}</p>
            </div>
            <div className="field">
              <p>City</p>
              <p>{supplierInfo?.City}</p>
            </div>
          </div>
          <div>
            {supplierInfo?.Region && (
              <div className="field">
                <p>Region</p>
                <p>{supplierInfo?.Region}</p>
              </div>
            )}
            <div className="field">
              <p>Postal Code</p>
              <p>{supplierInfo?.PostalCode}</p>
            </div>
            <div className="field">
              <p>Country</p>
              <p>{supplierInfo?.Country}</p>
            </div>
            <div className="field">
              <p>Phone</p>
              <p>{supplierInfo?.Phone}</p>
            </div>
            {supplierInfo?.Fax && (
              <div className="field">
                <p>Fax</p>
                <p>{supplierInfo?.Fax}</p>
              </div>
            )}
            {supplierInfo?.HomePage && (
              <div className="field">
                <p>Home Page</p>
                <p>{supplierInfo?.HomePage}</p>
              </div>
            )}
          </div>
        </IndividualContainer>
        <IndividualFooter to="/suppliers" />
      </InfoCartWrapper>
    </main>
  );
}
