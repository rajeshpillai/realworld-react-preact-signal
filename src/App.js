import { signal, computed, effect } from "@preact/signals-react";
import { useSignal, useComputed } from "@preact/signals-react";

import { useState, useEffect } from "react";

//const articles = signal([]);

export default function Home() {
  const state = useSignal(undefined);
  const [_, refresh] = useState();
  effect(() => {
    console.log("value changed..", state.value);
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const URL = `https://api.realworld.io/api/articles?limit=10&offset=0`;

      const response = await fetch(URL);
      const data = await response.json();
      console.log("FETCH: ", data);
      state.value = data;
    };
    fetchArticles();
  }, []);

  //console.log("INSIDE: ", articles.value);
  return (
    <div>
      <ul>
        {!state.value && <h2>Loading...</h2>}
        {state.value &&
          state.value.articles.map((article, index) => {
            return <li>{article.title}</li>;
          })}
      </ul>
    </div>
  );
}
