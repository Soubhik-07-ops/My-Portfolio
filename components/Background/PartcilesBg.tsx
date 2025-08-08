import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";

const ParticleBackground = () => {
    // This function loads the tsparticles engine
    const particlesInit = useCallback(async (engine: Engine) => {
        // You can initiate the tsParticles instance (engine) here, adding custom shapes or presets.
        // This loads the full bundle, providing all features.
        await loadFull(engine);
    }, []);

    // This function is called when the particles container is loaded
    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log("Particles container loaded", container);
        },
        []
    );

    // tsParticles configuration object
    const options: ISourceOptions = {
        key: "parallax",
        name: "Parallax",
        autoPlay: true,
        background: {
            color: {
                value: "transparent",
            },
        },
        fullScreen: {
            enable: true,
            zIndex: 0,
        },
        detectRetina: true,
        fpsLimit: 120,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                        enable: true,
                        force: 60,
                        smooth: 10,
                    },
                },
                resize: {
                    delay: 0.5,
                    enable: true,
                },
            },
            modes: {
                grab: {
                    distance: 400,
                    links: {
                        opacity: 1,
                    },
                },
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffffff",
            },
            links: {
                color: {
                    value: "#ffffff",
                },
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 100,
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 0.5,
                },
                animation: {
                    enable: true,
                    speed: 3,
                    sync: false,
                    startValue: "random",
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: {
                    min: 1,
                    max: 10,
                },
                animation: {
                    enable: true,
                    speed: 20,
                    sync: false,
                    startValue: "random",
                },
            },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
        />
    );
};

export default ParticleBackground;