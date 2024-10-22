import * as THREE from 'three';
import { useEffect } from 'react';
import './scene.css';
import { useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { gsap } from 'gsap';

export default function Scene() {


  
  useEffect(() => {

  //! Function to scroll to the top of the page
  window.scrollTo(0, 0)

    //!create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas'),
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // //!create controls
    // const controls = new OrbitControls(camera, renderer.domElement);

    // !create torus
    const geometryTorus = new THREE.TorusKnotGeometry(5, 3, 44, 8, 14, 3);
    const materialTorus = new THREE.MeshStandardMaterial({ color: "rgb(255, 255, 255)", wireframe: true });
    const torus = new THREE.Mesh(geometryTorus, materialTorus);
    torus.position.set(0, 0, -14);
    scene.add(torus);
    camera.position.setZ(10);

    //! sphere fallow the cursor
    const geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);
    const materialSphere = new THREE.MeshBasicMaterial({ color: "rgb(253, 253, 253)"  });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphere);

    
    //! load model

//! Load model
let loadedModel = null; // Define variable to store the loaded model

const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/path/to/draco/'); // Path to Draco decoder
// gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/src/assets/scene.gltf', (gltfScene) => {
  loadedModel = gltfScene.scene; // Save the loaded model

  gltfScene.scene.traverse((child) => {
    if (child.isMesh) {
      child.frustumCulled = true; // Ensure culling is enabled
    }
  });

  gltfScene.scene.scale.set(10, 10, 10);
  gltfScene.scene.position.set(5, -13, -4);

  scene.add(gltfScene.scene);
});


    


    //!create light
    const pointLight = new THREE.PointLight(0xffffff, 50);
    const originalPosition = new THREE.Vector3(0, 0, 0); //? Store the original light position
    pointLight.position.copy(originalPosition); //? Set initial position
    scene.add(pointLight);

    //!create a second light behind the torus
    const pointLight2 = new THREE.PointLight("rgb(255, 255, 255)", 30);
    pointLight2.position.z = -30;



    //! Mouse interaction setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const targetPosition = new THREE.Vector3(); //? Store the target position
    let isMouseMoving = false;
    let mouseMoveTimeout;

    // Rotation speed
    let rotationSpeed = 0; //? Start with no rotation
    const maxRotationSpeed = 0.001; //? Maximum speed of rotation
    const smoothStopSpeed = 0.001; //? Smooth stop factor

    //! Function to handle mouse movement
    function onMouseMove(event) {
      isMouseMoving = true;

      //* normalize mouse coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      //* update raycaster
      raycaster.setFromCamera(mouse, camera);

      //* create a plane to project the mouse position onto
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectPoint = new THREE.Vector3();

      //* find the intersection point
      raycaster.ray.intersectPlane(planeZ, intersectPoint);

      //* pdate the target position
      targetPosition.copy(intersectPoint);

      //! Scale up the sphere
        gsap.to(sphere.scale, {
          x: 0.3,
          y: 0.3,
          z: 0.3,
          duration: 2,	
          ease: 'power1.out'
        });

      //* clear timeout and reset for 5 seconds
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(onMouseStop, 1000);
    }

    //! Function to handle when the mouse stops moving
    function onMouseStop() {
      gsap.to(sphere.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: 'power1.out'
      });
      
      isMouseMoving = false;
      targetPosition.copy(originalPosition); //? Return light to its original position
    }

    window.addEventListener('mousemove', onMouseMove);



    //! Function to add stars
    const stars = []; //? Array to hold the stars

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.1, 24, 24);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
    
      // Random position for the star
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
      star.position.set(x, y, z);
    
      scene.add(star);
      stars.push(star); // Add the star to the array
    }
    
    Array(300).fill().forEach(addStar);
    
    //! Scroll event listener
    function handleScroll() {
      let scrollY = window.scrollY;
    
      if (loadedModel && document.body.scrollHeight > 1600) {
        //* Rotate the loaded model on the Z-axis based on scrollY
        gsap.to(loadedModel.rotation, {
          y: scrollY * 0.001, // Adjust the rotation based on scroll
          duration: 2,        // Smooth animation duration
          ease: 'power1.out', // Easing function
        });
    
        pointLight2.position.z = 0;
        pointLight.position.y = 10;
      } else {
        gsap.to(loadedModel.rotation, {
          y: 0,
          duration: 2,
          ease: 'power1.out',
        });
    
        pointLight2.position.z = -30;
      }
    
      gsap.to(torus.scale, {
        x: 5,
        y: 5,
        z: 5,
        duration: 2,
        ease: 'power1.out',
      });
      Array(10).fill().forEach(addStar)
      
    
      //! Move stars on scroll
      stars.forEach(star => {
        const movementFactor = scrollY * 0.005; // Adjust movement speed based on scroll

        // You can move the stars along the Z-axis to create depth movement
        gsap.to(star.position, {
          z: star.position.z + movementFactor,
          duration: 1,
          ease: 'power1.out',
        });
       
      });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    


    //!resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);
     
        
    
    
    //!animate
    function animate() {
      requestAnimationFrame(animate);

      // Smoothly move the PointLight towards the target position
      const speed = 0.5;
      pointLight.position.lerp(targetPosition, speed);
      sphere.position.lerp(targetPosition, speed);

      // Smoothly control the torus rotation based on mouse movement
      if (!isMouseMoving && pointLight.position.distanceTo(originalPosition) < 0.1) {
       
        scene.add(pointLight2);
        sphere.visible = false;

        // Gradually increase rotation speed when the mouse is not moving
        rotationSpeed = THREE.MathUtils.lerp(rotationSpeed, maxRotationSpeed, 0.02); // Smooth increase
      } else {
        // Gradually decrease rotation speed when the mouse is moving
        rotationSpeed = Math.max(0, rotationSpeed - smoothStopSpeed); // Smooth stop
        scene.remove(pointLight2);
        sphere.visible = true;

  
    }

      // Apply rotation to the torus
      
      torus.rotation.z += rotationSpeed;

      renderer.render(scene, camera);
    }
    animate();
    //! Cleanup on unmount
    return () => {


      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);

      console.log('its responsive dont worry :)')
    };


  }, []);

  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  );
}
