import React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";
import Header from '../components/header/Header'
import AIChatWidget from './AIChatWidget'

export default function Layout({ children }) {
  const location = useLocation();


  const hideHeaderPaths = ["/login"];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <div className="antialiased">{children}</div>
      <AIChatWidget />
    </>
  );
}
