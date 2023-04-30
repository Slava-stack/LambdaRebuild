import React, { useState, useEffect } from "react";

import Rectangle from "../../components/Rectangle/Rectangle";
import MainButton from "../../components/MainButton/MainButton";
import Tab from "../../components/Tab/Tab";
import Slider, { Slider768 } from "../../components/Slider/Slider";
import Form from "../Form/Form";
import { tabSpanContent, tabs, thirdBlockRedSpans } from "./contents.js";

import "./Home.scss";
import topTileIMG from "../../images/Home/first_block_info/top_red_square/top tile.png";
import bottomTileIMG from "../../images/Home/first_block_info/top_red_square/bottom tile.png";
import desktopIMG from "../../images/Home/first_block_info/top_red_square/desktop img.png";
import smartphoneIMG from "../../images/Home/first_block_info/top_red_square/phone img.png";
import emojiSVG from "../../images/Home/first_block_info/Group.svg";
import infoTileIMG from "../../images/Home/first_block_info/Group 10356.png";
import sparklesSVG from "../../images/Home/first_block_info/sparkles.svg";
import featuresIMG from "../../images/Home/second_block/features.png";
import features2IMG from "../../images/Home/second_block/featuresV2.png";
import features3IMG from "../../images/Home/second_block/features768.png";
import features4IMG from "../../images/Home/second_block/features375px.png";
import baseRectangleSVG from "../../images/Home/second_block/Rectangle 4206.svg";
import leftTilingIMG from "../../images/Home/second_block/tiling left side.png";
import rightTilingIMG from "../../images/Home/second_block/tiling right side.png";
import playSVG from "../../images/Home/second_block/play.svg";
import thirdSparklesIMG from "../../images/Home/third_block/sparkles.png";
import thirdTilingIMG from "../../images/Home/third_block/tiling.png";
import firstPhoneChatsIMG from "../../images/Home/third_block/phoneChats.png";
import secondPhoneChatsIMG from "../../images/Home/third_block/secondPhoneChats.png";
import firstPhoneOrdersIMG from "../../images/Home/third_block/firstPhoneOrders.png";
import secondPhoneOrdersIMG from "../../images/Home/third_block/secondPhoneOrders.png";
import firstPhonePaymentsIMG from "../../images/Home/third_block/firstPayments.png";
import secondPhonePaymentsIMG from "../../images/Home/third_block/secondPayments.png";
import overlaySliderIMG from "../../images/Home/third_block/overlay-slider.png";
import thirdBlockTilingIMG from "../../images/Home/third_block/Group 10364.png";
import techChrunchSVG from "../../images/Home/featured_block/techCrunch.svg";
import techInAsiaSVG from "../../images/Home/featured_block/techinasia.svg";
import pymntsSVG from "../../images/Home/featured_block/pymnts.svg";
import ventureBeatSVG from "../../images/Home/featured_block/VentureBeat.svg";
import featuredTilingIMG from "../../images/Home/featured_block/featured tiling.png";
import featureSparklesSVG from "../../images/Home/featured_block/sparkles featured.svg";
import featuredTiling768IMG from "../../images/Home/featured_block/tiling 678.png";
import featureSparkles768SVG from "../../images/Home/featured_block/Group 10454.svg";
import leftTopTilingIMG from "../../images/Home/slider_block/left top.png";
import leftSliderTilingIMG from "../../images/Home/slider_block/left bottom.png";
import rightSliderTilingIMG from "../../images/Home/slider_block/right.png";
import tkIMG from "../../images/Home/sixth_block/tk left.png";
import naylaIMG from "../../images/Home/sixth_block/nayla left.png";
import petShopIMG from "../../images/Home/sixth_block/pet shop left.png";
import binondoIMG from "../../images/Home/sixth_block/binondo left.png";
import nexIMG from "../../images/Home/sixth_block/nex left.png";
import centerSixthIMG from "../../images/Home/sixth_block/center.png";
import groupIMG from "../../images/Home/sixth_block/group right.png";
import burgerLobstersIMG from "../../images/Home/sixth_block/burger and lobsters right.png";
import khoPaKaIMG from "../../images/Home/sixth_block/kho pa ka right.png";
import gongChaIMG from "../../images/Home/sixth_block/gong cha right.png";
import esTehIMG from "../../images/Home/sixth_block/es teh right.png";
import sixthLeftBottomTilingIMG from "../../images/Home/sixth_block/left bottom tiling.png";
import sixthRightTilingIMG from "../../images/Home/sixth_block/top tiling.png";
import sixthSmallTilingIMG from "../../images/Home/sixth_block/small tiling.png";
import mapIMG from "../../images/Home/form_block/map1920 1.png";
import mapV2IMG from "../../images/Home/form_block/mapv2.png";
import formSparklesSVG from "../../images/Home/form_block/sparklesForm.svg";
import formTilingIMG from "../../images/Home/form_block/tiling.png";
import formLeftTilingIMG from "../../images/Home/form_block/left tiling.png";

