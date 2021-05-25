import './style.css'

import { default as application } from './App';
import { addStar } from './renders/meshes/stars';
import { ambientLight, pointLight } from './renders/lights/lights';
import { Mesh, MeshStandardMaterial, SphereGeometry, TextureLoader, Vector3 } from "three";

(() => {
    for (let i = 0; i < 2000; i++) {
        addStar(`star-${i}`);
    }

    application.addLights(
        {identifier: 'ambient_light', light: ambientLight},
        {identifier: 'point_light', light: pointLight},
    );

    const earthTexture = new TextureLoader().load('../background.jpeg');
    const earth = new Mesh(
        new SphereGeometry(3, 32, 32),
        new MeshStandardMaterial({
                map: earthTexture,
        })
    );

    earth.setRotationFromAxisAngle(new Vector3(0.5,0,0), 20);

    application.addMesh(earth, 'earth');

    application.animate('earth');

    window.addEventListener('keydown', (e) => {
        if (e.code == 'KeyO') {
            application.toggleOrbitControls();
        }

        if (e.code == 'KeyG') {
            application.toggleGrid('grid');
        }
    })
})();
