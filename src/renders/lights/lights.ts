import { AmbientLight, PointLight } from 'three';

export const pointLight = new PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);

export const ambientLight = new AmbientLight(0xFFFFFF);
