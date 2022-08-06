// canvas/ctx setup
const canvas = document.querySelector('.c')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

// classes target and particle
class Target {
  constructor(x, y, mass=100, radius=10){
    this.x = x
    this.y = y
    this.mass = mass
    this.r = radius
  }
}
class Particle {
  constructor(x, y, color, vx=0, vy=0, mass=1, radius=5){
    this.alive = true
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.ax = 0
    this.ay = 0
    this.mass = mass
    this.r = radius
    this.color = color
  }
  update(ax, ay){
    let d = distance(this.x, this.y, target.x, target.y)
    if(!this.alive || d > 2000 /*|| d < 25*/){
      this.alive = false
    }
    else{
      this.ax = ax
      this.ay = ay
      this.vx += this.ax
      this.vy += this.ay
      this.x += this.vx
      this.y += this.vy
    }
  }
  draw(){
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    ctx.fill()
  }
}

// setup particles and target
function newRandomParticle(){
  return new Particle(
    Math.random()*window.innerWidth,
    Math.random()*window.innerHeight,
    colors[Math.round(Math.random()*colors.length)],
    Math.random()*10 -5,
    Math.random()*10 -5
  )
}
const target = new Target(canvas.width/2, canvas.height/2)
let particles = []
const nOfParticles = 10
for(let i = 0; i < nOfParticles; i++){
  particles.push(newRandomParticle())
}


//control tariling variable
let trail = false

//self explanatory function
function draw(){
  if(trail){
    ctx.fillStyle = 'white'
    ctx.globalAlpha = 0.01
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
  }
  
  particles = particles.filter(p => p.alive) //drop non alive particles
  
  particles.forEach(p => {
    let a = getAcceleration(p, target)
    p.update(a.x, a.y)
    p.draw()
  })
  if(particles.length < nOfParticles){
    particles.push(newRandomParticle())//always have at least 10 particles
  }

  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)



//event listeners
canvas.addEventListener('click', ()=> {
  particles.push(newRandomParticle())
})
canvas.addEventListener('mousemove', (e)=>{
  target.x = e.clientX
  target.y = e.clientY
})
document.addEventListener('keypress', (e)=>{
  if(e.key == 'c'){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  } else if(e.key == 't'){
    trail = !trail
  }
})