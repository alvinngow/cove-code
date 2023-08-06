import React, { useEffect, useState } from "react";

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
      <a
        className={`default-link card-link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={() => onClick(href)}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  async function fetchData() {
    //Modified the useEffect to fetch data using a separate async function for better readability and maintainability.
    try {
      //Used try-catch block for error handling during data fetching.
      const response = await fetch(
        "https://my-json-server.typicode.com/savayer/demo/posts"
      );
      const data = await response.json();

      const newData = data.map((item) => ({
        id: item.id,
        title: item.title.en,
        linkTitle: item.link_title,
        link: item.link,
        text: item.body.en.substr(0, 50) + "...",
      }));

      setCards(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    // Sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map(
        (
          item //Used the map method to transform the data from the API response into the desired format for the cards state.
        ) => (
          <Card
            key={item.id} // Added a unique key prop to each Card element
            title={item.title}
            linkTitle={item.linkTitle}
            href={item.link}
            text={item.text}
            linkClassName={item.id === 1 ? "card-link--red" : ""}
            onClick={analyticsTrackClick}
          />
        )
      )}
    </div>
  );
}
