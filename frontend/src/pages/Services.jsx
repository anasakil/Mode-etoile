import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceCard from './ServiceCard'; 

const nosservices = [
  {
    title: "Création et Gestion de Marque",
    description: "Développement de l'identité de la marque, définition de l'identité visuelle : logo, palette de couleurs, typographie, réflexion stratégique sur le positionnement de la marque.",
    image: "https://via.placeholder.com/300?text=Création+et+Gestion+de+Marque"
  },
  {
    title: "Design et Production",
    description: "Conception de collections de vêtements, recherche de tendances, design des collections et prototypes, gestion de la production, sélection des matériaux, suivi de la production et contrôle de la qualité.",
    image: "https://via.placeholder.com/300?text=Design+et+Production"
  },
  {
    title: "Marketing et Promotion",
    description: "Campagnes publicitaires, stratégies de marketing digital et traditionnel, gestion des réseaux sociaux, création de contenu, gestion de communauté, organisation de défilés de mode et d'événements de lancement.",
    image: "https://via.placeholder.com/300?text=Marketing+et+Promotion"
  },
  {
    title: "Vente et Distribution",
    description: "Création et gestion de boutiques en ligne, conception de sites e-commerce, stratégies de vente (B2B et B2C), développement de partenariats et de canaux de distribution.",
    image: "https://via.placeholder.com/300?text=Vente+et+Distribution"
  },
  {
    title: "Relations Publiques",
    description: "Gestion des relations avec les médias, relations presse, communiqués, organisation d'événements de presse et de rencontres avec les influenceurs, événements exclusifs pour les médias et les influenceurs.",
    image: "https://via.placeholder.com/300?text=Relations+Publiques"
  },
  {
    title: "Photographie et Vidéo",
    description: "Sessions de photos professionnelles pour les collections, séances photo de haute qualité, création de vidéos promotionnelles et de contenu pour les réseaux sociaux.",
    image: "https://via.placeholder.com/300?text=Photographie+et+Vidéo"
  },
  {
    title: "Événements",
    description: "Planification et coordination d'événements, conception thématique et décoration, gestion des invités, marketing et promotion d'événements, services techniques, animations et divertissements, services de suivi et de feedback.",
    image: "https://via.placeholder.com/300?text=Événements"
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" data-aos="fade-up">
      <br /><br /><br />
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-white" data-aos="fade-down">Nos Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nosservices.map((service, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
      <br /><br /><br />
    </div>
  );
};

export default Services;
