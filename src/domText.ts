export const domText = (text: string, { x, y }: { x: number; y: number }) => {
  // Adding Text in threejs Canvas
  var text2 = document.createElement("div");
  text2.style.position = "absolute";
  //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  text2.style.width = "100px";
  text2.style.height = "100px";
  text2.style.backgroundColor = "blue";
  text2.innerHTML = text;
  text2.style.top = x + "px";
  text2.style.left = y + "px";
  document.body.appendChild(text2);
};
