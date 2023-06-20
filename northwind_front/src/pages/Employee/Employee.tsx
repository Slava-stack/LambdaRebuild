import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { EmployeeInfoInterface, EmployeeResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import IndividualFooter from "../../components/IndividualFooter/IndividualFooter";
import IndividualHeader from "../../components/IndividualHeader/IndividualHeader";

import "./Employee.scss";
import InfoCartWrapper from "../../components/styles/InfoCartWrapper.styled";
import IndividualContainer from "../../components/styles/IndividualContainer.styled";

export default function Employees() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { addQuery, addQueryResult } = useQueriesStore();
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfoInterface>();

  const urlParams = useParams();
  const { id } = urlParams;

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
      <InfoCartWrapper>
        <IndividualHeader info="Employee information" />
        <IndividualContainer>
          <div>
            <div className="field">
              <p>Name</p>
              <p>{employeeInfo?.EmployeeFullName}</p>
            </div>
            <div className="field">
              <p>Title</p>
              <p>{employeeInfo?.Title}</p>
            </div>
            <div className="field">
              <p>Title Of Courtesy</p>
              <p>{employeeInfo?.TitleOfCourtesy}</p>
            </div>
            <div className="field">
              <p>Birth Date</p>
              <p>{employeeInfo?.BirthDate?.slice(0, 10)}</p>
            </div>
            <div className="field">
              <p>Hire Date</p>
              <p>{employeeInfo?.HireDate?.slice(0, 10)}</p>
            </div>
            <div className="field">
              <p>Address</p>
              <p>{employeeInfo?.Address}</p>
            </div>
            <div className="field">
              <p>City</p>
              <p>{employeeInfo?.City}</p>
            </div>
          </div>
          <div>
            <div className="field">
              <p>Postal Code</p>
              <p>{employeeInfo?.PostalCode}</p>
            </div>
            <div className="field">
              <p>Country</p>
              <p>{employeeInfo?.Country}</p>
            </div>
            <div className="field">
              <p>Home Phone</p>
              <p>{employeeInfo?.HomePhone}</p>
            </div>
            <div className="field">
              <p>Extension</p>
              <p>{employeeInfo?.Extension}</p>
            </div>
            <div className="field">
              <p>Notes</p>
              <p>{employeeInfo?.Notes}</p>
            </div>
            {employeeInfo?.ReportsTo && (
              <div className="field">
                <p>Reports To</p>
                <Link
                  to={`/employee/${employeeInfo?.ReportsTo}`}
                  onClick={(e) => {
                    e.preventDefault();
                    ignore.current = false;
                    navigate(`/employee/${employeeInfo?.ReportsTo}`, {
                      state: Math.random(),
                    });
                  }}
                >
                  {employeeInfo?.fullName}

                </Link>
              </div>
            )}
          </div>
        </IndividualContainer>
        <IndividualFooter to="/employees" />
      </InfoCartWrapper>
    </main>
  );
}
