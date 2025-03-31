import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar'    
import HeroPic from '../../assets/images/movie_banner3.jpg'
import HeroTitle from '../../assets/images/movie_title.png'
import HeroNSeries from '../../assets/images/n-series.png';
import TitleCard from '../../components/TitleCard'
import Footer from '../../components/Footer'
const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img src={HeroPic} alt="" className='hero-pic'/>
          <div className="hero-description">
            <img src={HeroNSeries} alt="" className='hero-n-series' />
            <img src={HeroTitle}alt="" className='hero-title'/>
            <p className='movie-info'>
            Mutants fight for survival in a world that fears them. Led by Professor X, the X-Men battle powerful enemies like Magneto to protect both humans and mutants.
            </p>
             <div className="hero-buttons">
              <button className='play'> &#9658; Play </button>
              <button className='my-list'> + My List</button>
             </div>

          </div>
        </div>

        <div className="more-cards">
        <TitleCard/>

        <TitleCard title={"BlockBuster Movies"}/>
       
        <TitleCard title={"Only on Netflix"}/>
       
        <TitleCard title={"Upcoming"}/>
       
        <TitleCard title={"Top Pics for You"}/>
       
        </div>
        <Footer/>
        
    </div>
  )
}

export default Home