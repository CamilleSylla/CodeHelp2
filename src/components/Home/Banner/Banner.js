import React from "react";
import "../../../Styles/Home/Banner/Banner.scss";
import SceneBanner from "./Scene_banner";
import SceneEarthBanner from "./SceneBackground";
import Facebook from '../../../assets/icons/social/facebook.svg'
import Insta from '../../../assets/icons/social/insta.svg'
export default function Banner() {
  return (
    <header id="home_banner">
        <SceneEarthBanner/>
        <SceneBanner/>
      <div id="container_banner">
        <div id="content_banner">
          <h1 className="super_title">Iconic<br/>Dev</h1>
            <h2 className="medium_bold_title">
              Marquez internet de votre empreinte!
            </h2>
            <p className="subtitle">
              Parce-que vous ne voulez plus de sites monotone...
            </p>
            </div>
          <div id="social_banner">
            <div id="social_pisitioning_banner">
              <div className="social_banner_btn">
                <img src={Insta} alt="Facebook"/>
                <a href="#">@iconicdev.id</a>
              </div>
              <div className="social_banner_btn">
              <img src={Facebook} alt="Facebook"/>
                <a href="#">@iconicdev</a>
              </div>
            </div>
          
        </div>
      </div>
    </header>
  );
}
