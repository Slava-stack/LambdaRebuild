import { Logging } from "../types/types";

const queryIncludes = (arrQueries: Logging[]) => {
  const numOfQueries = (queryIncludes: {
    select: boolean;
    where: boolean;
    leftJoin: boolean;
  }) => {
    const { select, where, leftJoin } = queryIncludes;

    const selectArr = arrQueries.filter(({ query }) => {
      const includeSelect = select
        ? query.includes("SELECT")
        : !query.includes("SELECT");

      const includeWhere = where
        ? query.includes("WHERE")
        : !query.includes("WHERE");

      const includeLeftJoin = leftJoin
        ? query.includes("LEFT JOIN")
        : !query.includes("LEFT JOIN");

      return includeSelect && includeWhere && includeLeftJoin;
    });

    return selectArr.length;
  };

  return numOfQueries;
};

export default queryIncludes;
