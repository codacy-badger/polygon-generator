module.exports = {
  coordinates: function(sides, sideLength = 1, startingAngle = 0){
    if(sides < 3){
      sides = 3;
    }
    if(sideLength <= 0){
      sideLength = 1;
    }
    let vector = {x: sideLength, y: 0.0};
    vector = rotate(vector, 180-startingAngle);
    let vertices = [];
    let totalAngle = (sides-2)*180;
    let innerAngle = totalAngle/sides;
    vertices.push({x: 0.0, y: 0.0});
    for(let i=0;i<sides-1;i++){
      // add next vector
      vertices.push({x: vertices[i].x+vector.x, y: vertices[i].y+vector.y});
      // rotate for next iteration
      vector = rotate(vector, innerAngle);
      vector.x = Math.round(vector.x * 1000)/1000;
      vector.y = Math.round(vector.y * 1000)/1000;
    }
    // move all vertices into first quadrant
    let minx = 0;
    for(let v of vertices){
      if (minx > v.x){
        minx = v.x;
      }
    }
    let xshift = -1*minx;
    for(let v of vertices){
      v.x = v.x + xshift;
    }

    let miny = 0;
    for(let v of vertices){
      if (miny > v.y){
        minx = v.y;
      }
    }
    let yshift = -1*miny;
    for(let v of vertices){
      v.y = v.y + yshift;
    }
    return vertices;
  }
};

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function rotate(vector, angle) {
  let newX = vector.x*Math.cos(toRadians(180-angle)) - vector.y*Math.sin(toRadians(180-angle));
  let newY = vector.x*Math.sin(toRadians(180-angle)) + vector.y*Math.cos(toRadians(180-angle));
  return {x: newX, y: newY};
}
