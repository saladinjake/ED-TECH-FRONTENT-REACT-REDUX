import React from "react";
// JSX
import HeroSlider, {
  Slide,
  SideNav,
  ButtonsNav,
  OverlayContainer
} from "hero-slider";
import Wrapper from "../UI/Wrapper/Wrapper";
import Title from "../UI/Title/Title";
import Subtitle from "../UI/Subtitle/Subtitle";

// Images
const rockyWaterfall = "https://i.imgur.com/OE5CoEX.jpg";
const palauPacificOcean = "https://i.imgur.com/8sPDZCg.jpg";
const queposCostaRica = "https://i.imgur.com/cdKGQ0Z.jpg";
const mountainView = "https://i.imgur.com/w4jfAOJ.jpg";

const app = () => {
  return (
    <HeroSlider
      slidingAnimation="fade"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide, nextSlide)
      }
      onChange={nextSlide => console.log("onChange", nextSlide)}
      onAfterChange={nextSlide => console.log("onAfterChange", nextSlide)}
      style={{
        backgroundColor: "#000"
      }}
      settings={{
        slidingDuration: 400,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 8000,
        height: "100vh"
      }}
    >
      <OverlayContainer>
        <Wrapper>
          <Title>Blend Mode Slider</Title>
          <Subtitle>
            Slides' and masks' background blend mode set to luminosity
          </Subtitle>
          <Subtitle>Slides' shouldRenderMask prop set to true</Subtitle>
        </Wrapper>
      </OverlayContainer>

      <Slide
        shouldRenderMask
        navDescription="Rocky Waterfall"
        background={{
          backgroundColor: "#2D7791",
          backgroundBlendMode: "luminosity",
          maskBackgroundBlendMode: "luminosity",
          backgroundImage: rockyWaterfall
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Palau - Pacific Ocean"
        background={{
          backgroundColor: "#8A8A8A",
          backgroundBlendMode: "luminosity",
          maskBackgroundBlendMode: "luminosity",
          backgroundImage: palauPacificOcean
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Quepos - Costa Rica"
        background={{
          backgroundColor: "#EA2329",
          backgroundBlendMode: "luminosity",
          maskBackgroundBlendMode: "luminosity",
          backgroundImage: queposCostaRica
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Mountain View"
        background={{
          backgroundColor: "#6D9B98",
          backgroundBlendMode: "luminosity",
          maskBackgroundBlendMode: "luminosity",
          backgroundImage: mountainView
        }}
      />

      <ButtonsNav />
      <SideNav
        position={{
          top: "0",
          right: "0"
        }}
      />
    </HeroSlider>
  );
};

export default app;
