import React, { useState, useEffect, useRef } from "react";
import useQueriesStore from "../../store/queriesStore";
import axios from "axios";
import { DashResponseInterface } from "../../types/types";
import queryIncludes from "../../helpers/queryIncludes";
import useWindowWidthResize from "../../hooks/windowWidth";

import { FlexWrapper } from "../../components/styles/FlexWrappers.styled";
import "./Dashboard.scss";

export default function Dashboard() {
  const windowWidth = useWindowWidthResize();
  const [clientData, setClientData] = useState({ colo: "", countryCode: "" });
  const { queries, queryResult } = useQueriesStore();

  const queriesInstance = queryIncludes(queries);

  const ignore = useRef(false);

  useEffect(() => {
    const getClientData = async () => {
      try {
        const {
          data: { colo, countryCode },
        }: DashResponseInterface = await axios.get(
          "https://northwind-api-9rxg.onrender.com/dash"
        );
        setClientData({ colo, countryCode });
      } catch (err) {
        console.log(err);
      }
    };

    if (!ignore.current) {
      ignore.current = true;
      getClientData();
    }
  }, []);

  return (
    <main>
      <div className="dash-container">
        <div className="metrics">
          <FlexWrapper
            direction="column"
            margin={windowWidth < 600 ? "0" : "0 100px 0 0"}
          >
            <h4>Worker</h4>
            <p>Colo: {clientData.colo}</p>
            <p>Country: {clientData.countryCode}</p>
          </FlexWrapper>
          <FlexWrapper direction="column">
            <h4>SQL Metrics</h4>
            <FlexWrapper direction="column">
              <p>Query count: {queries.length}</p>
              <p>Results count: {queryResult}</p>
            </FlexWrapper>
            <FlexWrapper direction="column">
              <p>
                # SELECT:{" "}
                {queriesInstance({
                  select: true,
                  where: false,
                  leftJoin: false,
                })}
              </p>
              <p>
                # SELECT WHERE:{" "}
                {queriesInstance({
                  select: true,
                  where: true,
                  leftJoin: false,
                })}
              </p>
              <p>
                # SELECT LEFT JOIN:{" "}
                {queriesInstance({
                  select: true,
                  where: false,
                  leftJoin: true,
                })}
              </p>
            </FlexWrapper>
          </FlexWrapper>
        </div>
        <FlexWrapper direction="column">
          <h4>Activity log</h4>
          <p className="desc">Explore the app and see metrics here</p>
          {queries.map((el, i) => {
            const { duration, query, ts } = el;
            const metaData = `${ts.toString()}, ${duration}ms`;
            return (
              <FlexWrapper key={i} margin="0 0 8px 0" direction="column">
                <p className="meta-data">{metaData}</p>
                <p className="query">{query}</p>
              </FlexWrapper>
            );
          })}
        </FlexWrapper>
      </div>
    </main>
  );
}
