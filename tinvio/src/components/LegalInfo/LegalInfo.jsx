import React, { useEffect } from "react";
import "./LegalInfo.scss";
import { privacyPolicy, termsOfService } from "./legalInfoContent";

export default function LegalInfo({
  windowWidth,
  setSettings,
  infoValue,
  setInfoValue,
}) {
  useEffect(() => {
    setSettings("info");

    return () => {
      setSettings("");
    };
  }, [setSettings]);

  return (
    <main>
      <div className="info-contant">
        <h2>Tinvio Legal Info</h2>
        <div
          className={`info ${
            infoValue === "PrivacyPolicy" ? "policy" : "service"
          }`}
        >
          <div onClick={() => setInfoValue("PrivacyPolicy")}>
            <p>Privacy Policy</p>
            <hr />
          </div>
          <div onClick={() => setInfoValue("TermsOfService")}>
            <p>Terms of Service</p>
            <hr />
          </div>
        </div>
        <div className="text">
          {infoValue === "PrivacyPolicy"
            ? privacyPolicy.map((el) => {
                const objKeys = Object.keys(el);
                const hasClosingParagraph = objKeys.includes("paragraphEnd");
                const hasBulletPoins = objKeys.includes("bulletPoints");
                const hasHeader = objKeys.includes("header");

                if (hasClosingParagraph) {
                  return (
                    <div>
                      <h4>{el.header}</h4>
                      <p>{el.paragraph}</p>
                      <ul className="use">
                        {el.bulletPoints.map((nestedEl) => (
                          <li key={nestedEl.id}>
                            <span>{nestedEl.bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <p>{el.paragraphEnd}</p>
                    </div>
                  );
                }
                if (hasBulletPoins) {
                  return (
                    <div>
                      <h4>{el.header}</h4>
                      <p>{el.paragraph}</p>
                      <ul className="collect">
                        {el.bulletPoints.map((nestedEl) => (
                          <li key={nestedEl.id}>
                            <span>{nestedEl.bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                if (hasHeader) {
                  if (typeof el.paragraph === "function") {
                    const addLineBreaker = windowWidth < 1920 ? true : false;
                    return (
                      <div>
                        <h4>{el.header}</h4>
                        <p>{el.paragraph(addLineBreaker)}</p>
                      </div>
                    );
                  }
                  return (
                    <div>
                      <h4>{el.header}</h4>
                      <p>{el.paragraph}</p>
                    </div>
                  );
                }
                return (
                  <div>
                    <p>{el.paragraph}</p>
                  </div>
                );
              })
            : termsOfService.map((el) => {
                const hasHeader = Object.keys(el).includes("header");

                return hasHeader ? (
                  <div>
                    <h4>{el.header}</h4>
                    <p>{el.paragraph}</p>
                  </div>
                ) : (
                  <div>
                    <p>{el.paragraph}</p>
                  </div>
                );
              })}
        </div>
      </div>
    </main>
  );
}
