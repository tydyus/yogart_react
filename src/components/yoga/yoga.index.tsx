import React, { Fragment } from 'react';
import {IYoga} from "../../entity/gallery.class";
import Card from "./yoga.card";

interface Props{
  info:string|undefined,
  ficheYoga:Array<IYoga>,
  setsections:Function
}

const Index:React.FC<Props> = props => {
  props.setsections(
    <Fragment>
      {props.ficheYoga.map((fiche,i)=>{return <Card key={i+fiche.titre} id={i} name={fiche.titre} content={fiche.description} last={false} />})}
    </Fragment>
  )
  return (
    <Fragment>
        <a href={"#yoga0"} className="BtnNext"><i className="fas fa-arrow-down"></i></a>
    </Fragment>
  );
}

export default Index;
