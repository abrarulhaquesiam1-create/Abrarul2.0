(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", e => {
    if (glow && e.pointerType !== "touch") {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }
  }, {passive:true});

  // Lightweight Three.js particle field with a subtle 3D depth effect.
  const canvas = document.getElementById("world");
  if (canvas && window.THREE && !reduced) {
    const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 16;
    const count = window.innerWidth < 600 ? 420 : 850;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i=0;i<count;i++) {
      positions[i*3] = (Math.random()-.5)*30;
      positions[i*3+1] = (Math.random()-.5)*19;
      positions[i*3+2] = (Math.random()-.5)*12;
      const t = Math.random();
      colors[i*3] = .25 + t*.3;
      colors[i*3+1] = .48 + t*.35;
      colors[i*3+2] = .95;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions,3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors,3));
    const material = new THREE.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.72, sizeAttenuation:true});
    const particles = new THREE.Points(geometry,material);
    scene.add(particles);
    let mx=0,my=0;
    window.addEventListener("pointermove",e=>{mx=(e.clientX/innerWidth-.5)*.7;my=(e.clientY/innerHeight-.5)*.5},{passive:true});
    function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}
    window.addEventListener("resize",resize);resize();
    let frame=0;
    function animate(){
      frame += .003;
      particles.rotation.y += (mx*.12-particles.rotation.y)*.008;
      particles.rotation.x += (-my*.12-particles.rotation.x)*.008;
      particles.position.y = Math.sin(frame)*.18;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  if (window.gsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".reveal", {y:28,opacity:0,duration:1,stagger:.1,ease:"power3.out",clearProps:"all"});
    gsap.to(".portrait-wrap", {y:-18, ease:"none", scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
    gsap.utils.toArray(".discipline").forEach((el,i)=>{
      gsap.from(el,{x:-35,opacity:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}});
    });
    gsap.from(".closing h2",{y:45,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".closing",start:"top 70%"}});
  }
})();