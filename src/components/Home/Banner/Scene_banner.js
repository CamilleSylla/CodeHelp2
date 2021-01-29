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
    const Bureau = new GLTFLoader();
    Bureau.load("/bureau.gltf", (gltf) => {
        gltf.scene.scale.setScalar(1.0)
        gltf.scene.position.x = 8
        gltf.scene.position.y = -3
        gltf.scene.position.z = 1
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = true
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
      scene.add(gltf.scene);
    });
    const Man  = new GLTFLoader();
    Man.load('/man/scene.gltf', (gltf) => {
        gltf.scene.scale.setScalar(4.5)
        gltf.scene.position.x = 3
        gltf.scene.position.y = -3
        gltf.scene.position.z = -2
        gltf.scene.rotation.y = -3
        gltf.scene.traverse(n => {
            if(n.isMesh){
                n.castShadow = true
                n.receiveShadow =true
                if(n.material.map) n.material.map.anisotropy = 16 
            }
        })
        console.log(gltf.scene);
      scene.add(gltf.scene);
    });
    //Lights
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.castShadow = true
    spotLight.shadow.bias = -0.0001
    spotLight.shadow.mapSize.width = 1024*4
    spotLight.shadow.mapSize.height = 1024*4
    scene.add(spotLight);

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820)
    scene.add(hemiLight)
 //Camera
 camera.position.set(0,1,3.5)
scene.rotation.y = 0.5
scene.position.x += 2
 function upDate(){
 }

 function render () {
     renderer.render(scene, camera)
     spotLight.position.set( camera.position.x + 10,camera.position.x + 10,camera.position.x + 10)
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

 

  return <div id="bureau_scene"></div>;
}
