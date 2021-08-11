import React from "react";
// JSX
import HeroSlider, { Slide, Nav, OverlayContainer } from "hero-slider";
import Wrapper from "../UI/Wrapper/Wrapper";
import Title from "../UI/Title/Title";
import Subtitle from "../UI/Subtitle/Subtitle";

// Images
// const bogliasco = "https://cdn5.vectorstock.com/i/1000x1000/54/59/man-and-woman-at-isometric-classroom-online-study-vector-25885459.jpg";
const countyClare =
  "https://cdn2.vectorstock.com/i/1000x1000/54/46/isometric-online-learning-or-distance-courses-vector-23935446.jpg";
const craterRock =
  "https://assets.materialup.com/uploads/2fa94701-ed35-4a76-9e72-b7593d46bf5b/preview.jpg";
const giauPass =
  "https://img.graphicsurf.com/2020/06/Banner-e-learning-concept-vector-design.jpg";

const app = () => {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log("onChange", nextSlide)}
      onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
      style={{}}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: "100vh",
      }}
    >
      <OverlayContainer>
        <Wrapper>
          <Title></Title>
          <Subtitle></Subtitle>
        </Wrapper>
      </OverlayContainer>

      <Slide
        background={{
          backgroundImage: giauPass,

          backgroundPosition: "center center",
        }}
      />

      <Slide
        background={{
          backgroundImage: countyClare,

          backgroundPosition: "center center",
        }}
      />

      <Slide
        background={{
          backgroundImage: craterRock,

          backgroundPosition: "center center",
        }}
      />

      <Nav />
    </HeroSlider>
  );
};

export default app;
