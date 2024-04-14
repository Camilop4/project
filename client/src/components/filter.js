import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Filter() {
  const [data, setData] = useState([]);
  const [magType, setMagType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=${magType}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (magType) {
      fetchData();
    }
  }, [magType]);

  const handleInputChange = (event) => {
    setMagType(event.target.value);
  };


  return (
    <div>
      <h1>Earthquakes filtered for mag_type: {magType}</h1>
      <input type="text" value={magType} onChange={handleInputChange} placeholder="Ingrese el tipo de magnitud" />

      {data.data && data.data.map((earthquake) => (
        <div key={earthquake.id}>
          <h2>{earthquake.attributes.title}</h2>
          <p>Magnitud: {earthquake.attributes.magnitude}</p>
          <p>Lugar: {earthquake.attributes.place}</p>
          <p>Hora: {new Date(earthquake.attributes.time).toLocaleString()}</p>
          <p>Tsunami: {earthquake.attributes.tsunami ? 'Sí' : 'No'}</p>
          <p>Coordenadas: Latitud - {earthquake.attributes.coordinates.latitude}, Longitud - {earthquake.attributes.coordinates.longitude}</p>
          <a href={earthquake.links.external_url}>Enlace externo</a>
        </div>
      ))}
      <button onClick={()=> navigate("/")}>Go Back!</button>
    </div>
  );
}

export default Filter;
