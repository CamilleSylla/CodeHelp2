import React, { Suspense } from "react";
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
      <section id="container_banner">
        <article id="content_banner">
          <h1 className="super_title">Iconic<br/>Dev</h1>
            <h2 className="medium_bold_title">
              Marquez internet de votre empreinte!
            </h2>
            <p className="subtitle">
              Parce-que vous ne voulez plus de sites monotone...
            </p>
            </article>
          <div id="social_banner">
            <section id="social_pisitioning_banner">
              <div className="social_banner_btn">
                <img src={Insta} alt="Facebook"/>
                <a href="#">@iconicdev.id</a>
              </div>
              <div className="social_banner_btn">
              <img src={Facebook} alt="Facebook"/>
                <a href="#">@iconicdev</a>
              </div>
            </section>
          
        </div>
      </section>
    </header>
    
  );
}
