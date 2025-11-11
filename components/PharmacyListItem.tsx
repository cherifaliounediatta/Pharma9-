import React from 'react';
import { Pharmacy } from '../types';
import Icon from './Icon';
import StarRating from './StarRating';

interface PharmacyListItemProps {
  pharmacy: Pharmacy;
  distance: number | null;
  onSelect: (pharmacy: Pharmacy) => void;
  sortBy: 'distance' | 'rating' | 'alpha';
  setRef: (el: HTMLLIElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isSelected: boolean;
  isHighlighted: boolean;
}

const PharmacyListItem: React.FC<PharmacyListItemProps> = ({ 
  pharmacy, 
  distance, 
  onSelect, 
  sortBy, 
  setRef, 
  onMouseEnter,
  onMouseLeave,
  isSelected,
  isHighlighted
 }) => {
  const statusClasses = pharmacy.onDuty ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  const statusText = pharmacy.onDuty ? 'DE GARDE' : 'OUVERT';

  const itemClasses = [
    "bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border",
    isSelected ? "border-transparent ring-2 ring-offset-2 ring-blue-500" : "border-gray-200",
    isHighlighted && !isSelected ? "shadow-lg scale-[1.02] transform" : ""
  ].filter(Boolean).join(" ");

  return (
    <li
      ref={setRef}
      onClick={() => onSelect(pharmacy)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={itemClasses}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-lg text-gray-800">{pharmacy.name}</h3>
            <div className="flex items-center">
              <StarRating rating={pharmacy.averageRating ?? 0} readOnly />
              <span className="text-xs text-gray-500 ml-2">
                ({pharmacy.ratingCount ?? 0} avis)
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">{pharmacy.neighborhood}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
           <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusClasses}`}>
            {statusText}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <div className="flex items-center">
            <Icon name="location-dot" className="mr-2 text-gray-400" />
            <span>{pharmacy.address}</span>
        </div>
        {distance !== null && sortBy === 'distance' && (
            <span className="font-semibold text-gray-700">{distance.toFixed(1)} km</span>
        )}
      </div>
    </li>
  );
};

export default PharmacyListItem;