import React, { useEffect, useState, FormEvent } from "react";
import ReactPaginate from "react-paginate";
import Table from "../Table/Table";
import useQueriesStore from "../../store/queriesStore";
import { PaginatedTableInterface } from "../../types/types";

import { PagesFlexWrapper } from "../styles/FlexWrappers.styled";
import "./PaginatedTable.scss";

export default function PaginatedTable({
  itemsPerPage,
  items,
  whereTo,
  setPageParams,
  initialPage,
}: PaginatedTableInterface) {
  const paramsOffset = initialPage && itemsPerPage * +initialPage;
  const [itemOffset, setItemOffset] = useState(paramsOffset || 0);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const { addQuery, queries, addQueryResult } = useQueriesStore();

  const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const visibleItems = items.slice(itemOffset, endOffset);

    setCurrentItems(visibleItems);
    addQueryResult(visibleItems.length);
  }, [itemOffset, items]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const sliceStart = selected * itemsPerPage;
    const newOffset = sliceStart % items.length;

    setItemOffset(newOffset);
    addQuery(queries[0]);

    if (setPageParams) {
      setPageParams(selected.toString());
    }
  };

  return (
    <>
      <Table tableData={currentItems} whereTo={whereTo || ""} />
      {items.length > itemsPerPage && (
        <PagesFlexWrapper justify="space-around">
          <ReactPaginate
            breakLabel="..."
            nextLabel="►"
            previousLabel="◄"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="page-btns-container"
            pageLinkClassName="page-btn"
            activeClassName="current-btn"
            nextClassName="page-btn-next"
            previousClassName="page-btn-prev"
            forcePage={(initialPage && +initialPage) || 0}
          />
          <p>
            Page {itemOffset / itemsPerPage + 1} of {pageCount}
          </p>
        </PagesFlexWrapper>
      )}
    </>
  );
}
