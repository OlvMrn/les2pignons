// HomePage.jsx
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ArticleCard from "../components/ArticleCard";
import PresentationCard from "../components/PresentationCard";

import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const { latestTravelArticle } = useLoaderData();
  const { latestEventArticle } = useLoaderData();

  const slideFromTop = (element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: -200,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: element,
          start: "top center",
          end: "bottom center",
        },
      }
    );
  };

  const slideFromLeft = (element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -300,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: element,
          start: "top center",
          end: "bottom center",
        },
      }
    );
  };

  const slideFromRight = (element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: +300,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: element,
          start: "top center",
          end: "bottom center",
        },
      }
    );
  };

  useEffect(() => {
    slideFromTop("#panel1");
  }, []);
  useEffect(() => {
    slideFromLeft("#panel2");
  }, []);
  useEffect(() => {
    slideFromRight("#panel3");
  }, []);

  return (
    <div>
      <div id="panel1">
        <PresentationCard />
      </div>
      <div id="panel2">
        <ArticleCard article={latestTravelArticle} id="panel2" />
      </div>
      <div id="panel3">
        <ArticleCard article={latestEventArticle} id="panel3" />
      </div>
      <div className="blank-separator" />
    </div>
  );
}

export default HomePage;
