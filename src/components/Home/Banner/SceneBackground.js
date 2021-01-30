import React, { useEffect, useState } from "react";
import * as THREE from "three";
// import *  as Bureau from '../../../assets/Scenes/Banner/Bureau/scene.gltf'
import { GLTFLoader } from "../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
// import * as Bureau from '../../../assets/Scenes/Banner/Bureau/scene.gltf'
export default function SceneEarthBanner() {
  useEffect(() => {
    //Canvas SetUp
    const scene = new THREE.Scene();
    const el = document.getElementById("earth_scene");
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2.3
    renderer.shadowMap.enabled = true
    el.appendChild(renderer.domElement);
    //responsivness
    window.addEventListener("resize", function () {
      const width = el.clientWidth;
      const height = el.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    //Skybox 

    const SkyboxLoader = new THREE.CubeTextureLoader();

    const texture = SkyboxLoader.load([
        '/Skybox/bkg1_right.png',
        '/Skybox/bkg1_left.png',
        '/Skybox/bkg1_top.png',
        '/Skybox/bkg1_bot.png',
        '/Skybox/bkg1_front.png',
        '/Skybox/bkg1_back.png',
    ])
    scene.background = texture

    //Mouse
    const mouse = {x: 0.5, y: 0.5}
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX / window.innerWidth  / 2
    })

    //Load Models
    let planet;
    const Earth = new GLTFLoader();
    Earth.load("/earth/scene.gltf", (gltf) => {
        gltf.scene.scale.setScalar(1.0)
        gltf.scene.position.x = -150
        gltf.scene.position.y = 20
        gltf.scene.position.z = 0
        planet = gltf.scene
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = true
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
      scene.add(gltf.scene);
    });
    //Lights
    const spotLight = new THREE.SpotLight(0xffffff, 5);
    spotLight.castShadow = true
    spotLight.shadow.bias = -0.0001
    spotLight.shadow.mapSize.width = 1024*4
    spotLight.shadow.mapSize.height = 1024*4
    spotLight.position.x = 1000
    spotLight.position.y = 1000
    spotLight.position.z = 1000
    scene.add(spotLight);

 //Camera
 camera.position.set(0,0,200)
scene.rotation.y = 0.5
scene.position.x += 2
 function upDate(){
  camera.rotation.y = mouse.x
     if (planet) planet.rotation.y += 0.0019
 }

 function render () {
     renderer.render(scene, camera)
     
 }

 function Loop () {
     //run all the stuf (update, render, repeat)
     requestAnimationFrame(Loop)
     upDate()
     render()
 }
 Loop()
    //end of scene
  });

 

  return(
<div id="earth_scene"></div>
  ) ;
}