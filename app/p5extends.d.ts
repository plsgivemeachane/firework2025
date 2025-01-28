import p5 from 'p5';

export type P5ColorType = [
    (gray: number) => void,
    (gray: number, alpha: number) => void,
    (red: number, green: number, blue: number) => void,
    (red: number, green: number, blue: number, alpha: number) => void,
][number];


export abstract class P5ExtendFunctionTypes {

    public Vector: any;

    public TWO_PI: number;

    /**
     * A Number variable that stores the width of the canvas in pixels.
    */
    public width: number;

    /**
     * A Number variable that stores the height of the canvas in pixels.
    */
    public height: number;

    /** 
     * A Number variable that tracks the number of frames drawn since the sketch started.
    */
    public frameCount: number;

    /**
     * Creates a canvas element on the web page.
     * @description createCanvas() creates the main drawing canvas for a sketch. It should only be called once at the beginning of setup(). Calling createCanvas() more than once causes unpredictable behavior.
     * @param w Width of the canvas
     * @param h Height of the canvas
     */
    public abstract createCanvas(w: number, h: number): any;
    public abstract setup(): void;
    public abstract draw(): void;
    public abstract background(...args): P5ColorType;
    public abstract ellipse(x: number, y: number, w: number, h: number): void;
    public abstract point(x: number, y: number): void;
    public abstract strokeWeight(weight: number): void;
    public abstract createVector(x: number, y: number): p5.Vector;
    public abstract stroke(...args): P5ColorType;
    public abstract random(min: number, max: number): number;
}