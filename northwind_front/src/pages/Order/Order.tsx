import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { OrderInfoInterface, OrderResponseAPI } from "../../types/types";
import useQueriesStore from "../../store/queriesStore";
import InfoCartWrapper from "../../components/styles/InfoCartWrapper.styled";
import IndividualHeader from "../../components/IndividualHeader/IndividualHeader";
import IndividualContainer from "../../components/styles/IndividualContainer.styled";
import IndividualFooter from "../../components/IndividualFooter/IndividualFooter";
import OrderTable from "../../components/OrderTable/OrderTable";

export default function Order() {
  const { addQuery, addQueryResult } = useQueriesStore();
  const [orderInfo, setOrderInfo] = useState<OrderInfoInterface>();

  const urlParams = useParams();
  const { id } = urlParams;

  const ignore = useRef(false);

  const orderInformation = orderInfo?.OrderInformation[0];
  const productsInOrder = orderInfo?.ProductsInOrder;

  useEffect(() => {
    const getAndSetData = async () => {
      const {
        data: { result, results, log },
      } = await axios.get<OrderResponseAPI>(
        `https://northwind-api-9rxg.onrender.com/order/${id}`
      );
      setOrderInfo(result);
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
        <IndividualHeader info="Order information" />
        <IndividualContainer>
          <div>
            <div className="field">
              <p>Customer Id</p>
              <Link to={`/customer/${orderInformation?.CustomerID}`}>
                {orderInformation?.CustomerID}
              </Link>
            </div>
            <div className="field">
              <p>Ship Name</p>
              <p>{orderInformation?.ShipName}</p>
            </div>
            <div className="field">
              <p>Total Products</p>
              <p>{orderInformation?.TotalProducts}</p>
            </div>
            <div className="field">
              <p>Total Quantity</p>
              <p>{orderInformation?.Quantity}</p>
            </div>
            <div className="field">
              <p>Total Price</p>
              <p>${orderInformation?.TotalPrice}</p>
            </div>
            <div className="field">
              <p>Total Discount</p>
              <p>${orderInformation?.TotalDiscount}</p>
            </div>
            <div className="field">
              <p>Ship Via</p>
              <p>{orderInformation?.ShipVia}</p>
            </div>
            <div className="field">
              <p>Freight</p>
              <p>${orderInformation?.Freight}</p>
            </div>
          </div>
          <div>
            <div className="field">
              <p>Order Date</p>
              <p>{orderInformation?.OrderDate.slice(0, 10)}</p>
            </div>
            <div className="field">
              <p>Required Date</p>
              <p>{orderInformation?.RequiredDate.slice(0, 10)}</p>
            </div>
            {orderInformation?.ShipCity && (
              <div className="field">
                <p>Ship City</p>
                <p>{orderInformation?.ShipCity}</p>
              </div>
            )}
            <div className="field">
              <p>Ship Region</p>
              <p>{orderInformation?.ShipRegion}</p>
            </div>
            {orderInformation?.ShipPostalCode && (
              <div className="field">
                <p>Ship Postal Code</p>
                <p>{orderInformation?.ShipPostalCode}</p>
              </div>
            )}
            <div className="field">
              <p>Ship Country</p>
              <p>{orderInformation?.ShipCountry}</p>
            </div>
          </div>
        </IndividualContainer>
        {productsInOrder && <OrderTable tableData={productsInOrder} />}
        <IndividualFooter to="/orders" border="unset" />
      </InfoCartWrapper>
    </main>
  );
}
