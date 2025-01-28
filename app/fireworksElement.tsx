'use client';
import { useEffect, useRef, useState } from "react";
import p5 from 'p5'
import { FireworkLogic } from "./firework/fireworkLogics";

export default function Fireworks() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sketch = new p5(p => {
            const fwlogic = new FireworkLogic(p);
            p.setup = function () {
                fwlogic.setup();
            };

            p.draw = function () {
                fwlogic.draw();
            };
        });
    }, []);

    return (
        <div>
            <div ref={canvasRef} />
        </div>
    );
}