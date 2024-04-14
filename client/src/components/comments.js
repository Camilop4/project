import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Comments() {
  const navigate = useNavigate();
  const [featureId, setFeatureId] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleFeatureIdChange = (event) => {
    setFeatureId(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:3000/api/features/${featureId}/comments`, { comment: { body: comment } });
      setSuccessMessage(`Your comment was successfully created for the earthquake with ID:: ${response.data.earthquake_id}`); 
    } catch (error) {
      setError('Error al enviar el comentario'); // Manejar errores
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h1>Create a comment for the earthquake</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={featureId} onChange={handleFeatureIdChange} placeholder="Ingrese el ID del terremoto" />
        <input type="text" value={comment} onChange={handleCommentChange} placeholder="Ingrese su comentario" />
        <button type="submit">Enviar comentario</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>} {/* Mostrar mensaje de error si existe */}
      <button onClick={() => navigate("/")}>Go Back!</button>
    </div>
  );
}

export default Comments;
