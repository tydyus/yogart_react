export const leftMove = () => {
    const index = document.getElementsByClassName("indexPage")[0] as HTMLElement;
    const left = document.getElementsByClassName("indexMovLeft")[0] as HTMLElement;
    const right = document.getElementsByClassName("indexMovRight")[0] as HTMLElement;
    const card = document.getElementsByClassName("cardId")[0] as HTMLElement;
    const root = document.getElementById("root") as HTMLElement;
      if(!left.classList.contains("done")){
          left.classList.add("done");
          left.classList.add("hide");
          right.classList.add("done");
          card.classList.add("done");
          index.classList.remove("right");
          index.classList.add("left");
          root.style.overflowY = "hidden";
      } else {
          left.classList.remove("done");
          left.classList.remove("hide");
          right.classList.remove("hide");
          right.classList.remove("done");
          card.classList.remove("done");
          index.classList.remove("right");
          index.classList.remove("left");
          root.style.overflowY = "auto"
      }
  }
export const rightMove = () => {
    const index = document.getElementsByClassName("indexPage")[0] as HTMLElement;
    const left = document.getElementsByClassName("indexMovLeft")[0] as HTMLElement;
    const right = document.getElementsByClassName("indexMovRight")[0] as HTMLElement;
    const card = document.getElementsByClassName("cardId")[0] as HTMLElement;
    const root = document.getElementById("root") as HTMLElement;
      if(!left.classList.contains("done")){
          left.classList.add("done");
          right.classList.add("done");
          right.classList.add("hide");
          card.classList.add("done");
          index.classList.remove("left");
          index.classList.add("right");
          root.style.overflowY = "hidden";
      } else {
          left.classList.remove("done");
          right.classList.remove("done");
          right.classList.remove("hide");
          left.classList.remove("hide");
          card.classList.remove("done");
          index.classList.remove("right");
          index.classList.remove("left");
          root.style.overflowY = "auto"
      }
  }