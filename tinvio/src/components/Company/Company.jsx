import React, { useEffect } from "react";

import "./Company.scss";
import Rectangle from "../Rectangle/Rectangle";
import { theses2021, theses2020, theses2019 } from "./theses";

import HeaderButton from "../HeaderButton/HeaderButton";

import firstSparklesIMG from "../../images/Company/first_block/first-sparkles.svg";
import firstBottomTilingIMG from "../../images/Company/first_block/bottom right tiling.png";
import firstTopTilingIMG from "../../images/Company/first_block/top right tiling.png";
import firstMiddleTilingIMG from "../../images/Company/first_block/left-tiling.png";
import chatIMG from "../../images/Company/first_block/Chat.svg";
import phoneSparklesIMG from "../../images/Company/first_block/phone-sparkles.svg";
import firstPhoneIMG from "../../images/Company/first_block/phone.png";
import firstPhone1024IMG from "../../images/Company/first_block/phone1024.png";
import firstPhone375IMG from "../../images/Company/first_block/phone375.png";
import tabletIMG from "../../images/Company/second_block/tablet.png";
import tablet768IMG from "../../images/Company/second_block/700 tablet.png";
import tablet375IMG from "../../images/Company/second_block/300 tablet.png";
import done1TilingIMG from "../../images/Company/second_block/done 1.png";
import done2LTilingIMG from "../../images/Company/second_block/done 2 left.png";
import done2RTilingIMG from "../../images/Company/second_block/done 2 right.png";
import secondBTilingIMG from "../../images/Company/second_block/bottom left 2.png";
import secondTTilingIMG from "../../images/Company/second_block/top right 2.png";
import secondPhoneIMG from "../../images/Company/second_block/phone done 3.png";
import secondPhone768IMG from "../../images/Company/second_block/phone done 3-768.png";
import done3TilingIMG from "../../images/Company/second_block/done 3.png";
import done4TilingIMG from "../../images/Company/second_block/done 4.png";
import done5TilingIMG from "../../images/Company/second_block/done 5.png";
import plus250TilingIMG from "../../images/Company/third_block/tiling 250+.png";
import plus10TilingIMG from "../../images/Company/third_block/tiling 10+.png";
import M500TilingIMG from "../../images/Company/third_block/500M.png";
import plus5000SparklesIMG from "../../images/Company/third_block/tiling 5000+.png";
import fourthSparklesIMG from "../../images/Company/fourth_block/Group 10480.svg";
import fourthBLTilingIMG from "../../images/Company/fourth_block/back left tiling.png";
import fourthBRTilingIMG from "../../images/Company/fourth_block/back right tiling.png";
import fourthNestedTilingIMG from "../../images/Company/fourth_block/join us tiling.png";
import teamBRIMG from "../../images/Company/fourth_block/br.png";
import teamBLIMG from "../../images/Company/fourth_block/bl.png";
import teamTLIMG from "../../images/Company/fourth_block/tl.png";
import teamTRIMG from "../../images/Company/fourth_block/tr.png";
import sepBTilingIMG from "../../images/Company/separator_block/bottom.png";
import sepTTilingIMG from "../../images/Company/separator_block/top tiling.png";
import commentIMG from "../../images/Company/separator_block/comment.svg";
import penIMG from "../../images/Company/separator_block/pen.svg";
import rocketIMG from "../../images/Company/separator_block/rocket.svg";
import sixthSparklesIMG from "../../images/Company/sixth_block/sparkles.svg";
import sixthTilingIMG from "../../images/Company/sixth_block/tiling.png";
import tlBuilingsIMG from "../../images/Company/sixth_block/lt.png";
import tlBuilings1024IMG from "../../images/Company/sixth_block/lt1024.png";
import trBuilingsIMG from "../../images/Company/sixth_block/rt.png";
import trBuilings1024IMG from "../../images/Company/sixth_block/rt1024.png";
import blBuilingsIMG from "../../images/Company/sixth_block/lb.png";
import blBuilings1024IMG from "../../images/Company/sixth_block/lb1024.png";
import brBuilingsIMG from "../../images/Company/sixth_block/rb.png";
import brBuilings1024IMG from "../../images/Company/sixth_block/rb1024.png";
import brBuilings768IMG from "../../images/Company/sixth_block/rb768.png";
import seventhTilingIMG from "../../images/Company/seventh_block/background tiling.png";
import seventhContact1TilingIMG from "../../images/Company/seventh_block/first tiling.png";
import seventhContact2TilingIMG from "../../images/Company/seventh_block/second tiling.png";
import seventhContact3TilingIMG from "../../images/Company/seventh_block/third tiling.png";

