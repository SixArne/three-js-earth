import { GridHelper, Light, Mesh, Object3D, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Application {
    private readonly camera: PerspectiveCamera;
    private readonly scene: Scene;
    private readonly grid: GridHelper;

    private renderer: WebGLRenderer;
    private controls: OrbitControls | null = null;
    private objects: Map<string, Object3D> = new Map<string, Object3D>();

    public constructor(canvas: HTMLCanvasElement, grid: GridHelper) {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({
            canvas: canvas,
        });
        this.camera = new PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.grid = grid;

        this.camera.position.setZ(30);
        this.renderer.render(this.scene, this.camera);
    }

    public addMesh(geometry: Mesh, identifier: string): void {
        this.scene.add(geometry);
        this.objects.set(identifier, geometry);
    }

    public addLight(light: Light, identifier: string): void{
        this.scene.add(light);
        this.objects.set(identifier, light);
    }

    public addLights(...meshesAndIdentifiers: {identifier: string, light: Object3D}[]): void {
        meshesAndIdentifiers.forEach((meshIdentifier: {identifier: string, light: Object3D}) => {
           this.scene.add(meshIdentifier.light);
           this.objects.set(meshIdentifier.identifier, meshIdentifier.light);
        });
    }

    public toggleGrid(identifier: string): void {
        if (this.objects.get(identifier) !== undefined) {
            this.scene.remove(<Object3D>this.objects.get(identifier));
            this.objects.delete(identifier);
        } else {
            this.scene.add(this.grid);
            this.objects.set(identifier, this.grid);
        }
    }

    public removeObject(identifier: string): boolean {
        return this.objects.delete(identifier);
    }

    public toggleOrbitControls(): void {
        if (this.controls === null) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        } else {
            this.controls.dispose();
            this.controls = null;
        }
    }

    public setBackground(imagePath: string) {
        this.scene.background = new TextureLoader().load(imagePath);
    }

    public animate(identifier: string) {
        requestAnimationFrame( () => this.animate(identifier) );

        const mesh: Mesh = this.objects.get(identifier) as Mesh;

        if (this.controls !== null) {
            this.controls.update();
        }

        mesh.rotation.y += 0.005;

        this.renderer.render(this.scene, this.camera);
    }
}

export default new Application(
    document.querySelector('#bg') as HTMLCanvasElement,
    new GridHelper(200, 50)
);
