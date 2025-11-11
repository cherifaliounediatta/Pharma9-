
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Pharmacy, Coordinates, Review } from './types';
import { PHARMACIES, DAKAR_CENTER, REVIEWS } from './constants';
import PharmacyListItem from './components/PharmacyListItem';
import PharmacyDetailModal from './components/PharmacyDetailModal';
import Icon from './components/Icon';

type Ratings = {
  [pharmacyId: number]: {
    totalStars: number;
    count: number;
  };
};

type DutyStatusFilter = 'all' | 'standard' | 'on_duty';
type SortByOption = 'distance' | 'rating' | 'alpha';
type Page = 'home' | 'about' | 'contact';


// PAGE COMPONENTS
const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          🇸🇳 À Propos de Pharma9
        </h1>

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-3 flex items-center">
            <Icon name="bullseye" className="mr-3" />
            Notre Mission : Connecter la Santé
          </h2>
          <blockquote className="border-l-4 border-green-200 pl-4 py-2 my-4 bg-gray-50">
            <p className="text-gray-700 leading-relaxed italic">
              Pharma9 est née d'une vision simple et essentielle : faciliter l'accès aux soins de santé primaires au Sénégal. Notre mission est de digitaliser la recherche de pharmacies afin que chaque citoyen puisse trouver rapidement, facilement et avec précision une officine, peu importe où il se trouve sur le territoire sénégalais.
            </p>
          </blockquote>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3 flex items-center">
            <Icon name="lightbulb" className="mr-3" />
            Notre Expertise : Technologie au Service de la Santé
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Fondée en Novembre 2025, Pharma9 se positionne à la croisée de la technologie et du secteur de la santé. Nous sommes des architectes du numérique dédiés à l'amélioration de l'expérience utilisateur dans la recherche de services essentiels.
          </p>
          <p className="text-gray-700 leading-relaxed font-semibold mb-3">
            Notre force réside dans :
          </p>
          <ul className="list-none space-y-3 pl-5">
            <li className="flex items-start">
              <Icon name="map-marked-alt" className="text-blue-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>La Technologie Géospatiale :</strong> Utiliser des outils de cartographie avancés pour offrir la localisation en temps réel des pharmacies ouvertes.</span>
            </li>
            <li className="flex items-start">
              <Icon name="mobile-screen-button" className="text-blue-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>La Digitalisation :</strong> Fournir des solutions numériques robustes et intuitives pour les utilisateurs et pour la gestion de l'information par les professionnels de la santé.</span>
            </li>
            <li className="flex items-start">
              <Icon name="microchip" className="text-blue-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>L'Innovation Locale :</strong> Développer des plateformes adaptées aux défis et aux réalités du marché sénégalais.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3 flex items-center">
            <Icon name="handshake" className="mr-3" />
            Notre Équipe : Le Cœur de l'Innovation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pharma9 est animée par une équipe passionnée et multidisciplinaire, dévouée à l'excellence numérique et à l'impact social.
          </p>
          <ul className="list-none space-y-3 pl-5">
            <li className="flex items-start">
              <Icon name="user-tie" className="text-purple-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>La Vision :</strong> L'entreprise a été fondée par Cherif Alioune Diatta, dont l'expertise en développement web et application, systèmes d'information géographiques (SIG) et entrepreneuriat a permis de transformer cette vision en réalité.</span>
            </li>
            <li className="flex items-start">
              <Icon name="users-gear" className="text-purple-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Nos Compétences :</strong> Notre équipe réunit des développeurs Full Stack, des experts en UX/UI (expérience utilisateur) et des spécialistes en données qui travaillent ensemble pour garantir que notre plateforme est non seulement fonctionnelle, mais aussi agréable et simple à utiliser pour tous les Sénégalais.</span>
            </li>
            <li className="flex items-start">
              <Icon name="heart-pulse" className="text-purple-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Notre Engagement :</strong> Nous sommes des innovateurs locaux, engagés à utiliser la technologie pour résoudre des problèmes concrets dans notre communauté.</span>
            </li>
          </ul>
        </div>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-3 flex items-center">
            <Icon name="gem" className="mr-3" />
            Nos Valeurs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ces principes guident notre développement et notre engagement envers nos utilisateurs :
          </p>
          <ul className="list-none space-y-3 pl-5">
             <li className="flex items-start">
              <Icon name="universal-access" className="text-yellow-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Accessibilité :</strong> Rendre l'information essentielle de santé simple et disponible pour tous.</span>
            </li>
            <li className="flex items-start">
              <Icon name="shield-halved" className="text-yellow-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Fiabilité :</strong> Garantir l'exactitude et la mise à jour constante des données de localisation.</span>
            </li>
            <li className="flex items-start">
              <Icon name="rocket" className="text-yellow-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Innovation :</strong> Intégrer les meilleures technologies pour résoudre des problèmes concrets.</span>
            </li>
             <li className="flex items-start">
              <Icon name="hand-holding-heart" className="text-yellow-500 mt-1 mr-4 w-5 text-center" />
              <span><strong>Engagement Sociétal :</strong> Contribuer activement à l'amélioration de la santé publique par l'information.</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center">
              <Icon name="flag" className="mr-3" />
              Notre Engagement pour le Sénégal
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pharma9 s'engage à devenir la plateforme de référence pour la localisation de pharmacies au Sénégal. Nous travaillons main dans la main avec les professionnels et les autorités pour bâtir un écosystème numérique qui sauve du temps et, potentiellement, des vies.
            </p>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

