import React from 'react'
import Header from '../Header/Header'
import './Hero.css' 
import hero_image from '../../assets/hero_image.png'
import hero_image_back from '../../assets/hero_image_back.png'
import Heart from '../../assets/heart.png'
import Calories from '../../assets/calories.png'



const Hero = () => {
  return (
    <div className='hero'>
      <div className="blur hero-blur">
      </div>
      {/* left hero section */}
      <div className="left-h">
        <Header/>
        <div className="best-ad">
          <div></div>
          <span>the best fitness club in the world</span>
        </div>
        {/* text */}
        <div className="hero-text">
          <div>
            <span className='stroke-text'>Shape </span>
            <span>Your</span>
            </div>
            <div><span>ideal body</span></div>
            <div className="span">To become the best of you</div>
        </div>
        {/* figures */}
        <div className="figures">
          <div>
            <span>+140</span>
            <span>expert coaches</span>
            </div>
          <div>
            <span>+978</span>
            <span>members joined</span>
          </div>
          <div>
            <span>+50</span>
            <span>fitness programs</span>
          </div>
        </div>
        {/* hero buttons */}
        <div className="hero-buttons">
          <buttons className="button">Get started</buttons>
          <buttons className="button">Learn more</buttons>
        </div>
      </div>
      {/* right hero section */}
      <div className="right-h">
        <button className='button'>Join now</button>
        <div className="heart-rate">
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>116 BPM</span>
        </div>
        <img src={hero_image} alt="" className='hero-image'/>
        <img src={hero_image_back } alt="" className='hero-image-back'/>
        <div className="calories">
          <img src={Calories} alt="" />
          <div>
          <span>Calories Burt</span>
          <span>220kcal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero