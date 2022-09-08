import { Outlet } from "react-router-dom";
import {useEffect} from 'react';
import { Link } from "react-router-dom";

import State from '../signals/state';

const API_URL = "https://api.realworld.io/api/";

export default function GlobalFeed() {
  const {articles} = State.value.home;

  useEffect(() => {
    const fetchArticles = async () => {
      const URL = `${API_URL}articles?limit=10&offset=0`;

      const response = await fetch(URL);
      const data = await response.json();
      console.log("FETCH: ", data);
      const updates = {
        home: data,
        article: undefined
      }
      State.value = updates;

      console.log("INSIDE: ", State.value.home);

    };
    fetchArticles();
  }, []);

  function renderPost(articles =  []) {
    let ui = <h3>still loading..</h3>;
    ui = articles.map(article => {
      return <li key={article.slug}>
        <Link
              to={`${article.slug}`}
              key={article.slug}
            >
              {article.title}
          </Link>
      </li>
    })  
  
      
    console.log("UI: ", ui);
    return ui;
  }

  return (
    <>
      <h2>Global Feed</h2>

      <ul>
            {
              renderPost(articles)
            }
        </ul>

      <Outlet/>

    </>
  )
}