export default function Company({ windowWidth, setSettings }) {
  useEffect(() => {
    setSettings("company");

    return () => {
      setSettings("");
    };
  }, [setSettings]);

  return (
    <main>
      <div className="first-block-company">
        <Rectangle classnaming="left-top-first-company" />
        <Rectangle classnaming="left-bottom-first-company" />
        <Rectangle classnaming="right-768-first-company" />
        <Rectangle classnaming="right-first-company" />
        <img src={firstTopTilingIMG} alt="tiling" className="top-tiling" />
        <img
          src={firstBottomTilingIMG}
          alt="tiling"
          className="bottom-tiling"
        />
        <img
          src={firstMiddleTilingIMG}
          alt="tiling"
          className="middle-tiling"
        />
        <div className="greetings">
          <img src={firstSparklesIMG} alt="sparkles" />
          <h2>
            Hi, we’re
            <span> Tinvio</span>!
          </h2>
          <p>
            We’re reimaging how merchants {windowWidth < 768 && <>&nbsp;</>}and
            suppliers transact.
          </p>
        </div>
        <div className="first-block-content">
          <div className="text-content">
            <p>
              Tinvio is built for B2B transactions. It's an app, it's a
              dashboard, it's a checkout link, it's a digital wallet, it's a
              credit line, it's money in (and out) of your bank, and so much
              more. Tradition meets modern in a delightful chat-led user
              experience. The best part? We make it fast, flexible, and fun.
              <br />
              Why do we do it? It's painfully frustrating for businesses to
              transact. Our generation are minting NFTs on blockchains everyday
              and about to colonize Mars, but in our supply chains, businesses
              are still exchanging cold hard cash, writing checks, and keying
              manual bank transfers. We're going to reimagine the status quo,
              we're going to digitize the zillions of these offline receivables
              and payables. One transaction at a time.
            </p>
            <button>
              <img src={chatIMG} alt="comment" />
              Contact Us
            </button>
            <Rectangle classnaming="first-block-text-375" />
          </div>
          <div className="imgs-content">
            <img
              src={
                windowWidth < 768
                  ? firstPhone375IMG
                  : windowWidth < 1440
                  ? firstPhone1024IMG
                  : firstPhoneIMG
              }
              alt="phone"
              className="phone"
            />
            <img
              src={phoneSparklesIMG}
              alt="sparkles"
              className="phone-sparkles"
            />
          </div>
        </div>
      </div>
      <div className="second-block-company">
        <img src={secondTTilingIMG} alt="tiling" className="top-tiling" />
        <img src={secondBTilingIMG} alt="tiling" className="bottom-tiling" />
        <Rectangle classnaming="second-company" />
        <h3>What we’ve done</h3>
        <div className="done">
          <div className="first-done">
            <Rectangle classnaming="first-done-top-rect" />
            <Rectangle classnaming="first-done-bottom-rect" />
            <h5>2021</h5>
            <div className="theses">
              {theses2021.map((el) => (
                <div className="thesis" key={el.id}>
                  <Rectangle classnaming="bulletpoint-first-rect" />
                  <p>
                    {windowWidth < 768 && el.thesis375
                      ? el.thesis375
                      : windowWidth < 1920
                      ? el.thesis1440
                      : el.thesis}
                  </p>
                </div>
              ))}
            </div>
            <img src={done1TilingIMG} alt="tiling" />
          </div>
          <div className="second-done">
            <Rectangle classnaming="second-top-done-rect" />
            <Rectangle classnaming="second-bottom-done-rect" />
            <img
              src={
                windowWidth < 768
                  ? tablet375IMG
                  : windowWidth < 1024
                  ? tablet768IMG
                  : tabletIMG
              }
              alt="tablet"
              className="tablet"
            />
            <img src={done2RTilingIMG} alt="tiling" className="top-tiling" />
            <img src={done2LTilingIMG} alt="tiling" className="bottom-tiling" />
          </div>
          <div className="third-done">
            <h5>Dark mode too!</h5>
            <Rectangle classnaming="third-left-done-rect" />
            <Rectangle classnaming="third-right-done-rect" />
            <img src={done3TilingIMG} alt="tiling" className="tiling" />
            <img
              src={windowWidth < 1024 ? secondPhone768IMG : secondPhoneIMG}
              alt="phone"
              className="phone"
            />
          </div>
          <div className="fourth-done">
            <Rectangle classnaming="fourth-left-done-rect" />
            <Rectangle classnaming="fourth-right-done-rect" />
            <img src={done4TilingIMG} alt="tiling" />
            <h5>2020</h5>
            <div className="theses">
              {theses2020.map((el) => (
                <div className="thesis" key={el.id}>
                  <Rectangle classnaming="bulletpoint-second-rect" />
                  <p>{windowWidth < 1920 ? el.thesis1440 : el.thesis}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="fifth-done">
            <Rectangle classnaming="fifth-left-done-rect" />
            <Rectangle classnaming="fifth-right-done-rect" />
            <img src={done5TilingIMG} alt="tiling" />
            <h5>Q3 2019</h5>
            <div className="theses">
              {theses2019.map((el) => (
                <div className="thesis" key={el.id}>
                  <Rectangle classnaming="bulletpoint-third-rect" />
                  <p>{windowWidth < 1920 ? el.thesis1440 : el.thesis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="third-block-company">
        <Rectangle classnaming="third-company-rect" />
        <div className="first-achievement">
          <Rectangle classnaming="first-achievement-left" />
          <Rectangle classnaming="first-achievement-right" />
          <img src={plus250TilingIMG} alt="" />
          <p>
            250
            <span>+</span>
          </p>
          <p>Team Members</p>
        </div>
        <div className="second-achievement">
          <Rectangle classnaming="second-achievement-left" />
          <Rectangle classnaming="second-achievement-right" />
          <img src={plus10TilingIMG} alt="tiling" />
          <p>
            10
            <span>+</span>
          </p>
          <p>Nationalities</p>
        </div>
        <div className="third-achievement">
          <Rectangle classnaming="third-achievement-rect" />
          <img src={plus5000SparklesIMG} alt="tiling" />
          <p>
            5000
            <span>+</span>
          </p>
          <p>Businesses</p>
        </div>
        <div className="fourth-achievement">
          <Rectangle classnaming="fourth-achievement-rect" />
          <img src={M500TilingIMG} alt="tiling" />
          <p>
            $500
            <span>M</span>
          </p>
          <p>Transactions</p>
        </div>
      </div>
      <div className="fourth-block-company">
        <Rectangle classnaming="left-top-fourth-company" />
        <Rectangle classnaming="right-top-fourth-company" />
        <Rectangle classnaming="right-bottom-fourth-company" />
        <img src={fourthBLTilingIMG} alt="tiling" className="left-tiling" />
        <img src={fourthBRTilingIMG} alt="tiling" className="right-tiling" />
        <img src={fourthSparklesIMG} alt="sparkles" className="sparkles" />
        <h3>
          Powered by <span>Teamvio</span>
        </h3>
        <div className="imgs-content">
          <div className="top-team">
            <img src={teamTLIMG} alt="workers" className="first-employee" />
            <img src={teamTRIMG} alt="workers" className="second-employee" />
          </div>
          <div className="join-us">
            <Rectangle classnaming="join-us-left" />
            <Rectangle classnaming="join-us-right" />
            <img src={fourthNestedTilingIMG} alt="tiling" />
            <p>
              Up for a challenge?
              {(windowWidth < 1280 && windowWidth > 768) ||
              windowWidth < 768 ? (
                <>
                  <>&nbsp;</>
                  <br />
                </>
              ) : (
                " "
              )}
              We’re always looking for the best
            </p>
            <HeaderButton
              classnaming="nav-button joining"
              buttonname="Join Us"
            />
          </div>
          <div className="bottom-team">
            <img src={teamBRIMG} alt="workers" className="second-employee" />
            <img src={teamBLIMG} alt="workers" className="first-employee" />
          </div>
        </div>
      </div>
      <div className="separator-block-company">
        <Rectangle classnaming="separator-block-375" />
        <div className="separator-content">
          <Rectangle classnaming="left-sep-rect" />
          <Rectangle classnaming="right-sep-rect" />
          <img src={sepBTilingIMG} alt="tiling" className="bot-tiling" />
          <img src={sepTTilingIMG} alt="tiling" className="top-tiling" />
          <h2>Our Core Commitments</h2>
          <div className="commitments">
            <div className="first-commit">
              <img src={penIMG} alt="pen" />
              <p>Every pixel matters</p>
              <p>Biased towards perfection</p>
            </div>
            <div className="second-commit">
              <img src={commentIMG} alt="comment" />
              <p>Shut the fluff</p>
              <p>Clear and direct communication</p>
            </div>
            <div className="third-commit">
              <img src={rocketIMG} alt="rocket" />
              <p>Break things fast</p>
              <p>Ownership with ruthless agility</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sixth-block-company">
        <Rectangle classnaming="sixth-company-rect" />
        <Rectangle classnaming="sixth-company-rect-375" />
        <img src={sixthTilingIMG} alt="tiling" className="tiling" />
        <img src={sixthTilingIMG} alt="tiling" className="tiling-768" />
        <div className="imgs-content">
          <img
            src={windowWidth < 1280 ? tlBuilings1024IMG : tlBuilingsIMG}
            alt="buildings"
            className="tl"
          />
          <img
            src={windowWidth < 1280 ? trBuilings1024IMG : trBuilingsIMG}
            alt="buildings"
            className="tr"
          />
          <img
            src={windowWidth < 1280 ? blBuilings1024IMG : blBuilingsIMG}
            alt="buildings"
            className="bl"
          />
          <img
            src={
              windowWidth < 1024
                ? brBuilings768IMG
                : windowWidth < 1280
                ? brBuilings1024IMG
                : brBuilingsIMG
            }
            alt="buildings"
            className="br"
          />
        </div>
        <div className="text-content">
          <img src={sixthSparklesIMG} alt="sparkles" />
          <h3>
            Global, local, remote.{" "}
            {windowWidth < 1024 && windowWidth > 765 && <>&nbsp;</>}Find the
            perfect role
          </h3>
          <HeaderButton
            classnaming="nav-button roles"
            buttonname="Explore Roles"
          />
        </div>
      </div>
      <div className="seventh-block-company">
        <Rectangle classnaming="left-contact" />
        <Rectangle classnaming="right-contact" />
        <img src={seventhTilingIMG} alt="tiling" />
        <h3>Contact us</h3>
        <div className="block-content">
          <div className="first-contact-block">
            <Rectangle classnaming="nested-1-left-contant" />
            <Rectangle classnaming="nested-1-right-contant" />
            <img src={seventhContact1TilingIMG} alt="tiling" />
            <h4>
              {windowWidth < 1920 ? (
                <>Contact {windowWidth > 768 && <>&nbsp;</>}Support</>
              ) : (
                "Product Support"
              )}
            </h4>
            <p>
              {windowWidth < 1920
                ? "Porta pellentesque leo arcu in massa. Praesent mattis faucibus placerat."
                : "Need help? Live chat with “Team Tinvio” in the app or dashboard"}
            </p>
            <HeaderButton
              classnaming="nav-button help"
              buttonname={windowWidth < 1920 ? "Contact Us" : "Get Help"}
            />
          </div>
          <div className="second-contact-block">
            <Rectangle classnaming="nested-2-left-contant" />
            <Rectangle classnaming="nested-2-right-contant" />
            <img src={seventhContact2TilingIMG} alt="tilings" />
            <h4>Business & {windowWidth > 768 && <>&nbsp;</>}Partnerships</h4>
            <p>
              {windowWidth < 1920
                ? "Porta pellentesque leo arcu in massa. Praesent mattis faucibus placerat. "
                : "Interested in collaborating or partnering with Tinvio?"}
            </p>
            <HeaderButton
              classnaming="nav-button contact"
              buttonname="Contact Us"
            />
          </div>
          <div className="third-contact-block">
            <Rectangle classnaming="nested-3-left-contant" />
            <Rectangle classnaming="nested-3-right-contant" />
            <img src={seventhContact3TilingIMG} alt="tilings" />
            <h4>Media Relations</h4>
            <p>
              {windowWidth < 1920
                ? "Porta pellentesque leo arcu in massa. Praesent mattis faucibus placerat. "
                : "Working on a story? We’re happy to share more about Tinvio"}
            </p>
            <HeaderButton
              classnaming={`nav-button ${
                windowWidth < 1920 && windowWidth > 768 ? "help" : "coffee"
              }`}
              buttonname={windowWidth < 1920 ? "Contact Us" : "Get Coffee"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
