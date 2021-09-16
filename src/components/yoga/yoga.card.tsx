import React from 'react';

interface Props{
    id:number,
    name:string,
    content:string,
    last:boolean
}

const Card:React.FC<Props> = props => {
  return (
    <section key={props.name+props.id} id={"yoga"+props.id}>
    <h2>{props.name}</h2>
    <p>{props.content}</p>
    <a href={props.id !== 0?"#yoga"+(props.id-1):"#index"} className="BtnPrev"><i className="fas fa-arrow-up"></i></a>
    <a href={"#yoga"+(props.id+1)} className={props.last?"BtnNext hide":"BtnNext "}><i className="fas fa-arrow-down"></i></a>
  </section>
  );
}

export default Card;
