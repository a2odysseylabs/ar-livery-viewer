import React, { useEffect, useState, useRef } from "react";
import { TbHexagon3D } from "react-icons/tb";
import classNames from "classnames";

import { darkenColor } from "../utils/darkenColor";
import { getTeamListByYear } from "../utils/teamList";

import "./ARViewer.css";

export const ARViewer = () => {
    const [year, setYear] = useState("2025");
    const [teamList, setTeamList] = useState(getTeamListByYear(year));
    const [team, setTeam] = useState(teamList[0]);
    const [glbLink, setGlbLink] = useState(ARViewer.defaultProps.glbLink);
    const [isGLBLoading, setIsGLBLoading] = useState(true);
    const modelViewerRef = useRef(null);

    const teamName = team.name.replace(/_/g, " ");

    useEffect(() => {
        setTeamList(getTeamListByYear(year));
        setTeam(getTeamListByYear(year)[0]);
        setGlbLink(
            `${
                process.env.PUBLIC_URL +
                "/ArFiles/glbs/" +
                year +
                "/" +
                getTeamListByYear(year)[0].name +
                ".glb"
            }`
        );
    }, [year]);

    useEffect(() => {
        const modelViewer = modelViewerRef.current;

        const onProgress = (event) => {
            const progressBar = event.target.querySelector(".progress-bar");
            const updatingBar = event.target.querySelector(".update-bar");

            updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
            if (event.detail.totalProgress === 1) {
                progressBar.classList.add("hide");
                event.target.removeEventListener("progress", onProgress);
            } else {
                progressBar.classList.remove("hide");
            }
        };

        const handleModelLoad = () => {
            setIsGLBLoading(false);
        };

        if (modelViewer) {
            modelViewer.addEventListener("progress", onProgress);
            modelViewer.addEventListener("load", handleModelLoad);
        }

        return () => {
            if (modelViewer) {
                modelViewer.removeEventListener("progress", onProgress);
                modelViewer.removeEventListener("load", handleModelLoad);
            }
        };
    }, [team]); // Depend on glbLink to re-run the effect when it changes

    useEffect(() => {
        // Reset loading state when `glbLink` changes
        setIsGLBLoading(true);
    }, [glbLink]);

    return (
        <>
            <div className="ar-container">
                <div className="model-viewer-wrapper">
                    <model-viewer
                        ref={modelViewerRef}
                        poster={ARViewer.defaultProps.img}
                        src={glbLink}
                        ar-modes={ARViewer.defaultProps.arModes}
                        ar={ARViewer.defaultProps.ar}
                        ar-scale={ARViewer.defaultProps.arScale}
                        camera-controls={ARViewer.defaultProps.cameraControls}
                        exposure={ARViewer.defaultProps.exposure}
                        loading={ARViewer.defaultProps.loading}
                        shadow-intensity={ARViewer.defaultProps.shadowIntensity}
                        shadow-softness={ARViewer.defaultProps.shadowSoftness}
                        alt={ARViewer.defaultProps.alt}
                    >
                        <div class="progress-bar" slot="progress-bar">
                            <div class="update-bar" />
                        </div>
                        <button
                            slot="ar-button"
                            className="ar-button shadow-md absolute left-1/2 translate-x-[-50%] w-[90%] flex justify-center items-center rounded-t-lg font-bold font-display drop-shadow-md "
                            style={{
                                borderTop: `1px solid ${team.color}`,
                            }}
                        >
                            <TbHexagon3D className="mr-2" />
                            Launch AR
                        </button>
                    </model-viewer>

                    <div className="ar-badge leading-none text-sm">
                        <div>AR Enabled</div>
                        <div>Mobile Devices</div>
                    </div>
                </div>

                {/* todo: redo this if possible */}
                <style jsx="true">{`
                    model-viewer {
                        background-color: ${team.color};
                        background: radial-gradient(
                            circle,
                            ${team.color} 0%,
                            ${darkenColor(team.color, 40)} 80%
                        );
                    }
                    model-viewer::before {
                        content: "${teamName}";
                    }
                `}</style>
            </div>

            {/* Team Buttons */}
            <div className="mt-64">
                <div className="flex flex-row justify-center gap-16 pt-40">
                    <button 
                        className={classNames(
                            "tracking-wide py-4 pl-16 pr-8 rounded-md",
                            {
                                "gradient-text-light": year !== "2024",
                                "bg-plum-500": year === "2024",
                                "bg-glow-dark-shadow": year === "2024"
                            }
                        )}
                        onClick={() => {
                            setYear("2024");
                            
                        }}
                    >
                        2024
                    </button>
                    <button 
                        className={classNames(
                            "tracking-wide py-4 pl-16 pr-8 rounded-md",
                            {
                                "gradient-text-light": year !== "2025",
                                "bg-plum-500": year === "2025",
                                "bg-glow-dark-shadow": year === "2025"
                            }
                        )}
                        onClick={() => {
                            setYear("2025");
                            
                        }}
                    >
                        2025
                    </button>
                </div>

                <div className="flex flex-row justify-center flex-wrap gap-16 p-40">
                    {teamList.map((team, index) => {
                        return (
                            <button
                                key={index}
                                style={{ backgroundColor: team.color }}
                                className={classNames(
                                    "text-white p-2 rounded inline-flex flex-col items-center text-center bg-glow-dark mt-16 max-md:w-[45%]"
                                )}
                                onClick={() => {
                                    setGlbLink(
                                        `${
                                            process.env.PUBLIC_URL +
                                            "/ArFiles/glbs/" + year + "/" +
                                            team.name +
                                            ".glb"
                                        }`
                                    );
                                    setTeam(team);
                                }}
                            >
                                <img
                                    src={`${
                                        process.env.PUBLIC_URL +
                                        "/images/" + year + "/cars/" +
                                        team.name +
                                        ".png"
                                    }`}
                                    alt={team.name}
                                    className="w-[10rem] -mt-16"
                                />
                                <p className="font-display">
                                    {team.name.replace(/_/g, " ")}
                                </p>
                            </button>
                        );
                    })}
                </div>

                <h2 className="tracking-wide text-center gradient-text-light">
                    Special edition
                </h2>

                <div className="flex flex-row justify-center flex-wrap gap-16 p-32">
                    <button
                        style={{ backgroundColor: "#AE7D0E" }}
                        className={classNames(
                            "text-white p-2 rounded inline-flex flex-col items-center text-center bg-glow-dark mt-16 max-md:w-[45%]"
                        )}
                        onClick={() => {
                            setGlbLink(
                                `${
                                    process.env.PUBLIC_URL +
                                    "/ArFiles/glbs/2024/apx.glb"
                                }`
                            );
                            setTeam({
                                name: "apx",
                                color: "#AE7D0E",
                            });
                        }}
                    >
                        <img
                            src={`${
                                process.env.PUBLIC_URL +
                                "/images/2024/cars/apx.png"
                            }`}
                            alt={team.name}
                            className="w-[10rem] -mt-16"
                        />
                        <p className="font-display">APX</p>
                    </button>
                    <button
                        style={{ backgroundColor: "#7500AD" }}
                        className={classNames(
                            "text-white p-2 rounded inline-flex flex-col items-center text-center bg-glow-dark mt-16 max-md:w-[45%]"
                        )}
                        onClick={() => {
                            setGlbLink(
                                `${
                                    process.env.PUBLIC_URL +
                                    "/ArFiles/glbs/2024/f1nsight2022.glb"
                                }`
                            );
                            setTeam({
                                name: "F1Nsight",
                                color: "#7500AD",
                            });
                        }}
                    >
                        <img
                            src={`${
                                process.env.PUBLIC_URL +
                                "/images/2024/cars/f1nsight-sideview.png"
                            }`}
                            alt={team.name}
                            className="w-[10rem] -mt-16"
                        />
                        <p className="font-display">F1NSIGHT 2022</p>
                    </button>
                    <button
                        style={{ backgroundColor: "#7500AD" }}
                        className={classNames(
                            "text-white p-2 rounded inline-flex flex-col items-center text-center bg-glow-dark mt-16 max-md:w-[45%]"
                        )}
                        onClick={() => {
                            setGlbLink(
                                `${
                                    process.env.PUBLIC_URL +
                                    "/ArFiles/glbs/2024/f1nsight2024.glb"
                                }`
                            );
                            setTeam({
                                name: "F1Nsight",
                                color: "#7500AD",
                            });
                        }}
                    >
                        <img
                            src={`${
                                process.env.PUBLIC_URL +
                                "/images/2024/cars/F1Nsight.png"
                            }`}
                            alt={team.name}
                            className="w-[10rem] -mt-16"
                        />
                        <p className="font-display">F1NSIGHT 2024</p>
                    </button>
                    <button
                        style={{ backgroundColor: "#7500AD" }}
                        className={classNames(
                            "text-white p-2 rounded inline-flex flex-col items-center text-center bg-glow-dark mt-16 max-md:w-[45%]"
                        )}
                        onClick={() => {
                            setGlbLink(
                                `${
                                    process.env.PUBLIC_URL +
                                    "/ArFiles/glbs/2025/f1nsight2025.glb"
                                }`
                            );
                            setTeam({
                                name: "F1Nsight",
                                color: "#7500AD",
                            });
                        }}
                    >
                        <img
                            src={`${
                                process.env.PUBLIC_URL +
                                "/images/2025/cars/F1Nsight.png"
                            }`}
                            alt={team.name}
                            className="w-[10rem] -mt-16"
                        />
                        <p className="font-display">F1NSIGHT 2025</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ARViewer;

ARViewer.defaultProps = {
    glbLink: `${process.env.PUBLIC_URL + "/ArFiles/glbs/2024/mclaren.glb"}`,
    img: `${process.env.PUBLIC_URL + "/ArFiles/poster-mclaren.webp"}`,
    buttonIcon: `${process.env.PUBLIC_URL + "/APX/3diconWhite.png"}`,
    loading: "auto",
    reveal: "auto",
    autoRotate: true,
    cameraControls: true,
    shadowIntensity: "1",
    shadowSoftness: "1",
    environmentImage: "neutral",
    skyboxImage: null,
    exposure: "1",
    ar: true,
    arModes: "scene-viewer webxr quick-look",
    arScale: "auto",
    arPlacement: "floor",
    alt: "APX GP Model",
};
