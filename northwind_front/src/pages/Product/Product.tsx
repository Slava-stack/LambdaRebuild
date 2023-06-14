import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ProductInfoInterface, ProductReponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import IndividualHeader from "../../components/IndividualHeader/IndividualHeader";
import IndividualFooter from "../../components/IndividualFooter/IndividualFooter";
import InfoCartWrapper from "../../components/styles/InfoCartWrapper.styled";
import IndividualContainer from "../../components/styles/IndividualContainer.styled";

export default function Product() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [productInfo, setProductInfo] = useState<ProductInfoInterface>();
  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<ProductReponseAPI>(
        `https://northwind-api-9rxg.onrender.com/product/${id}`
      );
      setProductInfo(result[0]);
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
        <IndividualHeader info="Product information" />
        <IndividualContainer>
          <div>
            <div className="field">
              <p>Product Name</p>
              <p>{productInfo?.ProductName}</p>
            </div>
            <div className="field">
              <p>Supplier</p>
              <Link to={`/supplier/${productInfo?.SupplierID}`}>
                {productInfo?.CompanyName}
              </Link>
            </div>
            <div className="field">
              <p>Quantity Per Unit</p>
              <p>{productInfo?.QuantityPerUnit}</p>
            </div>
            <div className="field">
              <p>Unit Price</p>
              <p>${productInfo?.UnitPrice.replace(".00", "")}</p>
            </div>
          </div>
          <div>
            <div className="field">
              <p>Units In Stock</p>
              <p>{productInfo?.UnitsInStock}</p>
            </div>
            <div className="field">
              <p>Units In Order</p>
              <p>{productInfo?.UnitsOnOrder}</p>
            </div>
            <div className="field">
              <p>Reorder Level</p>
              <p>{productInfo?.ReorderLevel}</p>
            </div>
            <div className="field">
              <p>Discontinued</p>
              <p>{productInfo?.Discontinued?.data}</p>
            </div>
          </div>
        </IndividualContainer>
        <IndividualFooter to="/products" />
      </InfoCartWrapper>
    </main>
  );
}
