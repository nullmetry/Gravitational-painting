const G = 10
function distance(x1, y1, x2, y2){
  return ((x1-x2)**2 + (y1-y2)**2)**.5
}

function getGForce(body1, body2){
  let d = distance(body1.x, body1.y, body2.x, body2.y)
  return G*(body1.mass * body2.mass)/d**2
}

function getAngle(body1, body2){
  let y = body2.y-body1.y // dy
  let x = body2.x-body1.x // dx
  return Math.atan2(y, x)
}

function getAcceleration(particle, target){
  let x = getGForce(particle, target)*Math.cos(getAngle(particle, target))
  let y = getGForce(particle, target)*Math.sin(getAngle(particle, target))
  return {x, y}
}

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
  '#808080',
  '#FA8072',
  '#FFA500',
  '#9ACD32',
  '#00FA9A',
  '#7FFFD4',
  '#8A2BE2',
  '#EE82EE',
  '#FF69B4',
  '#FFFACD',
  '#000000',
  '#8B4513',
  '#6A5ACD',
  '#00FF7F'
]