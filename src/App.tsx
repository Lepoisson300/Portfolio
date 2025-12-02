import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Download, Github, Linkedin, ChevronDown, Eye, FileText } from 'lucide-react';

// --- COMPOSANT MATRIX RAIN ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    // Initialisation des gouttes
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Fond semi-transparent pour l'effet de traînée
      // On utilise la couleur de fond du site (#0f1012) avec une opacité très faible
      ctx.fillStyle = 'rgba(15, 16, 18, 0.05)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#3b82f6'; // Bleu matrix (assorti au site)
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Aléatoire 0 ou 1
        const text = Math.random() > 0.5 ? '0' : '1'; 
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset aléatoire de la goutte quand elle dépasse l'écran
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20"
    />
  );
};

export default function App() {
  type Lang = 'en' | 'fr';

  interface Project {
    title: string;
    desc: string;
    link: string;
    tags: string[];
    img: string;
    img1?: string;
    img2?: string;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en'); // 'en' or 'fr'
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Project modal state

  // --- CONTENU / TRADUCTIONS ---
  const content = {
    en: {
      menu: { home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact' },
      hero: {
        subtitle: "Here begins innovation",
        phrases: [
          "Here begins innovation",
          "I build AI Solutions",
          "I create Video Games",
          "I develop Robust Software"
        ],
        viewWork: "View My Work",
        contactMe: "Contact Me",
      },
      about: {
        badge: "WHO AM I ?",
        title1: "Musician, Worker,",
        title2: "Athlete & Adventurer",
        desc: "Passionate about creating systems that matter. My journey blends technical expertise with a creative mindset, allowing me to approach problems from unique angles. I thrive in challenging environments where innovation is key.",
        cv: "/assets",
        activities: "Activities"
      },
      projects: {
        badge: "PORTFOLIO",
        title: "Selected Projects",
        desc: "A deep dive into my technical journey, featuring robotics, game development, and complex software architectures."
      },
      contact: {
        title: "Let's Work Together",
        desc: "I'm currently available for freelance work or full-time positions. If you have a project that needs a creative touch, get in touch.",
        email: "Email Me",
        linkedin: "LinkedIn",
        locTitle: "Location",
        phoneTitle: "Phone",
        cvFr: "CV Français",
        cvEn: "CV English"
      },
      modal: {
        viewPdf: "View Full Project (PDF)",
        close: "Close"
      }
    },
    fr: {
      menu: { home: 'Accueil', about: 'À Propos', projects: 'Projets', contact: 'Contact' },
      hero: {
        subtitle: "Ici commence l'innovation",
        phrases: [
          "Ici commence l'innovation",
          "Je conçois des I.A.",
          "Je crée des Jeux Vidéo",
          "Je développe des Logiciels"
        ],
        viewWork: "Voir mes projets",
        contactMe: "Me contacter",
      },
      about: {
        badge: "QUI SUIS-JE ?",
        title1: "Musicien, Travailleur,",
        title2: "Athlète & Aventurier",
        desc: "Passionné par la création de systèmes impactants. Mon parcours mêle expertise technique et esprit créatif, me permettant d'aborder les problèmes sous des angles uniques. Je m'épanouis dans les environnements stimulants où l'innovation est clé.",
        cv: "CV / Parcours",
        activities: "Activités"
      },
      projects: {
        badge: "PORTFOLIO",
        title: "Projets Sélectionnés",
        desc: "Une plongée dans mon parcours technique, incluant la robotique, le développement de jeux et les architectures logicielles complexes."
      },
      contact: {
        title: "Travaillons Ensemble",
        desc: "Je suis actuellement disponible pour des missions freelance ou des postes à temps plein. Si vous avez un projet qui nécessite une touche créative, contactez-moi.",
        email: "M'écrire",
        linkedin: "LinkedIn",
        locTitle: "Localisation",
        phoneTitle: "Téléphone",
        cvFr: "CV Français",
        cvEn: "CV Anglais"
      },
      modal: {
        viewPdf: "Voir le projet complet (PDF)",
        close: "Fermer"
      }
    }
  };

  const t = content[lang]; // Contenu actuel

  // --- LOGIQUE TYPEWRITER (Machine à écrire) ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Reset typewriter quand la langue change
  useEffect(() => {
    setText('');
    setLoopNum(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const handleType = () => {
      const phrases = t.hero.phrases;
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, t.hero.phrases, typingSpeed]);

  // --- NAVIGATION ---
  const scrollToSection = (id: string): void => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- DATA PROJETS (DYNAMIQUE) ---
  const projects = [
    { 
      title: lang === 'en' ? "AI Creation Project" : "Projet I.A.", 
      desc: lang === 'en' ? "Implementation of a strategic board game AI using Minimax algorithms." : "Implémentation d'une I.A. de jeu de plateau stratégique utilisant l'algorithme Minimax.", 
      link: "/pdf/Towa.pdf",
      tags: ["Java"],
      img: "/towa_6.png",
      img1:"" ,
      img2: ""
    },
    { 
      title: lang === 'en' ? "Robotics Project" : "Projet Robotique", 
      desc: lang === 'en' ? "Design and C++ programming of an autonomous mobile robot." : "Conception et programmation C++ d'un robot mobile autonome.", 
      link: "/pdf/Robotique.pdf",
      tags: ["C++", "Arduino", "Fusion360"],
      img: "/guido.png",
      img1: "/fusion360.png",
      img2: "/lidar.jpg"
    },
    { 
      title: lang === 'en' ? "Video Game Project" : "Projet Jeu Vidéo", 
      desc: lang === 'en' ? "Full cycle creation and publication of a 3D game with Unreal Engine." : "Création complète et publication d'un jeu 3D avec Unreal Engine.", 
      link: "/pdf/UE.pdf",
      tags: ["Unreal Engine", "C++", "Blueprints"],
      img: "/UE.png",
      img1: "/halo.jpeg" ,
      img2: "/blueprint.jpeg"
    },
    { 
      title: lang === 'en' ? "R/place Project" : "Projet R/place", 
      desc: lang === 'en' ? "Complex API usage to recreate the social experiment Reddit's R/place." : "Utilisation d'API complexe pour recréer l'expérience sociale Reddit R/place.", 
      link: "/pdf/Rplace.pdf",
      tags: ["API", "React", "Node.js"],
      img: "/pixelWar.png"
    },
    { 
      title: lang === 'en' ? "Application Project" : "Projet Application", 
      desc: lang === 'en' ? "Development and deployment of a C# environment management application." : "Développement et déploiement d'une application C# de gestion environnementale.", 
      link: "/pdf/CSharp.pdf",
      tags: ["C#", ".NET", "WPF","python","SQL"],
      img: "/planete.png"
    },
    { 
      title: lang === 'en' ? "Odomo Project" : "Projet Odomo", 
      desc: lang === 'en' ? "Java application aggregating real-time weather data." : "Application Java agrégeant des données météorologiques en temps réel.", 
      link: "/pdf/Odomo.pdf",
      tags: ["Java"],
      img: "/Odomo.png"
    },
  ];

  return (
    <div className="bg-[#0f1012] text-gray-200 font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white relative">
      
      {/* --- EFFET MATRIX (Background) --- */}
      <MatrixRain />

      {/* --- CONTENU PRINCIPAL (Z-Index élevé pour passer au-dessus de la pluie) --- */}
      <div className="relative z-10">
      
        {/* --- MODAL PROJET (Nouveau) --- */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedProject(null)} // Ferme en cliquant en dehors
          >
            <div 
              className="bg-[#1a1b1e] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 shadow-2xl relative flex flex-col"
              onClick={e => e.stopPropagation()} // Empêche la fermeture en cliquant dedans
            >
              {/* Bouton Fermer */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              {/* Contenu de la Modale */}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                    <img 
                      src={selectedProject.img} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">Project Details</p>
                  </div>
                </div>

                {/* Galerie Photos (Simulée avec Placeholders) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-xl overflow-hidden flex justify-center bg-gray-800 border border-gray-700 group">
                      <img 
                          src={i === 1 ? selectedProject.img1 : selectedProject.img2} 
                          alt={`Preview ${i}`}
                          className=" h-40 md:h-64 object-cover transform transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedProject.desc}
                      {/* Fausse description longue pour l'exemple */}
                      <span className="block mt-2 opacity-80 text-base">
                        {lang === 'en' 
                          ? "This project involved complex problem solving and advanced implementation techniques. I worked on optimizing the performance and ensuring a smooth user experience throughout the development lifecycle." 
                          : "Ce projet a impliqué une résolution de problèmes complexe et des techniques d'implémentation avancées. J'ai travaillé sur l'optimisation des performances et assuré une expérience utilisateur fluide tout au long du cycle de développement."}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 border border-blue-900/50 text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700 flex justify-end">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-transform hover:-translate-y-1 shadow-lg shadow-blue-900/20"
                    >
                      <FileText size={20} />
                      {t.modal.viewPdf}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MENU & LANGUE FLOTTANTS --- */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
          {/* Bouton Langue */}
          <button 
            onClick={() => setLang(l => l === 'en' ? 'fr' : 'en')}
            className="bg-gray-800 hover:bg-gray-700 text-2xl p-3 rounded-full shadow-lg border border-gray-700 transition-transform hover:scale-110 active:scale-95"
            title={lang === 'fr' ? "Passer en Français" : "Switch to English"}
          >
            {lang === 'en' ? '🇫🇷' : '🇬🇧'}
          </button>

          {/* Bouton Menu */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg shadow-blue-900/40 transition-transform hover:scale-110 active:scale-95"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* --- OVERLAY MENU --- */}
        <div className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
          >
            <X size={40} />
          </button>

          <nav className="flex flex-col items-center space-y-8">
            {[
              { id: 'home', label: t.menu.home, icon: Home },
              { id: 'about', label: t.menu.about, icon: User },
              { id: 'projects', label: t.menu.projects, icon: Briefcase },
              { id: 'contact', label: t.menu.contact, icon: Mail },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-4 text-3xl md:text-5xl font-bold text-gray-400 hover:text-white hover:scale-105 transition-all group"
              >
                <item.icon className="w-8 h-8 md:w-12 md:h-12 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* --- SECTION 1: HOME --- */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 transform scale-125 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src="/profil.png" 
                alt="Rémi Puigsech" 
                className="relative w-100 h-100 md:w-100 md:h-100 rounded-full object-cover border-4 border-gray-700 shadow-2xl mx-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2">
                Rémi Puigsech
              </h1>
              {/* Effet Machine à écrire */}
              <div className="h-10 md:h-12">
                <span className="text-xl md:text-3xl text-blue-500 font-mono font-medium">
                  {text}
                </span>
                <span className="inline-block w-0.5 h-6 md:h-8 bg-blue-500 ml-1 animate-pulse align-middle"></span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-transform hover:-translate-y-1 shadow-lg shadow-blue-900/30">
                {t.hero.viewWork}
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-full font-semibold transition-colors">
                {t.hero.contactMe}
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100" onClick={() => scrollToSection('about')}>
            <ChevronDown size={32} className="text-white" />
          </div>
        </section>

        {/* --- SECTION 2: ABOUT --- */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 bg-[#151618]/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-800/50">
            
            <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-semibold mb-2">
                {t.about.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {t.about.title1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {t.about.title2}
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t.about.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <a href="/pdf/parcours.pdf" target="_blank" className="flex items-center gap-2 px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 hover:border-blue-500">
                  <Download size={18} /> {"Parcours"}
                </a>
                <a href="/pdf/Activités.pdf" target="_blank" className="flex items-center gap-2 px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700">
                  <Download size={18} /> {"Activités"}
                </a>
              </div>
            </div>
            
            <div className="flex-1 relative order-1 md:order-2 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl transition-transform duration-500 group-hover:rotate-2"></div>
              <img 
                src="/remiRegard-removebg.png" 
                alt="About Rémi" 
                className="w-full max-w-sm md:max-w-md mx-auto object-contain drop-shadow-2xl z-10 relative transform transition hover:scale-105 duration-500"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PROJECTS --- */}
        <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-semibold mb-4">
                {t.projects.badge}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.projects.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.projects.desc}
              </p>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
              {projects.map((proj, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedProject(proj)}
                  className="min-w-[85vw] md:min-w-0 snap-center group bg-[#1a1b1e]/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all hover:-translate-y-2 border border-gray-800 flex flex-col h-full cursor-pointer"
                >
                  <div className="h-48 bg-gray-800/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent group-hover:from-blue-600/20 transition-colors z-10"></div>
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 duration-500"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://placehold.co/600x400?text=Project'; }}
                    />
                    
                    {/* Overlay "Voir plus" au survol */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] z-20">
                        <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Eye size={16} /> Details
                        </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {proj.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-xs font-medium px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: CONTACT --- */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="bg-[#151618]/90 backdrop-blur-md p-8 md:p-16 rounded-3xl shadow-2xl max-w-3xl w-full text-center space-y-10 border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact.title}</h2>
              <p className="text-gray-400 text-lg max-w-lg mx-auto whitespace-pre-line">
                {t.contact.desc}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 w-full relative z-10">
              <a href="mailto:remi.puigsech@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold text-lg w-full md:w-auto shadow-lg shadow-blue-900/30 hover:scale-105 transform duration-200">
                <Mail size={24} /> {t.contact.email}
              </a>
              <a href="https://linkedin.com/in/remi-puigsech-937365287/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0077b5] text-white rounded-xl hover:opacity-90 transition font-bold text-lg w-full md:w-auto shadow-lg hover:scale-105 transform duration-200">
                <Linkedin size={24} /> {t.contact.linkedin}
              </a>
            </div>

            <div className="pt-10 mt-10 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{t.contact.locTitle}</p>
                <p className="text-white text-xl font-semibold">Merignac, France</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{t.contact.phoneTitle}</p>
                <p className="text-white text-xl font-semibold">+33 6 23 25 65 46</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 pt-4 relative z-10">
              <a href="https://github.com/Lepoisson300" target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"><Github size={24}/></a>
              <a href="/pdf/CVfrancais.pdf" target="_blank" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 p-2 hover:bg-blue-900/20 rounded-lg transition-colors">{t.contact.cvFr} <Download size={14}/></a>
              <a href="/pdf/CVenglais.pdf" target="_blank" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 p-2 hover:bg-blue-900/20 rounded-lg transition-colors">{t.contact.cvEn} <Download size={14}/></a>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900 backdrop-blur-sm">
          <p>&copy; {new Date().getFullYear()} Rémi Puigsech.</p>
          <p className="mt-1">Designed & Built with <span className="text-blue-500">React</span> and <span className="text-purple-500">Tailwind</span>.</p>
        </footer>
      </div>

    </div>
  );
}