import React, { Fragment } from 'react';
import {IGallery} from "../../entity/gallery.class";
import Gallery from "./art.gallery"

interface Props{
    gals:Array<IGallery>,
    info:string|undefined,
    setsections:Function
}

const Index:React.FC<Props> = props => {
    props.setsections(
        <Fragment>
          {props.gals.map((gallery,i) => {
            return <Gallery 
            id={i} 
            gal={gallery} 
            last={props.gals.length === i+1?true: false} 
            key={gallery.name+i}/>
          })}
        </Fragment>
      );
  return (
    <Fragment>
        <a href={"#gallery0"} className="BtnNext"><i className="fas fa-arrow-down"></i></a>
        <div className="artIndexInfo">
            <div className="artTitle">
                <h1>Lecointe<br/>Christine</h1>
            </div>
            <div className="artContent">
                <p>{props.info}</p>
            </div>
            
        </div>
        <div className="artLinks">
            {props.gals.map((g,i) => {
                return (<a href={"#gallery"+i} key={"link"+i}>{g.name}</a>);
            })}
        </div>
        
        
    </Fragment>
  );
}

export default Index;
