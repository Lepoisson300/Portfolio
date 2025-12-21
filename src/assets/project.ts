type Lang = 'en' | 'fr';

export const getProjects = (lang: Lang) => [
    { 
      title: lang === 'en' ? "AI Creation Project" : "Projet I.A.", 
      desc: lang === 'en' ? "Implementation of a strategic board and using AI to solve it. The algorithm used for this project was simple, the AI had to chose the best action to do according scores and can deduce action from the oponent" 
      : "Implémentation d'une IA pour un jeu de plateau. L'algorithme utilisé, était un système de score pour chaque action, ce qui permettait à L'IA de choisir la meilleure. Elle était également capable de déduire la prochaine action possible de son adversaire.  ", 
      link: "/pdf/Towa.pdf",
      tags: ["Java"],
      img: "/towa_6.png",
      img1:"" ,
      img2: ""
    },
    
    {
      title: lang === 'en' ? "Car infotainment System" : "Système Infodivertissement Automobile",
      desc: lang === 'en' ? "Development of a web application that connects to an alfa roméo Giulietta to replace the OEM infotainment system. This app retrieves all the car Infos from OBD using a Node backend." 
      : "Développement d'une application web se connectant à une alfa roméo Giulietta pour remplacer le système infodivertissement d'origine. Le système se connecte en OBD pour récupérer les informations du véhicule à l'aide d'un backend en node. ",
      link: "/pdf/CarSystem.pdf",
      tags: ["React", "Node.js", "CAN Bus"],
      img: "/infotainment.png",
      img1: "/homeInfotainment.png",
      img2: "/radioAlfa.png"
    },
    { 
      title: lang === 'en' ? "Robotics Project" : "Projet Robotique", 
      desc: lang === 'en' ? "Design and C++ programming of an autonomous mobile robot. The robots used a lidar sensor to know his environment and it was able to find a path in a maze." 
      : "Conception et programmation C++ d'un robot mobile autonome. Le robot utilisait un capteur lidar pour connaitre son environnement et ainsi etre capable de sortir d'un labyrinthe", 
      link: "/pdf/Robotique.pdf",
      tags: ["C++", "Arduino", "Fusion360"],
      img: "/guido.png",
      img1: "/fusion360.png",
      img2: "/lidar.jpg"
    },
    { 
      title: lang === 'en' ? "Video Game Project" : "Projet Jeu Vidéo", 
      desc: lang === 'en' ? "Full cycle creation of a 3D game with Unreal Engine. Creation of AI NPC, working on graphic matérials and using of Blender" 
      : "Création complète et publication d'un jeu 3D avec Unreal Engine. Creation de PNJ IA et travail sur des matériaux graphiques avec l'utilisation de Blender", 
      link: "/pdf/UE.pdf",
      tags: ["Unreal Engine", "C++", "Blueprints"],
      img: "/UE.png",
      img1: "/halo.jpeg" ,
      img2: "/blueprint.jpeg"
    },
    { 
      title: lang === 'en' ? "R/place Project" : "Projet R/place", 
      desc: lang === 'en' ? "Complex API usage to recreate the social experiment Reddit's R/place. Understand how API's interactions works and make my application interact with it" 
      : "Utilisation d'API complexe pour recréer l'expérience sociale Reddit R/place. Comprendre comment les intéractions API fonctionnent et faire en sorte que mon application se mette à jour automatiquement.", 
      link: "/pdf/Rplace.pdf",
      tags: ["API", "React", "Node.js"],
      img: "/pixelWar.png"
    },
    { 
      title: lang === 'en' ? "Application Project" : "Projet Application", 
      desc: lang === 'en' ? "Development and deployment of a C# environment management application. Displaying and studying global emission of different coutry thanks to an official csv file that is read by a python script." 
      : "Développement et déploiement d'une application C# de gestion environnementale. Affichage et étude des emmissions de CO2 globale des pays dans le monde grace à des fichiers CSV officiels. Ces fichiers étaient lu par un script python puis utilisé par le C# de l'application.", 
      link: "/pdf/CSharp.pdf",
      tags: ["C#", ".NET", "WPF","python","SQL"],
      img: "/planete.png",
      img1: "/shema.png",
      img2: "/winform.png"
    },
  ];