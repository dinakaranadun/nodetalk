import React from 'react'
import Navbar from '../components/common/navbar';
import Hero from '../components/home/hero';
import Features from '../components/home/features';
import Footer from '../components/common/footer';

const Home = () => {
  return (
    <div className='bg-white'>
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default Home;
