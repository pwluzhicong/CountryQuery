import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const WorldMap = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);

  const handleContinentClick = (event) => {
    const continentName = event.target.feature.properties.name;
    setSelectedContinent(continentName);
  };

  const continentsData = [
    { name: 'North America', coordinates: [[50, -130], [23, -65]] },
    { name: 'South America', coordinates: [[12, -81], [-56, -36]] },
    { name: 'Europe', coordinates: [[72, -22], [35, 50]] },
    { name: 'Africa', coordinates: [[37, -20], [-35, 52]] },
    { name: 'Asia', coordinates: [[70, 22], [-10, 180]] },
    { name: 'Australia', coordinates: [[-10, 110], [-45, 155]] },
    { name: 'Antarctica', coordinates: [[-60, -180], [-89, 180]] },
  ];

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {continentsData.map((continent, index) => (
        <GeoJSON
          key={index}
          data={{
            type: 'Polygon',
            coordinates: [continent.coordinates],
          }}
          style={{ fillColor: '#3388ff', weight: 1 }}
          eventHandlers={{ click: handleContinentClick }}
        />
      ))}
      {selectedContinent && (
        <div className="selected-continent">{selectedContinent}</div>
      )}
    </MapContainer>
  );
};

export default WorldMap;