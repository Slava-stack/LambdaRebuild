import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { EmployeeInfoInterface, EmployeeResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import getDate from "../../helpers/getDate";
import Button from "../../components/Button/Button";
import useWindowWidthResize from "../../hooks/windowWidth";

import { LeftSpaceFlexWrapper } from "../../components/styles/FlexWrappers.styled";
import StyledColumnsFlexWrapper from "../../components/styles/ColumnsFlexWrapper.styled";

export default function Employees() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const windowWidth = useWindowWidthResize();
  const { addQuery, addQueryResult } = useQueriesStore();
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfoInterface | []>(
    []
  );

  const urlParams = useParams();
  const { id } = urlParams;

  const reportsToNameIndex = Object.keys(employeeInfo).indexOf("fullName");
  const reportsToValue = Object.values(employeeInfo)[reportsToNameIndex];

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<EmployeeResponseAPI>(
        `https://northwind-api-9rxg.onrender.com/Employee/${id}`
      );
      setEmployeeInfo(result[0]);
      addQueryResult(results);
      log.forEach((el) => addQuery(el));
    };

    if (!ignore.current) {
      ignore.current = true;
      getAndSetData();
    }
  }, [state]);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        <div>Employee information</div>
        <StyledColumnsFlexWrapper
          columns={windowWidth < 800 ? 1 : 3}
          width="90%"
        >
          {Object.entries(employeeInfo).map((el, i) => {
            const pHeader = fromCmlToStrUpperFirst(el[0]);
            const isNotNeededFields =
              el[0].includes("ID") || el[0].includes("fullName");
            if (isNotNeededFields) {
              return;
            }
            if (el[0].includes("Date")) {
              return (
                <div key={i}>
                  <p className="p-header">{pHeader}</p>
                  <p>{getDate(new Date(el[1]).toString())}</p>
                </div>
              );
            }

            if (el[0].includes("ReportsTo")) {
              if (reportsToValue) {
                return (
                  <div key={i}>
                    <p>{pHeader}</p>
                    <Link
                      to={`/employee/${el[1]}`}
                      onClick={(e) => {
                        e.preventDefault();
                        ignore.current = false;
                        navigate(`/employee/${el[1]}`, {
                          state: Math.random(),
                        });
                      }}
                    >
                      <p>{reportsToValue}</p>
                    </Link>
                  </div>
                );
              }
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
        <Button to="/employees" />
      </LeftSpaceFlexWrapper>
    </main>
  );
}
