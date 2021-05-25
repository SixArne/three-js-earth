import {MathUtils, Mesh, MeshStandardMaterial, SphereGeometry} from 'three';
import {default as application} from '../../App';

export const addStar = (identifier: string) => {
    const geometry = new SphereGeometry(0.05);
    const material = new MeshStandardMaterial({color: 0xffffff});
    const star = new Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(3).map(() => MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    application.addMesh(star, identifier);
}
