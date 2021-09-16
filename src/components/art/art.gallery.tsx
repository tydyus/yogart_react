import React from 'react';
import {IGallery} from "../../entity/gallery.class";

interface Props{
    id:number,
    last:boolean
    gal:IGallery
}

const slider = (direction:"left"|"right", classPaint:string) => {
    const paints = Array.from(document.getElementsByClassName(classPaint)) as Array<HTMLElement>;
    paints.sort((a,b)=> +a.style.order - +b.style.order)
    direction === "right"
    && (paints[paints.length-1].style.order = (+paints[0].style.order - 1).toString());
    direction === "left"
    && (paints[0].style.order = (+paints[paints.length-1].style.order + 1).toString());
}

const zoom = (id:string, img:string) => {
    const zoomZone = document.getElementById(id) as HTMLElement;
    zoomZone.style.background = `url("${img}"),rgba(0, 0, 0, 0.507)`;
    zoomZone.style.backgroundSize = "contain";
    zoomZone.style.backgroundRepeat="no-repeat";
    zoomZone.style.backgroundPosition="center";
    zoomZone.classList.remove("hide")
}
const hide = (id:string) => {
    (document.getElementById(id) as HTMLElement).classList.add("hide")
}

const Gallery:React.FC<Props> = props => {
  return (
    
    <section key={"keyGallery"+props.id} className="gallerySection" id={"gallery"+props.id} style={{background: `url("${props.gal.image}")`,backgroundSize: "cover"}}>
        <div className="galleryTxt">
            <h2 className="galleryTitle">{props.gal.name}</h2>
            <p className="galleryContent">{props.gal.content}</p>
        </div>
        
        <div  className="zoomPicGallery hide" id={"zoomPicGallery"+props.id}>
            <p onClick={()=>{hide("zoomPicGallery"+props.id)}}>✖</p>
        </div>
        <div className="gallery">
            <div className="galleryPrev BtngalInter" onClick={()=>{slider("left","paintGallery"+props.id)}}><i className="fas fa-caret-left"></i></div>
            <div className="galleryNext BtngalInter" onClick={()=>{slider("right","paintGallery"+props.id)}}><i className="fas fa-caret-right"></i></div>
            <div className="slider">
            {props.gal.paints.map((paint,i) =>{
                return <div 
                    key={props.id+"paint"+i} 
                    style={{background: `url("${paint.image}")`,backgroundSize: "contain",order:i,backgroundRepeat:"no-repeat",backgroundPosition:"center"}} 
                    className={"paintGallery paintGallery"+props.id}
                    onClick={()=>{zoom("zoomPicGallery"+props.id,paint.image)}}>
                </div>
            })}
            {props.gal.paints.length % 2 !== 1 && <div className={"paintGallery"+props.id} style={{order:props.gal.paints.length}}></div>}
            </div>
            
        </div>

        <a href={props.id !== 0?"#gallery"+(props.id-1):"#index"} className="BtnPrev"><i className="fas fa-arrow-up"></i></a>
        <a href={"#gallery"+(props.id+1)} className={props.last?"BtnNext hide":"BtnNext "}><i className="fas fa-arrow-down"></i></a>
    </section>
  );
}

export default Gallery;
