'use client';
// Catch any error and log it out
process.on('uncaughtException', (err) => {
    console.log(err);
})
import { useEffect, useRef, useState } from "react";
import p5 from 'p5';
import { FireworkLogic } from "./fireworkLogics";
import { P5ExtendFunctionTypes } from "../p5extends";
import dynamic from "next/dynamic";
// let p5: any;
// if (typeof window !== "undefined") {
//     p5 = await import('p5');
// }

export default function FireworksElement() {
    useEffect(() => {
        console.log("Render FireworksElement");

        (async () => {
            // console.log(p5)
            const sketch = new p5((p: P5ExtendFunctionTypes) => {
                const fwlogic = new FireworkLogic(p);
                p.setup = function () {
                    fwlogic.setup();
                };

                p.draw = function () {
                    fwlogic.draw();
                };
            });
        })();
    }, []);

    return (
        <div>
            <div id="fireworks" />
        </div>
    );
}

