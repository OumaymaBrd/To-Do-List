let newX=0 , newY=0, startX=0, startY=0;
const card=document.getElementById('card');
card.addEventListener('mousedown',mouseDown);
function mouseDown(e){
    startX=e.clientX;
    startY=e.clientY;
document.addEventListener('mousemove',mouMove)
document.addEventListener('mouseup',mouseUp)

}
function mouseMove(e){
    newX=startX-e.clientX
    newX=startY-e.clientY

    startX=e.clientX
    startY=e.clientY

    card.stylee.top=startY+'px'
    card.style.left=startX+'px'
    console.log({newX,newY})
    console.log({startX,startY})
}