const ContactMap: React.FC = () => {
  const location = { lat: 14.7455, lng: -17.4950 }; // Approx. Nord Foire Basketball
  const bounds = { minLat: 14.740, maxLat: 14.750, minLng: -17.500, maxLng: -17.490 };

  const getPosition = (coords: Coordinates) => {
    const top = 100 - ((coords.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    const left = ((coords.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-inner mt-4">
      <img src={`https://picsum.photos/seed/dakarcontact/800/600`} alt="Carte de Nord Foire" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div
        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10"
        style={getPosition(location)}
        title="Terrain de basket de Nord Foire"
      >
        <Icon 
          name="map-pin"
          className="text-4xl text-red-500 drop-shadow-lg"
        />
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
          Terrain de Basket
        </span>
      </div>
    </div>
  );
};


const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};
        if (!formData.name.trim()) {
            newErrors.name = "Le nom et prénom sont requis.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "L'adresse e-mail est requise.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Le format de l'adresse e-mail est invalide.";
        }
        if (!formData.message.trim()) {
            newErrors.message = "Le message ne peut pas être vide.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Merci ! Votre message a été envoyé.');
            // Reset form
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setErrors({});
        }
    };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          📞 Nous Contacter
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Que vous soyez un professionnel de la santé, un partenaire potentiel ou un utilisateur, l'équipe Pharma9 est à votre écoute.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info & Map */}
          <div className="space-y-8">
             <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Nos Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                    <Icon name="phone" className="w-5 text-center mr-4 mt-1 text-green-500" />
                    <div>
                        <span className="font-semibold text-gray-800">Téléphone</span><br/>
                        <a href="tel:+221781466421" className="text-blue-600 hover:underline">78 146 64 21</a>
                    </div>
                </div>
                 <div className="flex items-start">
                    <Icon name="envelope" className="w-5 text-center mr-4 mt-1 text-green-500" />
                    <div>
                        <span className="font-semibold text-gray-800">E-mail</span><br/>
                        <a href="mailto:contact@pharma9.sn" className="text-blue-600 hover:underline">contact@pharma9.sn</a>
                    </div>
                </div>
                <div className="flex items-start">
                    <Icon name="map-location-dot" className="w-5 text-center mr-4 mt-1 text-green-500" />
                    <div>
                        <span className="font-semibold text-gray-800">Adresse</span><br/>
                        <p className="text-gray-600">Nord Foire, Dakar, Sénégal<br/>(Très proche du terrain de basket)</p>
                    </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-700">📍 Notre Localisation</h3>
              <p className="text-gray-600 mt-2">
                Nos bureaux sont situés à Nord Foire. Le point sur la carte indique notre point de repère principal, le terrain de basket, pour vous guider.
              </p>
              <ContactMap />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">✉️ Formulaire de Contact</h3>
            <p className="text-gray-600 mt-2 mb-4">
              Envoyez-nous un message directement via ce formulaire. Nous vous répondrons dans les plus brefs délais.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-green-500'} focus:border-transparent transition`}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-green-500'} focus:border-transparent transition`}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone <span className="text-gray-400">(Optionnel)</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="ex: Partenariat, Support..." 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.message ? 'focus:ring-red-500' : 'focus:ring-green-500'} focus:border-transparent transition`}></textarea>
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>
                <div>
                  <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Envoyer le Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};


