import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import Animation from '../../public/animation_trophy.json'

export default function Trophy() {
  return (
    <Lottie
      loop
      animationData={Animation}
      play
      style={{width: '50%', height: 'auto'}}
    />
  )
}