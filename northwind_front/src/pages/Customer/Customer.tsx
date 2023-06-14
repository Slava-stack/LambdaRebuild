import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CustomerInfoInterface, CustomerResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import useWindowWidthResize from "../../hooks/windowWidth";

import IndividualFooter from "../../components/IndividualFooter/IndividualFooter";
import InfoCartWrapper from "../../components/styles/InfoCartWrapper.styled";
import IndividualHeader from "../../components/IndividualHeader/IndividualHeader";
import IndividualContainer from "../../components/styles/IndividualContainer.styled";

export default function Customers() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoInterface>();
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
      <InfoCartWrapper>
        <IndividualHeader info="Customer information" />
        <IndividualContainer>
          <div>
            <div className="field">
              <p>Company Name</p>
              <p>{customerInfo?.CompanyName}</p>
            </div>
            <div className="field">
              <p>Contact Name</p>
              <p>{customerInfo?.ContactName}</p>
            </div>
            <div className="field">
              <p>Contact Title</p>
              <p>{customerInfo?.ContactTitle}</p>
            </div>
            {customerInfo?.Address && (
              <div className="field">
                <p>Address</p>
                <p>{customerInfo?.Address}</p>
              </div>
            )}
            {customerInfo?.City && (
              <div className="field">
                <p>City</p>
                <p>{customerInfo?.City}</p>
              </div>
            )}
          </div>
          <div>
            {customerInfo?.PostalCode && (
              <div className="field">
                <p>Postal Code</p>
                <p>{customerInfo?.PostalCode}</p>
              </div>
            )}
            {customerInfo?.Region && (
              <div className="field">
                <p>Region</p>
                <p>{customerInfo?.Region}</p>
              </div>
            )}
            {customerInfo?.Country && (
              <div className="field">
                <p>Country</p>
                <p>{customerInfo?.Country}</p>
              </div>
            )}
            {customerInfo?.Phone && (
              <div className="field">
                <p>Phone</p>
                <p>{customerInfo?.Phone}</p>
              </div>
            )}
            {customerInfo?.Fax && (
              <div className="field">
                <p>Fax</p>
                <p>{customerInfo?.Fax}</p>
              </div>
            )}
          </div>
        </IndividualContainer>
        <IndividualFooter to="/customers" />
      </InfoCartWrapper>
    </main>
  );
}