// HEADER COMPONENT
const Header: React.FC<{
  currentPage: string;
  onNavigate: (page: Page) => void;
  isWatchingLocation: boolean;
  onToggleWatch: () => void;
  isLocating: boolean;
}> = ({ currentPage, onNavigate, isWatchingLocation, onToggleWatch, isLocating }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { key: 'home', label: 'Accueil' },
    { key: 'about', label: 'À Propos' },
    { key: 'contact', label: 'Contact' },
  ];

  const handleNavAndCloseMenu = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  }
  
  const handleToggleAndCloseMenu = () => {
    onToggleWatch();
    setIsMenuOpen(false);
  }


  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Icon name="staff-snake" className="text-green-600 text-3xl mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Pharmacies Sénégal</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key as Page)}
                className={`text-lg font-medium transition-colors pb-1 border-b-2 ${
                  currentPage === item.key
                    ? 'text-green-600 border-green-600'
                    : 'text-gray-500 hover:text-green-600 border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <button onClick={onToggleWatch} disabled={isLocating} className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-wait">
                <Icon name={isWatchingLocation ? 'location-slash' : 'location-crosshairs'} className={`mr-2 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isWatchingLocation ? 'Arrêter le suivi' : 'Suivre ma position'}</span>
            </button>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu" aria-expanded={isMenuOpen}>
                <Icon name={isMenuOpen ? "xmark" : "bars"} className="text-2xl text-gray-700" />
            </button>
        </div>
      </div>

       {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="p-4">
            <nav className="flex flex-col space-y-2">
                 {navItems.map(item => (
                    <button
                        key={item.key}
                        onClick={() => handleNavAndCloseMenu(item.key as Page)}
                        className={`text-lg font-medium w-full text-left py-3 px-4 rounded-lg transition-colors ${
                        currentPage === item.key
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="border-t border-gray-200 mt-4 pt-4">
                 <button onClick={handleToggleAndCloseMenu} disabled={isLocating} className="flex items-center w-full text-left p-3 rounded-lg text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-wait text-lg font-medium">
                    <Icon name={isWatchingLocation ? 'location-slash' : 'location-crosshairs'} className={`mr-3 w-6 text-center ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isWatchingLocation ? 'Arrêter le suivi' : 'Suivre ma position'}</span>
                </button>
            </div>
          </div>
      </div>
    </header>
  );
};


// Haversine distance calculation
const getDistance = (coords1: Coordinates, coords2: Coordinates): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

// Map Placeholder Component defined inside App.tsx to access state easily,
// but defined outside the main App function body to avoid re-creation on re-renders.
const MapPlaceholder: React.FC<{
  pharmacies: Pharmacy[];
  userLocation: Coordinates | null;
  selectedPharmacy: Pharmacy | null;
  highlightedPharmacyId: number | null;
  onSelect: (pharmacy: Pharmacy) => void;
}> = ({ pharmacies, userLocation, selectedPharmacy, highlightedPharmacyId, onSelect }) => {
  const bounds = { minLat: 14.65, maxLat: 14.78, minLng: -17.53, maxLng: -17.42 };

  const getPosition = (coords: Coordinates) => {
    const top = 100 - ((coords.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    const left = ((coords.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  const userPos = userLocation ? getPosition(userLocation) : null;
  const pharmacyPos = selectedPharmacy ? getPosition(selectedPharmacy.coordinates) : null;

  const clusteredItems = useMemo(() => {
    const CLUSTER_GRID_SIZE = 8; // Grid size in percentage for clustering
    const grid: Map<string, Pharmacy[]> = new Map();
    const items = [];

    // Filter out selected/highlighted pharmacies so they are always shown individually
    const pharmaciesToCluster = pharmacies.filter(
      p => p.id !== selectedPharmacy?.id && p.id !== highlightedPharmacyId
    );
    const individualMarkers = pharmacies.filter(
      p => p.id === selectedPharmacy?.id || p.id === highlightedPharmacyId
    );

    // Group pharmacies into grid cells
    for (const pharmacy of pharmaciesToCluster) {
        const pos = getPosition(pharmacy.coordinates);
        const top = parseFloat(pos.top);
        const left = parseFloat(pos.left);
        const gridKey = `${Math.floor(top / CLUSTER_GRID_SIZE)}-${Math.floor(left / CLUSTER_GRID_SIZE)}`;
        
        if (!grid.has(gridKey)) {
            grid.set(gridKey, []);
        }
        grid.get(gridKey)!.push(pharmacy);
    }

    // Create cluster or single marker items from the grid
    for (const [key, clusterPharmacies] of grid.entries()) {
        if (clusterPharmacies.length > 1) {
            const avgLat = clusterPharmacies.reduce((sum, p) => sum + p.coordinates.lat, 0) / clusterPharmacies.length;
            const avgLng = clusterPharmacies.reduce((sum, p) => sum + p.coordinates.lng, 0) / clusterPharmacies.length;
            items.push({
                type: 'cluster',
                id: `cluster-${key}`,
                count: clusterPharmacies.length,
                coordinates: { lat: avgLat, lng: avgLng },
                pharmacies: clusterPharmacies,
            });
        } else {
            items.push({
                type: 'marker',
                pharmacy: clusterPharmacies[0],
            });
        }
    }
    
    // Add back the always-visible individual markers
    for (const pharmacy of individualMarkers) {
        items.push({ type: 'marker', pharmacy });
    }

    return items;
  }, [pharmacies, selectedPharmacy, highlightedPharmacyId]);

  const getClusterSizeClasses = (count: number) => {
    if (count < 5) return 'w-10 h-10 text-sm';
    if (count < 10) return 'w-12 h-12 text-base';
    return 'w-14 h-14 text-lg';
  };

  return (
    <div className="relative w-full h-64 md:h-full bg-gray-200 rounded-lg overflow-hidden shadow-inner">
      <img src={`https://picsum.photos/seed/senegalmap/1200/800`} alt="Map background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent"></div>
      
      {/* Heatmap Layer */}
      <div className="absolute inset-0 filter blur-lg opacity-80">
        {pharmacies.map((pharmacy) => (
          <div
            key={`heat-${pharmacy.id}`}
            className="absolute w-24 h-24 rounded-full"
            style={{
              ...getPosition(pharmacy.coordinates),
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,165,0,0) 60%)',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {userPos && pharmacyPos && (
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line
            x1={userPos.left}
            y1={userPos.top}
            x2={pharmacyPos.left}
            y2={pharmacyPos.top}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-draw-line"
          />
        </svg>
      )}

      {userLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={getPosition(userLocation)}
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      )}

      {clusteredItems.map((item) => {
        if (item.type === 'cluster') {
          return (
             <div
              key={item.id}
              className={`absolute flex items-center justify-center font-bold text-white rounded-full bg-blue-500 bg-opacity-80 border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform ${getClusterSizeClasses(item.count)}`}
              style={getPosition(item.coordinates)}
              onClick={() => onSelect(item.pharmacies[0])}
              title={`${item.count} pharmacies`}
            >
              {item.count}
            </div>
          );
        }

        // Item is a marker
        const pharmacy = item.pharmacy;
        const isSelected = selectedPharmacy?.id === pharmacy.id;
        const isHighlighted = highlightedPharmacyId === pharmacy.id;
        return (
          <div
            key={pharmacy.id}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10"
            style={getPosition(pharmacy.coordinates)}
            onClick={() => onSelect(pharmacy)}
            title={pharmacy.name}
          >
            <Icon 
              name="location-dot"
              className={`text-3xl drop-shadow-lg transition-all duration-300 ease-in-out ${
                isSelected ? 'scale-150 -translate-y-2 z-20' : isHighlighted ? 'scale-125 z-20' : 'scale-100'
              } ${pharmacy.onDuty ? 'text-red-500' : 'text-green-600'}`}
            />
          </div>
        );
      })}
       <style>{`
        @keyframes draw-line {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [dutyStatusFilter, setDutyStatusFilter] = useState<DutyStatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortByOption>('distance');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(DAKAR_CENTER);
  const [isLocating, setIsLocating] = useState(false);
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Tous les quartiers');
  const [ratings, setRatings] = useState<Ratings>({});
  const [highlightedPharmacyId, setHighlightedPharmacyId] = useState<number | null>(null);
  const pharmacyListRefs = useRef<Map<number, HTMLLIElement | null>>(new Map());

  // Effect to scroll to the selected pharmacy in the list
  useEffect(() => {
    if (selectedPharmacy) {
      const node = pharmacyListRefs.current.get(selectedPharmacy.id);
      node?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPharmacy]);

  // Load ratings from localStorage on initial render
  useEffect(() => {
    try {
      const savedRatings = localStorage.getItem('pharmacyRatings');
      if (savedRatings) {
        setRatings(JSON.parse(savedRatings));
      }
    } catch (error) {
      console.error("Failed to parse ratings from localStorage", error);
    }
  }, []);

  // Save ratings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('pharmacyRatings', JSON.stringify(ratings));
    } catch (error) {
      console.error("Failed to save ratings to localStorage", error);
    }
  }, [ratings]);

    // Effect to handle location watching
  useEffect(() => {
    if (isWatchingLocation) {
      if (!navigator.geolocation) {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
        setIsWatchingLocation(false);
        return;
      }

      setIsLocating(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false); // Stop spinner after first successful watch update
        },
        (error) => {
          alert("Impossible de suivre votre position. Utilisation de l'emplacement par défaut.");
          console.error('Geolocation error:', error);
          setIsLocating(false);
          setIsWatchingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    // Cleanup function to clear the watch when the component unmounts
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isWatchingLocation]);

  const handleRatePharmacy = useCallback((pharmacyId: number, rating: number) => {
    setRatings(prevRatings => {
      const currentRating = prevRatings[pharmacyId] || { totalStars: 0, count: 0 };
      const newRating = {
        totalStars: currentRating.totalStars + rating,
        count: currentRating.count + 1,
      };
      return { ...prevRatings, [pharmacyId]: newRating };
    });
    // Optimistically update the selected pharmacy to reflect the new rating immediately
    setSelectedPharmacy(prev => {
        if (!prev || prev.id !== pharmacyId) return prev;
        const pharmacyRating = ratings[pharmacyId] || { totalStars: 0, count: 0 };
        const newTotalStars = pharmacyRating.totalStars + rating;
        const newCount = pharmacyRating.count + 1;
        return {
            ...prev,
            averageRating: newTotalStars / newCount,
            ratingCount: newCount,
        };
    });
  }, [ratings]);

  const neighborhoods = useMemo(() => {
    const uniqueNeighborhoods = [...new Set(PHARMACIES.map(p => p.neighborhood))];
    uniqueNeighborhoods.sort();
    return ['Tous les quartiers', ...uniqueNeighborhoods];
  }, []);
  
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // In a real app, you would re-fetch data here.
    // For this prototype, we just simulate a delay.
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);
  
  const pharmaciesWithRatings = useMemo(() => {
    return PHARMACIES.map(pharmacy => {
      const ratingData = ratings[pharmacy.id];
      if (ratingData) {
        return {
          ...pharmacy,
          averageRating: ratingData.totalStars / ratingData.count,
          ratingCount: ratingData.count,
        };
      }
      return pharmacy;
    });
  }, [ratings]);

  const filteredAndSortedPharmacies = useMemo(() => {
    let pharmacies = pharmaciesWithRatings.filter(p => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(term) ||
        p.neighborhood.toLowerCase().includes(term) ||
        p.owner.toLowerCase().includes(term) ||
        p.phone.replace(/\s/g, '').includes(term.replace(/\s/g, ''));
      
      const matchesDutyStatus =
        dutyStatusFilter === 'all' ||
        (dutyStatusFilter === 'standard' && !p.onDuty) ||
        (dutyStatusFilter === 'on_duty' && p.onDuty);
        
      const matchesNeighborhood = selectedNeighborhood === 'Tous les quartiers' || p.neighborhood === selectedNeighborhood;

      return matchesSearch && matchesDutyStatus && matchesNeighborhood;
    });

    if (sortBy === 'rating') {
      pharmacies.sort((a, b) => {
        const ratingA = a.averageRating ?? 0;
        const ratingB = b.averageRating ?? 0;
        const countA = a.ratingCount ?? 0;
        const countB = b.ratingCount ?? 0;
        
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        return countB - countA; // Tie-breaker: more ratings is better
      });
    } else if (sortBy === 'alpha') {
       pharmacies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (userLocation) { // Default sort by distance
      pharmacies.sort((a, b) => {
        const distA = getDistance(userLocation, a.coordinates);
        const distB = getDistance(userLocation, b.coordinates);
        return distA - distB;
      });
    }

    return pharmacies;
  }, [searchTerm, dutyStatusFilter, userLocation, selectedNeighborhood, pharmaciesWithRatings, sortBy]);

  const pharmacyReviews = useMemo(() => {
    if (!selectedPharmacy) return [];
    return REVIEWS.filter(review => review.pharmacyId === selectedPharmacy.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [selectedPharmacy]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
       <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isWatchingLocation={isWatchingLocation}
        onToggleWatch={() => setIsWatchingLocation(!isWatchingLocation)}
        isLocating={isLocating}
      />
      
      {currentPage === 'home' && (
        <>
          <main className="container mx-auto p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 sticky top-[80px] z-10">
              <div className="grid grid-cols-12 gap-4">
                <div className="relative col-span-12 md:col-span-3">
                  <input
                    type="text"
                    placeholder="Rechercher par nom, quartier, tél..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                  <Icon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative col-span-12 md:col-span-3">
                  <select
                    id="neighborhood-filter"
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white"
                    aria-label="Filtrer par quartier"
                  >
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </option>
                    ))}
                  </select>
                  <Icon name="map-location-dot" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <Icon name="chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="col-span-12 md:col-span-2">
                  <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1 w-full h-full">
                      <button
                          onClick={() => setDutyStatusFilter('all')}
                          className={`flex-1 py-2 px-2 text-sm font-bold rounded-md transition-colors text-center ${dutyStatusFilter === 'all' ? 'bg-white shadow text-gray-800' : 'text-gray-600 hover:bg-gray-300'}`}
                          aria-pressed={dutyStatusFilter === 'all'}
                      >
                          Toutes
                      </button>
                      <button
                          onClick={() => setDutyStatusFilter('standard')}
                          className={`flex-1 py-2 px-2 text-sm font-bold rounded-md transition-colors text-center ${dutyStatusFilter === 'standard' ? 'bg-white shadow text-green-700' : 'text-gray-600 hover:bg-gray-300'}`}
                          aria-pressed={dutyStatusFilter === 'standard'}
                      >
                          Ouvertes
                      </button>
                      <button
                          onClick={() => setDutyStatusFilter('on_duty')}
                          className={`flex-1 py-2 px-2 text-sm font-bold rounded-md transition-colors text-center ${dutyStatusFilter === 'on_duty' ? 'bg-white shadow text-red-700' : 'text-gray-600 hover:bg-gray-300'}`}
                          aria-pressed={dutyStatusFilter === 'on_duty'}
                      >
                          De Garde
                      </button>
                  </div>
                </div>
                <div className="relative col-span-12 md:col-span-2">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortByOption)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white h-full"
                        aria-label="Trier par"
                    >
                        <option value="distance">Proximité</option>
                        <option value="rating">Mieux notés</option>
                        <option value="alpha">Ordre A-Z</option>
                    </select>
                    <Icon name="sort" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Icon name="chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="col-span-12 md:col-span-2 flex items-center justify-center p-3 font-bold rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
                >
                  <Icon name="rotate" className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Rafraîchir
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{height: 'calc(100vh - 200px)'}}>
              <div className="hidden lg:block h-full">
                <MapPlaceholder 
                  pharmacies={filteredAndSortedPharmacies} 
                  userLocation={userLocation}
                  selectedPharmacy={selectedPharmacy}
                  highlightedPharmacyId={highlightedPharmacyId}
                  onSelect={setSelectedPharmacy} 
                />
              </div>
              <div className="h-full overflow-y-auto pr-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-3 pl-1">
                    {filteredAndSortedPharmacies.length} pharmacies trouvées
                </h2>
                <ul className="space-y-3">
                  {filteredAndSortedPharmacies.map((pharmacy) => (
                    <PharmacyListItem
                      key={pharmacy.id}
                      pharmacy={pharmacy}
                      distance={userLocation ? getDistance(userLocation, pharmacy.coordinates) : null}
                      onSelect={setSelectedPharmacy}
                      sortBy={sortBy}
                      setRef={(el) => pharmacyListRefs.current.set(pharmacy.id, el)}
                      onMouseEnter={() => setHighlightedPharmacyId(pharmacy.id)}
                      onMouseLeave={() => setHighlightedPharmacyId(null)}
                      isSelected={selectedPharmacy?.id === pharmacy.id}
                      isHighlighted={highlightedPharmacyId === pharmacy.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </main>

          {selectedPharmacy && (
            <PharmacyDetailModal
              pharmacy={selectedPharmacy}
              reviews={pharmacyReviews}
              onClose={() => setSelectedPharmacy(null)}
              onRate={handleRatePharmacy}
            />
          )}
        </>
      )}

      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      
    </div>
  );
}
