import React from "react";

import dbIMG from "../../assets/public.avif";
import "./Home.scss";

export default function Home() {
  return (
    <main>
      <div className="home-content-block">
        <h3>Welcome to Northwind Traders</h3>
        <p>
          Running on{" "}
          <a href="https://workers.cloudflare.com/"> Cloudflare's D1 </a>
        </p>
        <img src={dbIMG} alt="database" />
        <p>
          This is a demo of the Northwind dataset, running on Cloudflare
          Workers, and D1 - Cloudflare's newest SQL database, running on SQLite.
        </p>
        <br />
        <p>
          Read our{" "}
          <a href="https://blog.cloudflare.com/introducing-d1">
            {" "}
            D1 announcement{" "}
          </a>
          to learn more about D1.
        </p>
        <br />
        <p>
          This dataset was sourced from{" "}
          <a href="https://github.com/jpwhite3/northwind-SQLite3">
            northwind-SQLite3
          </a>
          .
        </p>
        <br />
        <p>
          You can use the UI to explore Supplies, Orders, Customers, Employees
          and Products, or you can use search if you know what you're looking
          for.
        </p>
      </div>
    </main>
  );
}
