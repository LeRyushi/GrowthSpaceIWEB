// small script for testimonial carousel
document.addEventListener('DOMContentLoaded', ()=>{
  const items = document.querySelectorAll('.testimonial');
  let idx = 0;
  function show(i){
    items.forEach((it, j)=> it.classList.toggle('active', j===i));
  }
  setInterval(()=>{ idx = (idx+1)%items.length; show(idx); }, 3500);
});

// image fallback loader: tries multiple candidate filenames in assets/
const IMAGE_CANDIDATES = {
  'astro-hero': ['astro-1.png','astro_1.png','astro-hero.png','astro1.png','astronaut.png'],
  'astro-services': ['astro-2.png','astro_2.png','astro2.png','astronaut2.png'],
  'astro-reach': ['astro-3.png','astro_3.png','astro3.png','astronaut3.png'],
  'icon-idea': ['icon-idea.png','idea.png'],
  'icon-analysis': ['icon-analysis.png','analysis.png'],
  'icon-audience': ['icon-audience.png','audience.png'],
  'icon-brand': ['icon-brand.png','brand.png']
};

function tryLoad(role, candidates){
  const img = document.querySelector(`img[data-role="${role}"]`);
  if(!img) return;
  let i = 0;
  function attempt(){
    if(i>=candidates.length){
      img.alt = img.alt || role;
      return;
    }
    const path = `assets/${candidates[i]}`;
    const test = new Image();
    test.onload = ()=>{ img.src = path; };
    test.onerror = ()=>{ i++; attempt(); };
    test.src = path;
  }
  attempt();
}

document.addEventListener('DOMContentLoaded', ()=>{
  for(const role in IMAGE_CANDIDATES){
    tryLoad(role, IMAGE_CANDIDATES[role]);
  }
});
