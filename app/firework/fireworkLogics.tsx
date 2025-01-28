/**
 * Firework Logic
 * @author YuzukaTeam (aka. Quanvndzai)
 * @license MIT
 * @version 1.0.0
 * @description Firework logic for p5.js (Write in TypeScript)
 * @copyright 2024 YuzukaTeam
 * @link <add github link later>
 */
import { P5ExtendFunctionTypes } from "../p5extends";
import p5 from 'p5';
import { randomColor } from "../utils/colorUtils";

/**
 * Fireworks and particles
 */
var fireworks: Firework[] = [];
var particles: Particle[] = [];
const FIREWORK_EXPLODE_COUNT = 40;
const FIREWORK_RATE = 40;

/**
 * Firework Logic class
 */
export class FireworkLogic {

    /**
     * p5 instance
     */
    private readonly sketch: P5ExtendFunctionTypes;
    /**
     * gravity force
     */
    private readonly gravity: p5.Vector;

    /**
     * constructor
     * @param {P5ExtendFunctionTypes} sketch p5 instance
     */
    constructor(sketch: any) {
        this.sketch = sketch;
        this.gravity = this.sketch.createVector(0, 0.1);
    }

    /**
     * setup function for p5
     */
    public setup() {
        var canvas: any = this.sketch.createCanvas(1200, 800);
        canvas.parent('fireworks');
    }

    /**
     * draw function for p5
     */
    public draw() {
        this.sketch.background(0, 20);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            const firework = fireworks[i];
            firework.applyForce(this.gravity);
            firework.update();
            firework.draw();

            if(!firework.isAlive()) {
                fireworks.splice(i, 1);
                // Spawn particle
                for(let j = 0; j < FIREWORK_EXPLODE_COUNT; j++) {
                    const angle = j * this.sketch.TWO_PI / FIREWORK_EXPLODE_COUNT;
                    const velocity = p5.Vector.fromAngle(angle);
                    velocity.setMag(5);
                    particles.push(new Particle(this.sketch,
                        firework.position.x, firework.position.y,
                        60));
                    particles[particles.length - 1].velocity = velocity;
                }
            }

            // out of screen -> delete
            if(firework.position.y > this.sketch.height) {
                fireworks.splice(i, 1);
            }
        }

        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.applyForce(this.gravity);
            particle.update();
            particle.draw();

            if(!particle.isAlive()) {
                particles.splice(i, 1);
            }

            // out of screen -> delete
            if(particle.position.y > this.sketch.height) {
                particles.splice(i, 1);
            }
        }


        if (this.sketch.frameCount % FIREWORK_RATE === 0) {
            // this.sketch.background(0);
            fireworks.push(new Firework(this.sketch, 
                this.sketch.width / 2, this.sketch.height - 100,
                60
            ));
        }
    }

}

/**
 * Particle class
 */
class Particle {
    /**
     * p5 instance
     */
    protected readonly sketch: P5ExtendFunctionTypes;
    /**
     * position vector
     */
    public position: p5.Vector;
    /**
     * velocity vector
     */
    public velocity: p5.Vector;
    /**
     * acceleration vector
     */
    public acceleration: p5.Vector;
    /**
     * lifetime
     */
    public lifetime: number;
    /**
     * color
     */
    protected color: any;

    /**
     * constructor
     * @param {P5ExtendFunctionTypes} sketch p5 instance
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} lifetime lifetime
     */
    constructor(sketch: P5ExtendFunctionTypes, x: number = 0, y: number = 0, lifetime = 60) {
        this.sketch = sketch;
        this.position = this.sketch.createVector(x, y);
        let speed = 5;
        this.velocity = this.sketch.createVector(sketch.random(-speed, speed), sketch.random(-speed, speed));
        this.acceleration = this.sketch.createVector(0, 0);
        this.lifetime = lifetime;
        this.color = randomColor();
    }

    /**
     * apply force to particle
     * @param {p5.Vector} force force vector
     */
    public applyForce(force: p5.Vector): void {
        this.acceleration.add(force);
    }

    /**
     * update particle
     */
    public update(): void {
        if(!this.isAlive()) return; // Stop update when particle is not alive
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);

        this.lifetime--;
    }

    /**
     * draw particle
     */
    public draw(): void {
        this.sketch.stroke(...this.color);
        this.sketch.strokeWeight(5);
        this.sketch.point(this.position.x, this.position.y);
    }

    /**
     * check if particle is alive
     * @return {boolean} true if particle is alive
     */
    public isAlive(): boolean {
        return this.lifetime > 0;
    }
}

/**
 * Firework class
 */
class Firework extends Particle {

    /**
     * constructor
     * @param {P5ExtendFunctionTypes} sketch p5 instance
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} lifetime lifetime
     */
    constructor(sketch: P5ExtendFunctionTypes, x: number = 0, y: number = 0, lifetime: number = 300) {
        super(sketch, x, y, lifetime);
        // random up velocity and direction
        this.velocity = this.sketch.createVector(
            this.sketch.random(-5, 5), this.sketch.random(-11.5, -7)
        );
    }

    /**
     * draw firework
     */
    public draw(): void {
        this.sketch.stroke(...this.color);
        this.sketch.strokeWeight(10);
        this.sketch.point(this.position.x, this.position.y);
    }

}