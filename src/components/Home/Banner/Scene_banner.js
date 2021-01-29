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
    el.appendChild(renderer.domElement);
    //responsivness
    window.addEventListener("resize", function () {
      const width = el.clientWidth;
      const height = el.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    var Box = new THREE.BoxGeometry(1,1,1);
    //create a matérial
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true})
    var cube = new THREE.Mesh(Box, material)
    cube.position.z = -10
    
    scene.add(cube)

    //Load Models
    const Man = new GLTFLoader();
    Man.load("/public/Man/bureau.gltf", (gltf) => {
      scene.add(gltf.scene);
    });
    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
 //Camera
 camera.position.z = 3

 function upDate(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
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

 

  return <div id="bureau_scene"></div>;
}
