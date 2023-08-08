import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import Animation from '../../../public/animation_bluefire.json'

export default function BlueFire() {
  return (
    <Lottie
      loop
      animationData={Animation}
      play
      style={{width: '55%', height: 'auto'}}
    />
  )
}