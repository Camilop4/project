import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Earthquakes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://127.0.0.1:3000/api/features?page=1&per_page=2";
        const response = await axios.get(API_URL);
        setData(response.data);
        setLoading(false); // Marcar como cargado una vez que se obtienen los datos
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  // Verificar si los datos están cargando
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Verificar si hay datos disponibles
  if (!Array.isArray(data.data) || data.data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div>
      <h1>Earthquakes from  frist endPoint</h1>
      {data.data.map((earthquake) => (
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

export default Earthquakes;




