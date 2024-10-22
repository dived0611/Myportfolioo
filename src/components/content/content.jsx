import { useEffect, useState } from 'react';
import './content.css';
export default function Content() {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Set the height of the element to 3 times the screen height
    const element = document.getElementById('yourElementId');
    if (element) {
      element.style.height = `${screenHeight * 3 - 100}px`;
    }

  }, [screenHeight]);

  return (
    <div  id='smooth-wrapper'>
                
             
      <div id="yourElementId" className="container">

        <header style={{ height: `${screenHeight - 0}px` }}>
        <h1 className='Guardian'> Hey, I m hamza El hassnaoui </h1>
        <p>Je m'appelle Hamza EL HASSNAOUI et je vis à Lotissement Ain Ati 01, N° 19, Errachidia (52000). Vous pouvez me joindre au 065551*** ou par email à <a className='Gmail' href="mailto:Hamzaelhassnaoui@gmail.com">Hamzaelhassnaoui@gmail.com</a>. Actuellement, je poursuis un Technicien Spécialisé en Développement Digital, Option Full-Stack à l'Institut Spécialisé de Technologie Appliquée Mohamed El Fassi, Errachidia, avec une date de graduation prévue pour juin 2025. Auparavant, j'ai obtenu mon Baccalauréat Scientifique, Option Sciences Physiques au Lycée Sijilmassa, Errachidia, en juin 2023.</p>

        </header>

      <aside style={{ height: `${screenHeight +  400  }px` }}>
      <div className="card">
        <h2>Frontend Development</h2>
        <p>Proficient in HTML, CSS, JavaScript, React.js, and Three.js,laravel,jQuery,Gsap,Mention,PHP, Experienced in building responsive, user-friendly interfaces and implementing dynamic animations for engaging user experiences.</p>
      </div>
<div className="card">
    <h2>Backend Development</h2>
    <p>Skilled in PHP, Laravel, MySQL, MongoDB, and Node.js.  secure</p>
</div>
<div className="card">
    <h2>UI/UX Design</h2>
    <p>Focused on creating intuitive, aesthetically pleasing interfaces. Skilled in using design tools and frameworks like Bootstrap,Tailwind and Motion to enhance user interaction and satisfaction.</p>
</div>
<div className="card">
    <h2>Project Management</h2>
    <p>Proficient in using tools like Gantt charts,  and GitHub for version control and collaboration.</p>
</div>

      </aside>



        <footer style={{ height: `${screenHeight - 400 }px ` }}>
          <h1 style={{textAlign: 'center'}}>Check out my socials</h1>
    <br /><br />

          <div>
              <a href="https://github.com/dived0611"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" /></a>
              <a href="https://www.instagram.com/hamza_elhas_s/?__pwa=1"><img className='github' src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="" /></a>
          </div>

        </footer>

      </div>
    </div>
  );
} 
