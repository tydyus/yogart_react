import React, { Fragment, useState } from 'react';
import {leftMove, rightMove} from "./functions/moveInIndex";
import {Gallery as EGallery, IGallery, IYoga} from "./entity/gallery.class";
import ArtId from "./components/art/art.index";
import YogaId from "./components/yoga/yoga.index";

let gallerys:Array<IGallery> = [];
let info = {id:0,description_art:"",description_yoga:"",description_index:""};
let ficheYoga:Array<IYoga> = [];
EGallery.getGallerys().then(data => {
  gallerys = data.g;
  info = data.info;
  ficheYoga = data.fiche_yoga!==undefined? data.fiche_yoga : ficheYoga;
})

function App() {
  const [sections, setsections] = useState(<Fragment></Fragment>);
  const [page, setpage] = useState("index");
  const [artIndex, setartIndex] = useState(<Fragment></Fragment>);
  const [yogaIndex, setyogaIndex] = useState(<Fragment></Fragment>);
  const [infoIndex, setinfoIndex] = useState(info.description_index);
  const art = () => {
    setpage("art");
    setartIndex(<ArtId gals={gallerys} info={info.description_art} setsections={setsections}/>);
    setyogaIndex(<Fragment></Fragment>);
  }
  const index = () => {
    setpage("index")
    setsections(<Fragment></Fragment>);
    setyogaIndex(<Fragment></Fragment>);
    setartIndex(<Fragment></Fragment>);
  }
  const yoga = () => {
    setyogaIndex(<YogaId info={info?.description_yoga} ficheYoga={ficheYoga} setsections={setsections}/>);
    setartIndex(<Fragment></Fragment>);
    setpage("yoga")
  }
  const initArt = ()=>{
    rightMove();
    page === "yoga" ? index():art();
  }
  const initYoga = ()=>{
    leftMove();
    page === "art" ? index():yoga();
  }
  const infoOnCard = () =>{
    const el = document.getElementsByClassName("cardIdInfo")[0] as HTMLElement
    el.classList.contains("activ")?
    el.classList.remove("activ"):
    el.classList.add("activ");
    setinfoIndex(info.description_index);
  }
  return (
      <Fragment>
        <span className="indexMovLeft" onClick={initYoga}></span>
        <span className="indexMovRight" onClick={initArt}></span>
        <div className="cardId">
            <i className="fas fa-chevron-left" onClick={initYoga}></i>
            <i className="fas fa-chevron-left" onClick={initYoga}></i>
            <div>
              <h1 onClick={infoOnCard}>Lecointe<br/>Christine</h1>
              <p className="cardIdInfo" onClick={infoOnCard}>
                {infoIndex}
              </p>
            </div>
            
            <i className="fas fa-chevron-right" onClick={initArt}></i>
            <i className="fas fa-chevron-right" onClick={initArt}></i>
            
        </div>
        <div className="snapWrapper">
          <section className="indexPage" id="index">
              <span className="indexYoga" >
                {yogaIndex}
              </span>
              <span className="indexArt" >
                {artIndex}
              </span>
          </section>
          {sections}
        </div>
      </Fragment>
  );
}

export default App;
