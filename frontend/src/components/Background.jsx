import React from 'react'
import jm from '../assets/jacketMen.jpg'
import jm1 from '../assets/jacketMen1.jpg'
import jm2 from '../assets/jacketMen2.jpg'
import jk from '../assets/jacketKid.jpg'

const Background = ({heroCount}) => {

  if(heroCount===0){
    return <img src={jm} alt="" className='  h-[100%] float-right overflow-auto object-cover'/>
  }
  else if(heroCount===1){
     return <img src={jm1} alt="" className=' h-[100%] float-right overflow-auto object-cover'/>
  }
  else if(heroCount===2){
     return <img src={jm2} alt="" className=' h-[100%] float-right overflow-auto object-cover'/>
  }
  else{
     return <img src={jk} alt="" className=' h-[100%] float-right overflow-auto object-cover'/>
  }

}

export default Background