export default function Home({ windowWidth, setSettings }) {
  const [tabNumber, setTabNumber] = useState(1);

  useEffect(() => {
    setSettings("home");

    return () => {
      setSettings("");
    };
  }, [setSettings]);

  return (
    <main>
      <div className="first-block">
        <Rectangle classnaming="top" />
        <div className="payment-info">
          <img className="sparkles" src={sparklesSVG} alt="sparkles" />
          <h2>
            Collecting payments{" "}
            <span className="first-span">
              {windowWidth < 767 && <>&nbsp;</>}is easy
            </span>
            <span className="third-span">, right?</span>
          </h2>
          <p>
            Manage all your supply chain transactions in one dashboard. Get paid
            faster, reconcile quicker, grow bigger.
          </p>
          <div className="info-button-block">
            <MainButton name="Get Started Now" />
            <p>
              It's free to try!
              <img src={emojiSVG} alt="emoji" />
            </p>
          </div>
          <Rectangle classnaming="payment" />
          <img className="info-tiling-img" src={infoTileIMG} alt="tiling" />
        </div>
        <div className="first-block-img">
          <div className="base-first-layer" />
          <div className="base-second-layer" />
          <img className="high-tiling" src={topTileIMG} alt="tiling" />
          <img className="low-tiling" src={bottomTileIMG} alt="tiling" />
          <img
            className="first-block-desktop-img"
            src={desktopIMG}
            alt="desktop img"
          />
          <img
            className="first-block-smartphone-img"
            src={smartphoneIMG}
            alt="phone img"
          />
        </div>
      </div>
      <div className="second-block">
        {windowWidth < 1024 ? (
          <div className="base-layer">
            <Rectangle classnaming="how-works" />
          </div>
        ) : (
          <>
            <Rectangle classnaming="how-works" />
            <img
              className="base-layer"
              src={baseRectangleSVG}
              alt="base-rectangle"
            />
          </>
        )}
        <img
          className="features"
          src={
            windowWidth >= 1024 && windowWidth < 1280
              ? features2IMG
              : windowWidth >= 768 && windowWidth < 1024
              ? features3IMG
              : windowWidth < 768
              ? features4IMG
              : featuresIMG
          }
          alt="features"
        />
        <img className="left-tiling" src={rightTilingIMG} alt="tiling" />
        <div className="how-it-works-block">
          {windowWidth < 1440 && windowWidth >= 1280 ? (
            <>
              <h2>Tinvio in a heartbeat</h2>
              <p>
                Exchange messages, create or confirm orders, send invoices, and
                collect payments across your supply chain — all within one
                dashboard.
              </p>
            </>
          ) : (
            <>
              <h2>Check out how it works</h2>
              <p>
                It’s easy! Exchange messages, create or confirm orders, send
                invoices, and collect payments across your supply chain — all
                within one dashboard.
              </p>
            </>
          )}
          <div>
            <button className="how-it-works-btn">
              <img src={playSVG} alt="play" />
              Play Video
            </button>
          </div>
        </div>

        <img className="right-tiling" src={leftTilingIMG} alt="tiling" />
      </div>
      <div className="third-block">
        <Rectangle classnaming="transaction" />
        {windowWidth < 1024 && (
          <img
            className="third-block-tiling768"
            src={thirdBlockTilingIMG}
            alt="tiling"
          />
        )}
        <div
          className={`transaction-info ${
            thirdBlockRedSpans[tabNumber - 1].classNaming
          }`}
        >
          <h2>
            Smarter supply chain transactions.
            <span>{thirdBlockRedSpans[tabNumber - 1].spanText}</span>
            <hr />
          </h2>
          <div className="transaction-info-btns">
            {tabs.map((el) => (
              <Tab
                onClick={() => setTabNumber(el.id)}
                name={el.btnName}
                tabnumber={tabNumber}
                id={el.id}
                key={el.id}
              />
            ))}
          </div>
          <ul>
            {tabSpanContent[tabNumber - 1].map((el) => (
              <li key={el.id}>{el.data}</li>
            ))}
          </ul>
          <MainButton classnaming="transaction" name="More Features" />
        </div>
        <div className="third-block-imgs">
          <img
            className="third-block-sparkles"
            src={thirdSparklesIMG}
            alt="sparkles"
          />
          <div className="third-block-first-base">
            <div className="third-block-second-base" />
          </div>
          <img
            className="third-block-tiling"
            src={thirdTilingIMG}
            alt="tiling"
          />
          <img
            src={
              tabNumber === 1
                ? firstPhoneChatsIMG
                : tabNumber === 2
                ? firstPhoneOrdersIMG
                : firstPhonePaymentsIMG
            }
            alt=""
            className={`first-phone ${
              tabNumber === 2
                ? "orders"
                : tabNumber === 3
                ? "payments"
                : "chats"
            }`}
          />
          {windowWidth < 1280 && tabNumber === 1 && (
            <img
              className="overlay-slider"
              src={overlaySliderIMG}
              alt="overlay-slider"
            />
          )}
          <img
            src={
              tabNumber === 1
                ? secondPhoneChatsIMG
                : tabNumber === 2
                ? secondPhoneOrdersIMG
                : secondPhonePaymentsIMG
            }
            alt=""
            className={`second-phone ${
              tabNumber === 2
                ? "orders"
                : tabNumber === 3
                ? "payments"
                : "chats"
            }`}
          />
        </div>
      </div>
      <div className="featured-on-block">
        <img
          src={windowWidth < 1024 ? featuredTiling768IMG : featuredTilingIMG}
          alt="tiling"
          className="featured-tiling"
        />
        <div className="featured-base">
          <Rectangle classnaming="featured-right" />
          <Rectangle classnaming="featured-left" />
        </div>
        <div className="featured-wrapper">
          <h2>Featured On</h2>
          <hr />
          <div className="featured-on-services">
            <img src={techChrunchSVG} alt="company logo and name" />
            <img src={techInAsiaSVG} alt="company logo and name" />
            <img src={pymntsSVG} alt="company logo and name" />
            <img src={ventureBeatSVG} alt="company logo and name" />
          </div>
        </div>
        <img
          className="featured-sparkles"
          src={windowWidth < 1024 ? featureSparkles768SVG : featureSparklesSVG}
          alt="sparkles"
        />
      </div>
      <div className="slider-block">
        <img
          src={leftTopTilingIMG}
          alt="tiling"
          className="slider-left-top-tiling"
        />
        <div className="slider-base">
          <Rectangle classnaming="slider-left" />
          <Rectangle classnaming="slider-right" />
          <img
            src={leftSliderTilingIMG}
            alt="tiling"
            className="slider-base-left-tiling"
          />
          <img
            src={rightSliderTilingIMG}
            alt="tiling"
            className="slider-base-right-tiling"
          />
        </div>
        <div className="slider">
          <h2>Why choose Tinvio?</h2>
          {windowWidth < 1024 ? <Slider768 /> : <Slider />}
        </div>
      </div>
      <div className="sixth-block">
        <h2>We’ll put a smile on your supply chain </h2>
        <Rectangle classnaming="sixth-left-top" />
        <Rectangle classnaming="sixth-left-bottom" />
        <Rectangle classnaming="sixth-right" />
        <img
          src={sixthLeftBottomTilingIMG}
          alt="tiling"
          className="sixth-left-bottom-tiling"
        />
        <img
          src={sixthRightTilingIMG}
          alt="tiling"
          className="sixth-right-tiling"
        />
        <img
          src={sixthSmallTilingIMG}
          alt="tiling"
          className="sixth-small-tiling"
        />
        <div className="pics-block">
          <div className="left-pics">
            <div className="left-column">
              <img src={binondoIMG} alt="binondo" />
              <img src={nexIMG} alt="nex" />
            </div>
            <img src={petShopIMG} alt="pet shop" className="left-pics-center" />
            <div className="right-column">
              <img src={tkIMG} alt="tk" />
              <img src={naylaIMG} alt="nayla" />
            </div>
          </div>
          <img
            src={centerSixthIMG}
            alt="happy bussinesses"
            className="companies-center"
          />
          <div className="right-pics">
            <div className="left-column">
              <img src={groupIMG} alt="group of companies" />
              <img src={burgerLobstersIMG} alt="burger and lobsters" />
            </div>
            <img
              className="right-pics-center"
              src={khoPaKaIMG}
              alt="kho pa ka "
            />
            <div className="right-column">
              <img src={gongChaIMG} alt="gong cha" />
              <img src={esTehIMG} alt="es teh" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-block">
        <img src={formSparklesSVG} alt="sparkles" className="form-sparkles" />
        {windowWidth < 767 ? (
          <img src={formLeftTilingIMG} alt="tiling" />
        ) : (
          <div className="form-base">
            <img src={formTilingIMG} alt="tiling" />
            {windowWidth > 767 && windowWidth < 1440 && (
              <img src={formLeftTilingIMG} alt="tiling" />
            )}
          </div>
        )}
        <div className="map">
          <img
            src={windowWidth >= 1024 && windowWidth < 1280 ? mapV2IMG : mapIMG}
            alt="find us map"
          />
          <h2>Fill up the form and we’ll get in touch within a few hours</h2>
        </div>
        <Form />
      </div>
    </main>
  );
}
