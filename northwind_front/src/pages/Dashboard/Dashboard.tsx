import React, { useState, useEffect, useRef } from "react";
import useQueriesStore from "../../store/queriesStore";
import axios from "axios";
import { DashResponseInterface } from "../../types/types";
import queryIncludes from "../../helpers/queryIncludes";
import useWindowWidthResize from "../../hooks/windowWidth";

import {
  LeftSpaceFlexWrapper,
  FlexWrapper,
  FlexWrapperShortened,
  FlexWrapperRounded,
} from "../../components/styles/FlexWrappers.styled";
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
          "http://localhost:3000/dash"
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
      <LeftSpaceFlexWrapper direction="column" className="dash-container">
        <FlexWrapper
          direction={windowWidth < 600 ? "column" : "row"}
          margin="0 0 20px 0"
        >
          <FlexWrapperRounded
            direction="column"
            margin={windowWidth < 600 ? "0" : "0 100px 0 0"}
          >
            <h4>Worker</h4>
            <p>Colo: {clientData.colo}</p>
            <p>Country: {clientData.countryCode}</p>
          </FlexWrapperRounded>
          <FlexWrapperRounded direction="column">
            <h4>SQL Metrics</h4>
            <FlexWrapperShortened direction="column" margin="0 0 10px 0">
              <p>Query count: {queries.length}</p>
              <p>Results count: {queryResult}</p>
            </FlexWrapperShortened>

            <FlexWrapperShortened direction="column">
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
              <p>
                # SELECT LEFT JOIN WHERE:{" "}
                {queriesInstance({
                  select: true,
                  where: true,
                  leftJoin: true,
                })}
              </p>
            </FlexWrapperShortened>
          </FlexWrapperRounded>
        </FlexWrapper>
        <FlexWrapperShortened
          width={windowWidth < 600 ? "100%" : "80%"}
          direction="column"
        >
          <h4>Activity log</h4>
          <p className="desc">Explore the app and see metrics here</p>
          {queries.map((el, i) => {
            const { duration, query, ts } = el;
            const amountOfSpaces = "\xa0".repeat(10);
            const metaData = `${ts.toString()}${amountOfSpaces}${duration}ms`;
            return (
              <FlexWrapperShortened
                key={i}
                margin="0 0 10px 0"
                direction="column"
              >
                <p>{metaData}</p>
                <p>{query}</p>
              </FlexWrapperShortened>
            );
          })}
        </FlexWrapperShortened>
      </LeftSpaceFlexWrapper>
    </main>
  );
}
