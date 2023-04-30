import React, { useState, useEffect } from "react";
import { secondBlockParagraphs, FAQcontent } from "./featuresInfo";

import "./Features.scss";
import MainButton from "../MainButton/MainButton";
import Rectangle from "../Rectangle/Rectangle";
import HeaderButton from "../HeaderButton/HeaderButton";
import FAQ from "../FAQ/FAQ";

import firstBaseIMG from "../../images/Features/first_block/base2.png";
import sparklesIMG from "../../images/Features/first_block/sparkles.png";
import dollarSVG from "../../images/Features/first_block/dollar.svg";
import arrowSVG from "../../images/Features/first_block/arrow.svg";
import sharePaymentIMG from "../../images/Features/first_block/share payment.png";
import sharePayment375IMG from "../../images/Features/first_block/share payment375.png";
import phoneDotsIMG from "../../images/Features/first_block/phone dots.png";
import phoneDots2IMG from "../../images/Features/first_block/phone dots768.png";
import phoneDots3IMG from "../../images/Features/first_block/phone dots375.png";
import sharePaymentDotsIMG from "../../images/Features/first_block/share links dots.png";
import leftFirstBlockTilingIMG from "../../images/Features/first_block/left tiling.png";
import rightFirstBlockTilingIMG from "../../images/Features/first_block/right tiling.png";
import secondBlockSparklesIMG from "../../images/Features/second_block/sparkles.png";
import secondBlockSparkles1024IMG from "../../images/Features/second_block/sparkles2.png";
import secondBlockSparkles768IMG from "../../images/Features/second_block/sparkles3.png";
import desktopIMG from "../../images/Features/second_block/second block desktop.png";
import desktop375IMG from "../../images/Features/second_block/second block desktop375.png";
import secondBlockTilingIMG from "../../images/Features/second_block/second-tiling.png";
import phoneIMG from "../../images/Features/third_block/phone.png";
import phone375IMG from "../../images/Features/third_block/phone375.png";
import phoneTilingIMG from "../../images/Features/third_block/phone tiling.png";
import sendMsgTilingIMG from "../../images/Features/third_block/send msg tiling.png";
import clipSVG from "../../images/Features/third_block/clip.svg";
import fileSVG from "../../images/Features/third_block/file.svg";
import invoicesTilingIMG from "../../images/Features/third_block/create invoices tiling.png";
import dollarBtnSVG from "../../images/Features/third_block/dollar button.svg";
import shareTilingIMG from "../../images/Features/third_block/share tilings.png";
import shareBtnSVG from "../../images/Features/third_block/share button.svg";
import shareBtn2SVG from "../../images/Features/third_block/share button2.svg";
import calendarSVG from "../../images/Features/fourth_block/Calendar.svg";
import listSVG from "../../images/Features/fourth_block/list.svg";
import leftSparklesSVG from "../../images/Features/fourth_block/left-sparkles.svg";
import rightSparklesSVG from "../../images/Features/fourth_block/right-sparkles.svg";
import leftCircleIMG from "../../images/Features/fourth_block/left-circle.png";
import rightCircleIMG from "../../images/Features/fourth_block/right-circle.png";
import leftDotsIMG from "../../images/Features/fourth_block/left-dots.png";
import rightLeftDotsIMG from "../../images/Features/fourth_block/right-left-dots.png";
import rightRightDotsIMG from "../../images/Features/fourth_block/right-right-dots.png";
import leftTiling from "../../images/Features/fourth_block/left-tiling.png";
import rightTiling from "../../images/Features/fourth_block/right-tiling.png";
import fourthTiling from "../../images/Features/fourth_block/fourth tiling.png";
import fourthArrowSVG from "../../images/Features/fourth_block/arrow.svg";
import sparklesSepIMG from "../../images/Features/features_separator/sparkles.png";
import sparklesSep2IMG from "../../images/Features/features_separator/sparkles1024.png";
import sparklesSep3IMG from "../../images/Features/features_separator/sparkles768.png";
import sparklesSep4IMG from "../../images/Features/features_separator/sparkles375.png";
import sepTilingIMG from "../../images/Features/features_separator/tiling separator.png";
import fifthBaseIMG from "../../images/Features/fifth_block/first_nested/fullBase.png";
import fifthRightDotsIMG from "../../images/Features/fifth_block/first_nested/right dots.png";
import fifthRightDots375IMG from "../../images/Features/fifth_block/first_nested/right dots375.png";
import fifthLeftDotsIMG from "../../images/Features/fifth_block/first_nested/left dots.png";
import fifthLeftDots375IMG from "../../images/Features/fifth_block/first_nested/left dots375.png";
import fifthLeftDots768IMG from "../../images/Features/fifth_block/first_nested/left dots768.png";
import fifthArrowSVG from "../../images/Features/fifth_block/first_nested/Vector.svg";
import tickSVG from "../../images/Features/fifth_block/first_nested/Vector (1).svg";
import bellSVG from "../../images/Features/fifth_block/first_nested/Group 1215.svg";
import secondNestedLPhoneIMG from "../../images/Features/fifth_block/second_nested/left phone.png";
import secondNestedLPhone768IMG from "../../images/Features/fifth_block/second_nested/left phone 768.png";
import secondNestedRPhoneIMG from "../../images/Features/fifth_block/second_nested/right phone.png";
import secondNestedRPhone768IMG from "../../images/Features/fifth_block/second_nested/right phone 768.png";
import secondNestedTilingIMG from "../../images/Features/fifth_block/second_nested/tiling.png";
import secondNestedsparklesIMG from "../../images/Features/fifth_block/second_nested/sparkles.png";
import thirdNestedTilingIMG from "../../images/Features/fifth_block/third_nested/tiling.png";
import phoneNestedIMG from "../../images/Features/fifth_block/third_nested/phone.png";
import phoneNested768IMG from "../../images/Features/fifth_block/third_nested/phone768.png";
import sparklesNesetedSVG from "../../images/Features/fifth_block/third_nested/sparkles.svg";
import sparklesNeseted768SVG from "../../images/Features/fifth_block/third_nested/sparkles768.svg";
import tabletIMG from "../../images/Features/fifth_block/third_nested/tablet.png";
import tablet768IMG from "../../images/Features/fifth_block/third_nested/tablet768.png";
import leftThirdTilingIMG from "../../images/Features/fifth_block/third_nested/left tiling.png";
import nestedLeftSparklesSVG from "../../images/Features/fifth_block/fourth_nested/leftSparkles.svg";
import nestedLeftSparkles375SVG from "../../images/Features/fifth_block/fourth_nested/leftSparkles375.svg";
import nestedRightSparklesSVG from "../../images/Features/fifth_block/fourth_nested/rightSparkles.svg";
import nestedRightSparkles375SVG from "../../images/Features/fifth_block/fourth_nested/rightSparkles375.svg";
import firstCustomerIMG from "../../images/Features/fifth_block/fourth_nested/cust1.png";
import firstCustomer2IMG from "../../images/Features/fifth_block/fourth_nested/cust11280.png";
import secondCustomerIMG from "../../images/Features/fifth_block/fourth_nested/cust2.png";
import secondCustomer2IMG from "../../images/Features/fifth_block/fourth_nested/cust21280.png";
import secondCustomer3IMG from "../../images/Features/fifth_block/fourth_nested/cust2768.png";
import thirdCustomerIMG from "../../images/Features/fifth_block/fourth_nested/cust3.png";
import thirdCustomer2IMG from "../../images/Features/fifth_block/fourth_nested/cust31280.png";
import fourthCustomerIMG from "../../images/Features/fifth_block/fourth_nested/cust4.png";
import fourthCustomer2IMG from "../../images/Features/fifth_block/fourth_nested/cust41280.png";
import nestedFourthTilingIMG from "../../images/Features/fifth_block/fourth_nested/tiling.png";
import leftSepFaqTilingIMG from "../../images/Features/faq_separator/left.png";
import rightSepFaqTilingIMG from "../../images/Features/faq_separator/right.png";
import rightSepFaqTilingSIMG from "../../images/Features/faq_separator/small tiling (2).png";
import leftFaqTilingIMG from "../../images/Features/faq_block/left tiling.png";
import rightFaqTilingIMG from "../../images/Features/faq_block/right tiling.png";

