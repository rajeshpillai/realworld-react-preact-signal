
import { signal, computed, effect } from "@preact/signals-react";
import { useSignal, useComputed } from "@preact/signals-react";

import { useState, useEffect } from "react";

import Article from './features/article';

const state = signal({
  home:[],
  article:undefined,
});

const API_URL = "https://api.realworld.io/api/";


const showArticle = (slug, e) => {
  e.preventDefault();

  const fetchArticle = async () => {
    const URL = `${API_URL}articles/${slug}`;

    const response = await fetch(URL);
    const data = await response.json();

    const updates = {
      home: {...state.value.home},
      article: data.article
    }
    state.value = updates;
    
  };

  fetchArticle();
}

function renderArticle(article) {
  if (!article) return undefined;
  return (
    <article>
        <h2>{article.title}</h2>
        <div>{article.body}</div>
    </article>
  )
}

function renderPost(articles =  []) {
  let ui = <h3>still loading..</h3>;
  ui = articles.map(article => {
    return <li key={article.slug}>
      <a onClick={showArticle.bind(null, article.slug)} href={`${API_URL}${article.title}`}>{article.title}</a> 
    </li>
  })  

    
  console.log("UI: ", ui);
  return ui;
}

export default function Home() {
  // const [state, setArticles] = useState();
  // effect(() => {
  //   console.log("value changed..", state.value?.articles);
  // });

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
      state.value = updates;

      console.log("INSIDE: ", state.value.home);

    };
    fetchArticles();
  }, []);

  const {articles} = state.value.home;
  return (
    <div>
      {!articles && <h2>Loading...</h2>}
        
      <h2>Global Articles</h2>

     <ul>
        {
          renderPost(articles)
        }
    </ul>
     {renderArticle(state.value.article)} 

    </div>
  );
}
