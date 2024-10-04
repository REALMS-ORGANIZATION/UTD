import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN; // Ensure the token is loaded

function CampusMap() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Starting position [lng, lat]
      zoom: 9 // Starting zoom
    });

    fetchSentimentData().then(data => {
      data.forEach(point => {
        new mapboxgl.Marker({ color: getColorBySentiment(point.sentiment) })
          .setLngLat([point.longitude, point.latitude])
          .addTo(map);
      });
    });

  }, []);

  const fetchSentimentData = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE');
      const data = await response.json();
      return data; // Ensure this returns an array of objects with latitude, longitude, and sentiment
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
      return [];
    }
  };

  const getColorBySentiment = (sentiment) => {
    // Function to determine marker color by sentiment
    if (sentiment > 0) return 'green'; // Positive sentiment
    if (sentiment < 0) return 'red'; // Negative sentiment
    return 'gray'; // Neutral sentiment
  };

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

export default CampusMap;

