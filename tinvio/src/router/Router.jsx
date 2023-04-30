import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import RootLayout from "../components/RootLayout/RootLayout";
import Features from "../components/Features/Features";
import Company from "../components/Company/Company";
import LegalInfo from "../components/LegalInfo/LegalInfo";

const setRouter = ({
  windowWidth,
  isMainShown,
  setIsMainShown,
  settings,
  setSettings,
  isShownOverlay,
  setIsShownOverlay,
  infoValue,
  setInfoValue,
}) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          windowWidth={windowWidth}
          isMainShown={isMainShown}
          hamHandler={() => setIsMainShown((isMainShown) => !isMainShown)}
          settings={settings}
          setIsShownOverlay={setIsShownOverlay}
          isShownOverlay={isShownOverlay}
          setInfoValue={setInfoValue}
        />
      ),
      children: [
        {
          path: "home",
          element: <Home windowWidth={windowWidth} setSettings={setSettings} />,
        },
        {
          path: "features",
          element: (
            <Features
              windowWidth={windowWidth}
              setIsShownOverlay={setIsShownOverlay}
              setSettings={setSettings}
            />
          ),
        },
        {
          path: "company",
          element: (
            <Company windowWidth={windowWidth} setSettings={setSettings} />
          ),
        },
        {
          path: "info",
          element: (
            <LegalInfo
              windowWidth={windowWidth}
              setSettings={setSettings}
              infoValue={infoValue}
              setInfoValue={setInfoValue}
            />
          ),
        },
      ],
    },
  ]);

export default setRouter;
