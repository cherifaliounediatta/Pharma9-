
import React, { useState } from 'react';
import { Pharmacy, Review } from '../types';
import Icon from './Icon';
import StarRating from './StarRating';

interface PharmacyDetailModalProps {
  pharmacy: Pharmacy;
  reviews: Review[];
  onClose: () => void;
  onRate: (pharmacyId: number, rating: number) => void;
}

const PharmacyDetailModal: React.FC<PharmacyDetailModalProps> = ({ pharmacy, reviews, onClose, onRate }) => {
  const [isCopied, setIsCopied] = useState(false);
  const statusClasses = pharmacy.onDuty ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  const statusText = pharmacy.onDuty ? 'DE GARDE' : 'OUVERT';
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.coordinates.lat},${pharmacy.coordinates.lng}`;

  const handleShare = async () => {
    const shareData = {
      title: pharmacy.name,
      text: `Voici les informations pour la pharmacie ${pharmacy.name}: ${pharmacy.address}, Tél: ${pharmacy.phone}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // We don't show an error if the user cancels the share dialog
        if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback to copying to clipboard
      const clipboardText = `Pharmacie: ${pharmacy.name}\nAdresse: ${pharmacy.address}\nTéléphone: ${pharmacy.phone}`;
      try {
        await navigator.clipboard.writeText(clipboardText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Impossible de copier les informations.');
      }
    }
  };

  const exampleServices = [
    { icon: 'syringe', name: 'Vente de vaccins' },
    { icon: 'user-doctor', name: 'Conseils personnalisés' },
    { icon: 'paw', name: 'Produits vétérinaires' },
    { icon: 'vial-virus', name: 'Tests rapides (COVID-19, etc.)' },
    { icon: 'mortar-pestle', name: 'Préparations magistrales' },
    { icon: 'wheelchair', name: 'Location de matériel médical' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all animate-fade-in-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{pharmacy.name}</h2>
              <p className="text-gray-500">{pharmacy.neighborhood}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Icon name="xmark" className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusClasses}`}>
                {statusText}
            </span>
             <div className="flex items-center">
                <StarRating rating={pharmacy.averageRating ?? 0} readOnly />
                <span className="text-xs text-gray-500 ml-2">
                ({pharmacy.ratingCount ?? 0} avis)
                </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5 space-y-4 text-gray-700 shrink-0">
          <div className="flex items-center">
            <Icon name="location-dot" className="w-5 text-gray-400 mr-4" />
            <span>{pharmacy.address}</span>
          </div>
          <div className="flex items-center">
            <Icon name="user-doctor" className="w-5 text-gray-400 mr-4" />
            <span>Titulaire: {pharmacy.owner}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Horaires d'ouverture</h3>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Icon name="clock" className="w-5 text-gray-400 mr-3 text-center" />
                        <span>Horaires standards</span>
                    </div>
                    <span className="font-semibold">{pharmacy.hours.standard}</span>
                </li>
                <li className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Icon name="moon" className="w-5 text-gray-400 mr-3 text-center" />
                        <span>Horaires de garde</span>
                    </div>
                    <span className="font-semibold">{pharmacy.hours.onDuty}</span>
                </li>
            </ul>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-5">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Services Proposés</h3>
            <ul className="space-y-2 text-sm text-gray-700">
                {exampleServices.map(service => (
                    <li key={service.name} className="flex items-center p-2 -mx-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Icon name={service.icon} className="w-5 text-green-500 mr-3 text-center" />
                        <span>{service.name}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="border-t border-gray-200 px-6 py-5 overflow-y-auto">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Avis des clients ({reviews.length})</h3>
            {reviews.length > 0 ? (
                <ul className="space-y-4">
                    {reviews.map(review => (
                        <li key={review.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800 text-sm">{review.reviewerName}</span>
                                <StarRating rating={review.rating} readOnly />
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                             <p className="text-xs text-gray-400 text-right mt-1">
                                {new Date(review.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 text-center py-4">Aucun avis pour le moment.</p>
            )}
        </div>

        <div className="border-t border-gray-200 px-6 py-5 shrink-0">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Évaluez votre expérience</h3>
            <div className="flex justify-center">
                 <StarRating onRate={(rating) => onRate(pharmacy.id, rating)} />
            </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-2xl grid grid-cols-3 gap-3 shrink-0">
            <a 
                href={`tel:${pharmacy.phone}`} 
                className="flex items-center justify-center w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
                <Icon name="phone" className="mr-2" /> Appeler
            </a>
            <a 
                href={directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-center"
            >
                <Icon name="diamond-turn-right" className="mr-2" /> Itinéraire
            </a>
            <button 
                onClick={handleShare}
                className="flex items-center justify-center w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors text-center"
            >
                <Icon name={isCopied ? 'check' : 'share-nodes'} className="mr-2" /> 
                {isCopied ? 'Copié !' : 'Partager'}
            </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PharmacyDetailModal;