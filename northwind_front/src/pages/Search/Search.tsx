import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  FormEvent,
} from "react";
import axios from "axios";
import useQueriesStore from "../../store/queriesStore";
import {
  CustomersRow,
  ProductsRow,
  SearchResponseAPI,
  SubmitHandlerInterface,
  WordAndTableInterface,
} from "../../types/types";
import { useSearchParams } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";

import {
  FlexWrapperShortened,
  LeftSpaceFlexWrapper,
} from "../../components/styles/FlexWrappers.styled";
import searchSVG from "../../assets/search.svg";
import "./Search.scss";

export default function Search() {
  const AMOUNT_OF_VALUES_PER_PAGE = 900;
  const [searchParams, setSearchParams] = useSearchParams();
  const { addQuery, addQueryResult } = useQueriesStore();
  const [searchValues, setSearchValues] = useState<
    ProductsRow[] | CustomersRow[]
  >([]);
  const [formValues, setFormValues] = useState({
    input: searchParams.get("q") || "",
    table: searchParams.get("table") || "Products",
  });

  const ignore = useRef(false);

  const searchAndSetParams = async (params: WordAndTableInterface) => {
    const { tableType, searchWord } = params;
    const {
      data: { result, log, results },
    } = await axios.get<SearchResponseAPI>(
      `https://northwind-api-9rxg.onrender.com/search/${tableType}/${searchWord}`
    );
    setSearchValues(result);
    addQueryResult(results);
    log.forEach((el) => addQuery(el));
  };

  const handlerSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as typeof event.target & SubmitHandlerInterface;
    const searchInput: string = form.search.value;
    const tableType: string = form.table.value;

    setSearchParams({ q: searchInput, table: tableType });
    searchAndSetParams({ tableType, searchWord: searchInput });
  };

  const inputHandler = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setFormValues((formValues) => ({ ...formValues, input }));
  };

  const tableHandler = (event: FormEvent<HTMLInputElement>) => {
    const table = event.currentTarget.value;
    setFormValues((formValues) => ({ ...formValues, table }));
  };

  useEffect(() => {
    const getSearch = (params: WordAndTableInterface) => {
      const { tableType, searchWord } = params;
      searchAndSetParams({ tableType, searchWord });
    };

    if (!ignore.current) {
      ignore.current = true;
      const { input: searchWord, table: tableType } = formValues;
      if (searchWord && tableType) {
        getSearch({ tableType, searchWord });
      }
    }
  }, []);

  return (
    <main>
      <LeftSpaceFlexWrapper direction="column">
        <FlexWrapperShortened width="fit-content">
          <form onSubmit={handlerSubmit}>
            <p className="p-header">Search Database</p>
            <div className="input-block">
              <input
                type="text"
                placeholder="Enter keyword..."
                name="search"
                value={formValues.input}
                onChange={inputHandler}
              />
              <img src={searchSVG} alt="lens" />
            </div>
            <div className="table-block">
              <p>Tables</p>
              <div>
                <input
                  type="radio"
                  id="products"
                  name="table"
                  value="Products"
                  checked={formValues.table === "Products"}
                  onChange={tableHandler}
                />
                <label htmlFor="products">Products</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="customers"
                  name="table"
                  value="Customers"
                  checked={formValues.table === "Customers"}
                  onChange={tableHandler}
                />
                <label htmlFor="customers">Customers</label>
              </div>
            </div>
          </form>
        </FlexWrapperShortened>
        <div>
          <p>Search result</p>
          {searchValues.length > 0 ? (
            <PaginatedTable
              itemsPerPage={AMOUNT_OF_VALUES_PER_PAGE}
              items={searchValues}
              whereTo={formValues.table.slice(0, formValues.table.length - 1)}
            />
          ) : (
            <p>No found data</p>
          )}
        </div>
      </LeftSpaceFlexWrapper>
    </main>
  );
}
