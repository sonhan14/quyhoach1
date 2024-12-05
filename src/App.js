import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1Ijoic29uaGFuMTQiLCJhIjoiY20zd3F1cms0MTUybTJqc2N2amtqbmhzOCJ9.dQzFbe2dFYVPDeD9fjZGpQ';

function App() {
  const mapContainerRef = useRef();
  const mapRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [106.722841, 10.739506],
        zoom: 14,
      });

      mapRef.current = mapInstance;
      const coordinates = [
        [106.65, 10.85],
        [106.8, 10.85],
        [106.8, 10.7],
        [106.65, 10.7],
      ];

      const coordinates2 = coordinates.map(([lng, lat]) => [lng, lat - 0.075]);

      const coordinates3 = coordinates.map(([lng, lat]) => [lng - 0.075, lat]);

      const coordinates4 = coordinates3.map(([lng, lat]) => [lng, lat - 0.075]);


      // Tính trung tâm của các tọa độ
      const centerLng = coordinates.reduce((acc, [lng]) => acc + lng, 0) / coordinates.length;
      const centerLat = coordinates.reduce((acc, [, lat]) => acc + lat, 0) / coordinates.length;
      const scale = 0.5;
      const scaledCoordinates = coordinates.map(([lng, lat]) => [
        centerLng + (lng - centerLng) * scale,
        centerLat + (lat - centerLat) * scale,
      ]);

      new mapboxgl.Marker()
        .setLngLat([106.722841, 10.739506])
        .addTo(mapInstance);


      mapInstance.on('load', () => {
        mapInstance.addSource('image-overlay', {
          type: 'image',
          url: '/images/quan72023/12/3262/2171.png',
          coordinates: scaledCoordinates,
        });

        mapInstance.addLayer({
          id: 'image-overlay',
          type: 'raster',
          source: 'image-overlay',
          paint: {
            'raster-opacity': opacity,
          }
        });


        const centerLng2 = coordinates2.reduce((acc, [lng]) => acc + lng, 0) / coordinates2.length;
        const centerLat2 = coordinates2.reduce((acc, [, lat]) => acc + lat, 0) / coordinates2.length;

        const scaledCoordinates2 = coordinates2.map(([lng, lat]) => [
          centerLng2 + (lng - centerLng2) * scale,
          centerLat2 + (lat - centerLat2) * scale,
        ]);

        mapInstance.addSource('image-overlay2', {
          type: 'image',
          url: '/images/quan72023/12/3262/2170.png',
          coordinates: scaledCoordinates2,
        });

        mapInstance.addLayer({
          id: 'image-overlay2',
          type: 'raster',
          source: 'image-overlay2',
          paint: {
            'raster-opacity': opacity,
          }
        });

        const centerLng3 = coordinates3.reduce((acc, [lng]) => acc + lng, 0) / coordinates3.length;
        const centerLat3 = coordinates3.reduce((acc, [, lat]) => acc + lat, 0) / coordinates3.length;

        const scaledCoordinates3 = coordinates3.map(([lng, lat]) => [
          centerLng3 + (lng - centerLng3) * scale,
          centerLat3 + (lat - centerLat3) * scale,
        ]);

        mapInstance.addSource('image-overlay3', {
          type: 'image',
          url: '/images/quan72023/12/3261/2171.png',
          coordinates: scaledCoordinates3,
        });

        mapInstance.addLayer({
          id: 'image-overlay3',
          type: 'raster',
          source: 'image-overlay3',
          paint: {
            'raster-opacity': opacity,
          }
        });

        const centerLng4 = coordinates4.reduce((acc, [lng]) => acc + lng, 0) / coordinates4.length;
        const centerLat4 = coordinates4.reduce((acc, [, lat]) => acc + lat, 0) / coordinates4.length;

        const scaledCoordinates4 = coordinates4.map(([lng, lat]) => [
          centerLng4 + (lng - centerLng4) * scale,
          centerLat4 + (lat - centerLat4) * scale,
        ]);

        mapInstance.addSource('image-overlay4', {
          type: 'image',
          url: '/images/quan72023/12/3261/2170.png',
          coordinates: scaledCoordinates4,
        });

        mapInstance.addLayer({
          id: 'image-overlay4',
          type: 'raster',
          source: 'image-overlay4',
          paint: {
            'raster-opacity': opacity,
          }
        });

      });

    };

    initializeMap();

    return () => mapRef.current && mapRef.current.remove();
  }, []);

  const handleOpacityChange = (event) => {
    const newOpacity = 1 - event.target.value / 100;
    setOpacity(newOpacity);

    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      const mapInstance = mapRef.current;
      if (mapInstance.getLayer('image-overlay')) {
        mapInstance.setPaintProperty('image-overlay', 'raster-opacity', newOpacity);
        mapInstance.setPaintProperty('image-overlay2', 'raster-opacity', newOpacity);
        mapInstance.setPaintProperty('image-overlay3', 'raster-opacity', newOpacity);
        mapInstance.setPaintProperty('image-overlay4', 'raster-opacity', newOpacity);
      }
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} id="map" className="map-container"></div>
      <div className="opacity-control">
        <label>Độ mờ của bản đồ: {Math.round((1 - opacity) * 100)}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={(1 - opacity) * 100}
          onChange={handleOpacityChange}
        />
      </div>
    </div>
  );
}

export default App;
