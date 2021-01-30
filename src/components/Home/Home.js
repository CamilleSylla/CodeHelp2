import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap/gsap-core'
import React, { useEffect } from 'react'
import Banner from './Banner/Banner'
import Presentation from './Presentation/Presentation'

export default function Home () {
    useEffect(()=> {

        gsap.registerPlugin(ScrollTrigger);
        const t1 = gsap.timeline({
            ease: 'Power4 easeOut',
            ScrollTrigger: {
                trigger: ".wrapper",
                start: "top top", 
                end: "bottom 50%",
                pin: true, 
                pinSpacing: false ,
                markers: true
              },
            
        })
        t1.from('#left_presentation', {xPercent:-100}, "+=0")
        t1.from('#right_presentation', {yPercent:100}, "+=0")
    })
    
    return (
        <div id="home" >
            <Banner/>
            <Presentation/>
        </div>
    )
}