import React from 'react'
import { Link } from 'react-router-dom'

const Dog = ({ dog }) => {
    return (
        dog !== undefined &&
        <Link to={`/dogs/${dog.id}`} className="dog__item">
            <div className="dog__header">
                <div className="dog__details">
                    <p className="dog_name">{dog.name} </p>
                </div>
            </div>
            <div className="dog__body">
                <p><i className="bi bi-fingerprint"></i>Pasmina: {dog.breed?.name}</p>
                <p><i className="bi bi-cake2"></i>Starost: {dog.age}</p>
                <p><i className="bi bi-arrows-vertical"></i>Veličina: {dog.size}</p>
                <p><i className="bi bi-geo"></i> Mjesto: {dog.city}</p>
                <p><i className="bi bi-gender-ambiguous"></i> Spol: {dog.gender}</p>
                <p><i className="bi bi-envelope"></i>Opis: {dog.description}</p>
            </div>
        </Link>

    )
}

export default Dog
