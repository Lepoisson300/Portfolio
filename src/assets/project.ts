type Lang = 'en' | 'fr';

export const getProjects = (lang: Lang) => [
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
      title: lang === 'en' ? "Car infotainment System" : "Système Infodivertissement Automobile",
      desc: lang === 'en' ? "Development of a web application that connects to an alfa roméo Giulietta to replace the OEM infotainment system." : "Développement d'une application web se connectant à une alfa roméo Giulietta pour remplacer le système infodivertissement d'origine.",
      link: "/pdf/CarSystem.pdf",
      tags: ["React", "Node.js", "CAN Bus"],
      img: "/infotainment.png",
      img1: "/homeInfotainment.png",
      img2: "/radioAlfa.png"
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
      img: "/planete.png",
      img1: "/shema.png",
      img2: "/winform.png"
    },
    { 
      title: lang === 'en' ? "Odomo Project" : "Projet Odomo", 
      desc: lang === 'en' ? "Java application aggregating real-time weather data." : "Application Java agrégeant des données météorologiques en temps réel.", 
      link: "/pdf/Odomo.pdf",
      tags: ["Java"],
      img: "/Odomo.png"
    },
  ];