import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjA1OTk4YzIzYWI3Yzk2NTQ0ZTcyZTQ2YTdmZTJjOSIsIm5iZiI6MTc4NjA2OTk4OS4yNDgsInN1YiI6IjZhNzU0M2U1NzFhYmJjYTQzODMzNGI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o2vE4ooRRwEqcQOA_z6rOhhG_1luy80wKNf8pdRP_v4'}
  };
  
  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Now Playing"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) => {
          return (
          <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCards
