import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from "../assets/cards/Card";

const TitleCard = ({title,category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGFiNTgxNzU0M2E0OWQyYzYxYzNkMGM0NzVmZTE5ZCIsIm5iZiI6MTc0MzQ3OTM2My40MjMsInN1YiI6IjY3ZWI2MjQzNjI0NWM3ZGYwYWZiMDE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53jbb9XDe69Mvx5kbTfJMYggHY7wwfeGVipRVowAdIo'
    }
  };
  
  

  //f or horizntal scrollling
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      cardsRef.current.scrollLeft += e.deltaY;
    }
    )
  })
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return  <div className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCard