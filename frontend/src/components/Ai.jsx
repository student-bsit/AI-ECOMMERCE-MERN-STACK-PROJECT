import React, { useContext, useState } from 'react';
import ai from '../assets/ai.jpg';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Ai = () => {
  const [activeAi,setActiveAi]=useState(false)

  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const navigate = useNavigate();

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    console.log('You said:', transcript);

    if (transcript.includes('search') && transcript.includes('open') && !showSearch) {
      speak('Opening search');
      setShowSearch(true);
      navigate('/collection');
    } else if (transcript.includes('search') && transcript.includes('close') && showSearch) {
      speak('Closing search');
      setShowSearch(false);
    } else if (
      transcript.includes('collection') ||
      transcript.includes('collections') ||
      transcript.includes('product') ||
      transcript.includes('products')
    ) {
      speak('Opening collection page');
      navigate('/collection');
    } else if (transcript.includes('about') || transcript.includes('about page')) {
      speak('Opening about page');
      navigate('/about');
      setShowSearch(false);
    } else if (transcript.includes('home') || transcript.includes('homepage')) {
      speak('Opening home page');
      navigate('/');
      setShowSearch(false);
    } else if (
      transcript.includes('cart') ||
      transcript.includes('kaat') ||
      transcript.includes('caat')
    ) {
      speak('Opening your cart page');
      navigate('/cart');
      setShowSearch(false);
    } else if (transcript.includes('contact')) {
      speak('Opening contact page');
      navigate('/contact');
      setShowSearch(false);
    } else if (
      transcript.includes('order') ||
      transcript.includes('my orders') ||
      transcript.includes('orders') ||
      transcript.includes('my order')
    ) {
      speak('Opening your orders page');
      navigate('/order');
      setShowSearch(false);
    } else {
      toast.error('Try again');
    }
  };

  const startListening = () => {
    try {
      setActiveAi(true)
      recognition.start();

      recognition.onend=()=>{
        setActiveAi(false)
      }
    } catch (err) {
      console.error('Recognition error:', err);
      toast.error('Speech recognition error');
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startListening}
    >
      <img src={ai} alt="AI Voice Assistant" className={`w-[100px] rounded-3xl cursor-pointer ${activeAi?'translate-x-[10%] translate-y-[10%] scale-125':'translate-x-[0] translate-y-[0]'} transition-transform`} style={{
        filter:`${activeAi?"drop-shadow(0px 0px 30px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`
      }} />
    </div>
  );
};

export default Ai;
