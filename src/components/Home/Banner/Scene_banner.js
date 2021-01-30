import React, { useEffect, useState } from "react";
import * as THREE from "three";
// import *  as Bureau from '../../../assets/Scenes/Banner/Bureau/scene.gltf'
import { GLTFLoader } from "../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
// import * as Bureau from '../../../assets/Scenes/Banner/Bureau/scene.gltf'
export default function SceneBanner() {
  useEffect(() => {
    //Canvas SetUp
    const scene = new THREE.Scene();
    const el = document.getElementById("bureau_scene");
    const camera = new THREE.PerspectiveCamera(
      75,
      el.clientWidth / el.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor( 0x000000, 0 );
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


    //Load Models
    const Robot = new GLTFLoader();
    Robot.load("/littleRobot/scene.gltf", (gltf) => {
        gltf.scene.scale.setScalar(0.01)
        gltf.scene.position.x = -10
        gltf.scene.position.y = 10
        gltf.scene.position.z = -30
        // gltf.scene.position.x = 8
        // gltf.scene.position.y = -3
        // gltf.scene.position.z = 1
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = true
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
      scene.add(gltf.scene);
    });

    let LeMan;
    const Man  = new GLTFLoader();
    Man.load('/man/scene.gltf', (gltf) => {
        gltf.scene.scale.setScalar(4.5)
        gltf.scene.position.x = 3
        gltf.scene.position.y = -3
        gltf.scene.position.z = -2
        gltf.scene.rotation.y = -1
        LeMan = gltf.scene
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = true
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
      scene.add(gltf.scene);
    });
    const Floor  = new GLTFLoader();
    Floor.load('/floor/scene.gltf', (gltf) => {
        gltf.scene.scale.setScalar(100.0)
        gltf.scene.position.x = 0
        gltf.scene.position.y = -5
        gltf.scene.position.z = 20
        // gltf.scene.rotation.y = -3
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = false
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
      scene.add(gltf.scene);
    });


    //Mouse
    const mouse = {x: 0.5, y: 0.5}
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX / window.innerWidth  / 4
    })

    //Lights
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true
    spotLight.shadow.bias = -0.0001
    spotLight.shadow.mapSize.width = 1024*4
    spotLight.shadow.mapSize.height = 1024*4
    spotLight.position.x = 50
    spotLight.position.y = 50
    spotLight.position.z = 50
    scene.add(spotLight);

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820)
    scene.add(hemiLight)
 //Camera
 camera.position.set(0,1,5)
scene.rotation.y = 0.5
scene.position.x += 2
 function upDate(){
  camera.rotation.y = mouse.x
  // hemiLight.position.set( mouse.x + 10,mouse.x + 10,mouse.x + 10)
 }

 function render () {
     renderer.render(scene, camera)
     
 }

 function Loop () {
     //run all the stuf (update, render, repeat)
     
    //  camera.rotation.z = mouse.y
     requestAnimationFrame(Loop)
     upDate()
     render()
 }
 Loop()
    //end of scene
  });

 

  return <div id="bureau_scene"></div>;
}
