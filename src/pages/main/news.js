import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/news.css"

const News = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        console.log("fetching news..");
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?apiKey=a7c2d24902d34476b496ebe475ccebd1&country=us"
        );
        setArticles(response.data.articles);
        const artictest=articles.map((article)=>article.title)
        console.log("Fetched!", artictest);
      } catch (error) {
        // alert(error);
      }
    };
    fetchNewsData();
  }, []);
  return (
    <div className="newsContainer">
      {articles.map((article) => (
        <div key={article.url}>
          <h2>{article.title}</h2>
          <img src={article.urlToImage} alt={article.title} />
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default News;