export default function Features({
  windowWidth,
  setIsShownOverlay,
  setSettings,
}) {
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [sentInvoice, setSentInvoice] = useState(false);

  useEffect(() => {
    setSettings("features");

    return () => {
      setSettings("");
    };
  }, [setSettings]);

  function inputHandler(event) {
    setInputFieldValue(event.target.value);
  }

  function invoiceHandler() {
    setSentInvoice((sentInvoice) => !sentInvoice);
  }

  function getRightParagraph(windowWidth, el) {
    if (windowWidth < 1280 && el.thirdParagraph) {
      return <p>{el.thirdParagraph}</p>;
    }
    if (windowWidth < 1920 && el.secondParagraph) {
      return <p>{el.secondParagraph}</p>;
    }
    return <p>{el.paragraph}</p>;
  }

  return (
    <main>
      <div className="first-block-features">
        <img src={sparklesIMG} alt="sparkles" />
        <h2>
          One dashboard, all your {windowWidth >= 768 && <>&nbsp;</>}supply
          chain transactions
        </h2>
        <p className="first-block-paragraph">
          From orders to real-time cash in your bank. Run your business like a
          rockstar.
        </p>
        <MainButton
          name="Try It for Free"
          classnaming="features-first-block"
          onClick={() => setIsShownOverlay(true)}
        />
        <div className="imgs-block">
          <img src={firstBaseIMG} alt="" className="base-img" />
          <img
            src={
              windowWidth < 768
                ? phoneDots3IMG
                : windowWidth < 1024
                ? phoneDots2IMG
                : phoneDotsIMG
            }
            alt="phone dots"
            className="phone-dots"
          />
          <img
            src={sharePaymentDotsIMG}
            alt="message dots"
            className="message-dots"
          />
          <img
            src={windowWidth < 768 ? sharePayment375IMG : sharePaymentIMG}
            alt="payment link"
            className="payment-img"
          />
          <img src={dollarSVG} alt="img-dollar" className="dollar-img" />
          <div className="shrinked-shadow-box" />
          <div className="payment-status">
            <p>Payment Completed</p>
            <p>INV-HDNSD5H</p>
            <p>$ 450.00</p>
            <img src={arrowSVG} alt="arrow button" />
            <p>5:26 PM</p>
          </div>
        </div>
        <img
          src={leftFirstBlockTilingIMG}
          alt="tiling"
          className="first-left-tiling"
        />
        <img
          src={rightFirstBlockTilingIMG}
          alt="tiling"
          className="first-right-tiling"
        />
        <Rectangle classnaming="top-features" />
        {windowWidth < 1024 && <Rectangle classnaming="features-first-right" />}
      </div>
      <div className="second-block-features">
        <div className="second-block-wrapper">
          <h2>Supercharge your business with Tinvio</h2>
          <div className="second-block-base">
            <img
              src={windowWidth < 768 ? desktop375IMG : desktopIMG}
              alt="desktop"
            />
            <Rectangle classnaming="second-top-features" />
            <Rectangle classnaming="second-bottom-features" />
            <div className="paragraphs">
              {secondBlockParagraphs.map((el) => {
                return (
                  <div className="paragraph-wrapper" key={el.header}>
                    <Rectangle classnaming="paragraph" />
                    <h4>{el.header}</h4>
                    {getRightParagraph(windowWidth, el)}
                  </div>
                );
              })}
            </div>
            <img src={secondBlockTilingIMG} alt="tiling" />
          </div>
        </div>
        <img
          src={
            windowWidth < 1024
              ? secondBlockSparkles768IMG
              : windowWidth < 1280
              ? secondBlockSparkles1024IMG
              : secondBlockSparklesIMG
          }
          alt="sparkles"
        />
      </div>
      <div className="third-block-features">
        <div className="phone-block">
          <Rectangle classnaming="phone-left" />
          <Rectangle classnaming="phone-right" />
          <img src={phoneTilingIMG} alt="tiling" />
          <div className="phone-content">
            <h3>Manage orders</h3>
            <p>
              Yay, you’ve got a new order! Check and confirm the order in
              lightning speed
            </p>
            <img src={windowWidth < 768 ? phone375IMG : phoneIMG} alt="phone" />
          </div>
        </div>
        <div className="send-payments-wrapper">
          <div className="send-message-block">
            <div className="send-message-wrapper">
              <div className="upload-file-block">
                <div className="clip-pseudo-btn">
                  <img src={clipSVG} alt="clip" />
                </div>
                <div className="file-pseudo-btn">
                  <img src={fileSVG} alt="file" />
                </div>
                <input
                  onChange={inputHandler}
                  type="text"
                  placeholder="Type something..."
                />
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.50124 3.73228C4.50124 3.8594 4.45252 3.98651 4.3553 4.08343L1.29437 7.1333C1.09966 7.32731 0.783969 7.32731 0.589335 7.1333C0.394701 6.93937 0.394701 6.62487 0.589335 6.43084L3.29781 3.73228L0.589429 1.03369C0.394795 0.83968 0.394795 0.525217 0.589429 0.331299C0.784063 0.137193 1.09976 0.137193 1.29447 0.331299L4.35539 3.38113C4.45263 3.47809 4.50124 3.6052 4.50124 3.73228Z"
                    fill={!inputFieldValue ? "#5C5C5C" : "#212121"}
                  />
                </svg>
              </div>
              <h3>Send messages</h3>
            </div>
            <Rectangle classnaming="send-msg-left" />
            <Rectangle classnaming="send-msg-right" />
            <img src={sendMsgTilingIMG} alt="tiling" />
          </div>
          <div className="pseudo-btns-wrapper">
            <div className="invoices-block">
              {windowWidth < 768 ? (
                <>
                  <img
                    src={windowWidth < 1280 ? shareBtn2SVG : shareBtnSVG}
                    alt="pseudo button"
                  />
                  <h3>
                    Share payment{" "}
                    {windowWidth < 1280 && windowWidth > 768 && <>&nbsp;</>}
                    links
                  </h3>
                </>
              ) : (
                <>
                  <h3>Create invoices</h3>
                  <img src={dollarBtnSVG} alt="pseudo button" />
                </>
              )}
              <Rectangle classnaming="invoices-left" />
              <Rectangle classnaming="invoices-right" />
              <img src={invoicesTilingIMG} alt="tiling" />
            </div>
            <div className="share-payments-block">
              <img src={shareTilingIMG} alt="tiling" />
              <Rectangle classnaming="left-share" />
              <Rectangle classnaming="right-share" />
              <div className="share-payments-wrapper">
                {windowWidth < 768 ? (
                  <>
                    <h3>Create invoices</h3>
                    <img src={dollarBtnSVG} alt="pseudo button" />
                  </>
                ) : (
                  <>
                    <img
                      src={windowWidth < 1280 ? shareBtn2SVG : shareBtnSVG}
                      alt="pseudo button"
                    />
                    <h3>
                      Share payment{" "}
                      {windowWidth < 1280 && windowWidth > 768 && <>&nbsp;</>}
                      links
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fourth-block-features">
        <img src={fourthTiling} alt="tiling" />
        <div className="description">
          <h2>Breeze through orders without the stress</h2>
          <p>
            {windowWidth <= 1440 ? "Your c" : "C"}ustomers will love that they
            can browse item catalogs and check availability before placing
            orders. You’ll receive orders in beautifully formatted lists
            {windowWidth > 1440 && " with clear inventory balances"}. Confirm or
            amend them in a few taps, even when on-the-go!
          </p>
        </div>
        <div className="imgs-block">
          <img src={leftTiling} alt="tiling" className="left-tiling" />
          <img src={rightTiling} alt="tiling" className="right-tiling" />
          <div className="first-base-layer">
            <div className="second-base-layer" />
            <div className="img-content">
              <div className="catalog">
                <img src={listSVG} alt="list" />
                <p>Add Catalog to Order List</p>
                <img src={fourthArrowSVG} alt="arrow" />
              </div>
              <img
                src={rightLeftDotsIMG}
                alt="dots"
                className="left-right-dots"
              />
              <img
                src={rightRightDotsIMG}
                alt="dots"
                className="right-right-dots"
              />
              <div className="delivery">
                <img src={calendarSVG} alt="calendar" />
                <p>Delivery on</p>
                <p>Tue, 27 Oct</p>
              </div>
              <div className="right-circle-pic">
                <img
                  src={rightSparklesSVG}
                  alt="sparkles"
                  className="right-sparkles"
                />
                <img
                  src={rightCircleIMG}
                  alt="customer"
                  className="circle-pic"
                />
              </div>
              <div className="left-circle-pic">
                <img
                  src={leftSparklesSVG}
                  alt="sparkles"
                  className="left-sparkles"
                />
                <img
                  src={leftCircleIMG}
                  alt="customer"
                  className="circle-pic"
                />
              </div>
              <img src={leftDotsIMG} alt="dots" className="left-dots" />
              <div className="order-confirmation">
                <div className="amount">
                  <p>Total Amount</p>
                  <p>$ 1340.00</p>
                </div>
                <div className="pseudo-btn">
                  <p>Confirm Order (9 Items)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-separator-features">
        <div className="separator-wrapper">
          <Rectangle classnaming="sep-rect" />
          <h2>
            Sounds easy?
            {windowWidth < 1024 && (
              <>
                <>&#160;</>
                <br />
              </>
            )}{" "}
            Supply chain transactions don’t have
            {windowWidth < 1024 && windowWidth >= 768 && <>&#160;</>} to be
            complicated
          </h2>
          <img src={sepTilingIMG} alt="tiling" />
          <HeaderButton
            classnaming="nav-button sep-btn"
            buttonname="Get Started"
          />
        </div>
        <img
          src={
            windowWidth < 768
              ? sparklesSep4IMG
              : windowWidth < 1024
              ? sparklesSep3IMG
              : windowWidth < 1280
              ? sparklesSep2IMG
              : sparklesSepIMG
          }
          alt="sparkles"
        />
      </div>
      <div className="fifth-block-features">
        <div className="first-nested">
          <div className="text-content">
            <h2>
              Send invoices,{windowWidth < 768 && <>&#160;</>} save the trees{" "}
            </h2>
            <p>
              Send invoices digitally, and track them all the way until they’re
              paid. It’s easier to reconcile and more organized than printouts.
              If they’re overdue, automatically send a friendly reminder or two!
            </p>
          </div>
          <div className="imgs-block">
            <img src={fifthBaseIMG} alt="base" />
            <img
              src={
                windowWidth < 768
                  ? fifthLeftDots375IMG
                  : windowWidth < 1024
                  ? fifthLeftDots768IMG
                  : fifthLeftDotsIMG
              }
              alt="dots"
            />
            <img
              src={windowWidth < 768 ? fifthRightDots375IMG : fifthRightDotsIMG}
              alt="dots"
            />
            <div className="send-invoice">
              <div>
                {sentInvoice ? (
                  <p>Well done, invoice sent!</p>
                ) : (
                  <>
                    <p>Send an invoice for this order</p>
                    <p>Need a template?</p>
                    <p>Generate Invoice</p>
                    <img src={fifthArrowSVG} alt="arrow" />
                  </>
                )}
              </div>
              <button onClick={invoiceHandler}>
                {sentInvoice ? "View Invoice" : "Send Invoice"}
              </button>
            </div>
            <div className="reminders">
              <img src={bellSVG} alt="bell" />
              <p>Send Reminders</p>
              <img src={tickSVG} alt="tick" />
            </div>
          </div>
        </div>
        <div className="second-nested">
          <Rectangle classnaming="second-nested-rect" />
          <div className="img-block">
            <img src={secondNestedsparklesIMG} alt="sparkles" />
            <div className="first-base">
              <div className="second-base" />
            </div>
            <img
              src={
                windowWidth < 1024
                  ? secondNestedLPhone768IMG
                  : secondNestedLPhoneIMG
              }
              alt="left phone"
            />
            <img
              src={
                windowWidth < 1024
                  ? secondNestedRPhone768IMG
                  : secondNestedRPhoneIMG
              }
              alt="right phone"
            />
            <img src={secondNestedTilingIMG} alt="tiling" />
          </div>
          <div className="text-content">
            <h2>Make collections fast, flexible, fun</h2>
            <p>
              Give customers a modern B2B payments experience, with more ways to
              pay (including credit terms). Zero setup or risk for you. They’ll
              stay with you longer, purchase more from you, and you’ll get cash
              in your bank so much faster!
            </p>
          </div>
        </div>
        <div className="third-nested">
          <img src={leftThirdTilingIMG} alt="tiling" />
          <Rectangle classnaming="third-nested-rect" />
          <div className="text-content">
            <h2>
              Get smarter about all{windowWidth < 1024 && <br />} the little
              details
            </h2>
            <p>
              Monitor your transaction{windowWidth > 1440 && "s"} activity on
              one dashboard. Generate customized order,
              {windowWidth > 1440 ? " inventory" : " invoice"}, and payments
              reports. Prevent fraud, improve operations
              {windowWidth > 1440 && ", manage working capital"}, and grow grow
              grow!
            </p>
          </div>
          <div className="img-block">
            <img src={thirdNestedTilingIMG} alt="tiling" />
            <div className="first-base">
              <div className="second-base" />
            </div>
            <img
              src={
                windowWidth < 1023 ? sparklesNeseted768SVG : sparklesNesetedSVG
              }
              alt="sparkles"
            />
            <img
              src={windowWidth < 1024 ? phoneNested768IMG : phoneNestedIMG}
              alt="phone"
            />
            <img
              src={windowWidth < 1024 ? tablet768IMG : tabletIMG}
              alt="tablet"
            />
          </div>
        </div>
        <div className="fourth-nested">
          <img src={nestedFourthTilingIMG} alt="tiling" />
          <div className="block-imgs">
            <img
              src={windowWidth > 1280 ? firstCustomerIMG : firstCustomer2IMG}
              alt="customer one"
            />
            <img
              src={
                windowWidth < 1024
                  ? secondCustomer3IMG
                  : windowWidth < 1280
                  ? secondCustomer2IMG
                  : secondCustomerIMG
              }
              alt="customer two"
            />
            <img
              src={windowWidth > 1280 ? thirdCustomerIMG : thirdCustomer2IMG}
              alt="customer three"
            />
            <img
              src={windowWidth > 1280 ? fourthCustomerIMG : fourthCustomer2IMG}
              alt="customer four"
            />
          </div>
          <div className="text-content">
            <h3>
              It’s your business. Run it like a rockstar
              {windowWidth <= 1280 && "."}
            </h3>
            <img
              src={
                windowWidth < 768
                  ? nestedLeftSparkles375SVG
                  : nestedLeftSparklesSVG
              }
              alt="sparkles"
            />
            <img
              src={
                windowWidth < 768
                  ? nestedRightSparkles375SVG
                  : nestedRightSparklesSVG
              }
              alt="sparkles"
            />
          </div>
          <Rectangle classnaming="top-clients-rect" />
          <Rectangle classnaming="bottom-clients-rect" />
        </div>
      </div>
      <div className="faq-separator-features">
        <div className="separator-wrapper">
          <div className="left-faq-sep-rect">
            <img
              src={rightSepFaqTilingSIMG}
              alt="tiling"
              className="faq-sep-right-small-tiling"
            />
          </div>
          <Rectangle classnaming="right-faq-sep" />
          <img
            src={leftSepFaqTilingIMG}
            alt="tiling"
            className="faq-sep-left-tiling"
          />
          <img
            src={rightSepFaqTilingIMG}
            alt="tiling"
            className="faq-sep-right-tiling"
          />
          <div className="text-content">
            <p>ARE YOU READY?</p>
            <h3>Supercharge your business, the Tinvio way</h3>
            <HeaderButton classnaming="faq-sep" buttonname="Get Started" />
          </div>
        </div>
      </div>
      <div className="faq-block-features">
        <h2>FAQ</h2>
        {FAQcontent.map((el, i, arr) => {
          return (
            <FAQ
              question={el.question}
              answer={el.answer}
              key={el.id}
              isLast={i !== arr.length - 1}
            />
          );
        })}
        <Rectangle classnaming="faq-top-right" />
        <Rectangle classnaming="faq-bottom-right" />
        <Rectangle classnaming="faq-left" />
        <img src={leftFaqTilingIMG} alt="tiling" className="faq-left-tiling" />
        <img
          src={rightFaqTilingIMG}
          alt="tiling"
          className="faq-right-tiling"
        />
      </div>
    </main>
  );
}
