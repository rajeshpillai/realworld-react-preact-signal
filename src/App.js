
import { signal, computed, effect } from "@preact/signals-react";
import { useSignal, useComputed } from "@preact/signals-react";

import { useState, useEffect } from "react";

const state = signal({});



function renderPost(articles =  []) {
  let ui = <h3>still loading..</h3>;
  ui = articles.map(article => {
    return <li key={article.slug}>{article.title}</li>
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
      const URL = `https://api.realworld.io/api/articles?limit=10&offset=0`;

      const response = await fetch(URL);
      const data = await response.json();
      console.log("FETCH: ", data);
      state.value = data;
      //setArticles(data);
    };
    fetchArticles();
  }, []);

  //console.log("INSIDE: ", articles.value);
  return (
    <div>
        {!state.value["articles"] && <h2>Loading...</h2>}
        
        {JSON.stringify(state.value, null, 2)}

        <h2> {state.value.articlesCount} </h2>

        <ul>
          {
            renderPost(state.value.articles)
          }
      </ul>
      

    </div>
  );
}
