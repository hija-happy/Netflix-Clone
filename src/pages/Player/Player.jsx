import React, { useEffect, useState } from 'react'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
const Player = () => {

  const {id} =useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGFiNTgxNzU0M2E0OWQyYzYxYzNkMGM0NzVmZTE5ZCIsIm5iZiI6MTc0MzQ3OTM2My40MjMsInN1YiI6IjY3ZWI2MjQzNjI0NWM3ZGYwYWZiMDE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53jbb9XDe69Mvx5kbTfJMYggHY7wwfeGVipRVowAdIo'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res.results[0]);  
        setApiData(res.results[0]);
      })
      .catch(err => console.error(err));
  }, [id]);
  
  return (
    <div className='player'>
<FontAwesomeIcon
  icon={faArrowLeft}
 className='icon'
/>
{apiData.key && (
  <iframe
    width="90%"
    height="90%"
    src={`https://www.youtube.com/embed/${apiData.key}`}
    title="trailer"
    style={{ border: "none" }}
    allowFullScreen
  />
)}

      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player



