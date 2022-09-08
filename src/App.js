
import { signal, computed, effect } from "@preact/signals-react";
import { useSignal, useComputed } from "@preact/signals-react";

import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import State from './signals/state';
import Article from './features/article';
import GlobalFeed from "./features/global-feed";


function renderArticle(article) {
  if (!article) return undefined;
  return (
    <article>
        <h2>{article.title}</h2>
        <div>{article.body}</div>
    </article>
  )
}


export default function Home() {
  const {articles} = State.value.home;
  return (
    <div>
      {!articles && <h2>Loading...</h2>}
        
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<GlobalFeed />} /> */}
          
          <Route path="/" element={<GlobalFeed />} />
          <Route path=":slug" element={<Article />} />
          
        </Routes>
      
       </BrowserRouter>
    </div>
  );
}
