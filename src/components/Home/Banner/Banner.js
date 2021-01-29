import React from "react";
import "../../../Styles/Home/Banner/Banner.scss";
import SceneBanner from "./Scene_banner";
export default function Banner() {
  return (
    <header id="home_banner">
      <div id="container_banner">
        <div id="scene_banner">
          <h1 className="super_title">IconicDev</h1>
          <SceneBanner/>
        </div>
        <div id="content_banner">
          <div id="action_banner">
            <h2 className="medium_bold_title">
              Marquez internet de votre empreinte!
            </h2>
            <p className="subtitle">
              Parce-que vous ne voulez plus de site monotone...
            </p>
            <button>Entrevue</button>
          </div>

          <div id="social_banner">
            <div id="social_pisitioning_banner">
              <div>
                <a href="#">@iconicdev.id</a>
              </div>
              <div>
                <a href="#">@iconicdev</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
