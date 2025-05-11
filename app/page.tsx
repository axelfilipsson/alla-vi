"use client";
import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import ImageContent from "./image-content";
import TextContent from "./text-content";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  row-start-2 items-center sm:items-start w-full h-full">
        <NetworkGraph />
      </main>
    </div>
  );
}

const NetworkGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [textContent, setTextContent] = useState<string>("");
  const [imageContent, setImageContent] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = [
      { id: 1, label: "ALLA VI" },
      { id: 2, label: "Info" },
      {
        id: 3,
        label: "Bilder",
        type: "image-content",
        imageContent:
          ["IMG_6085.JPG", "IMG_6164.JPG", "IMG_6289.JPG", "IMG_6298.JPG"],
      },
      { id: 4, label: "Musik" },
      { id: 5, label: "Kontakt" },
      {
        id: 6,
        label: "Spotify",
        link: "https://open.spotify.com/artist/09U2Ob20upnckziSBhJrnU?si=HiallKtdQRu2SMHi4401zA",
      },
      {
        id: 7,
        label: "Youtube",
        link: "https://youtube.com/@allavisomspelarmusik?si=UX38DNjCKBAzIZEw",
      },
      {
        id: 8,
        label: "Soundcloud",
        link: "https://soundcloud.com/allavisomspelarmusik",
      },
      { id: 9, label: "Mail", link: "mailto:allavi.music@gmail.com" },
      {
        id: 10,
        label: "Facebook",
        link: "https://www.facebook.com/allavisomspelarmusik/",
      },
      {
        id: 11,
        label: "Instagram",
        link: "https://www.instagram.com/allavisomspelarmusik/",
      },
      {
        id: 12,
        label: "Om oss",
        type: "text-content",
        textContent:
          "Hej! Vi är ett band som har existerat i olika konstellationer under de senaste åren. I vår nuvarande uppsättning hämtar vi inspiration från genrer som krautrock, DnB samt klassisk gubbrock. Från och med 2025 släpper vi musik regelbundet och kommer framför allt fokusera på köra många roliga live-gig!",
      }
    ];

    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 2, to: 3 },
      { from: 2, to: 12 },
      { from: 4, to: 6 },
      { from: 4, to: 7 },
      { from: 4, to: 8 },
      { from: 5, to: 9 },
      { from: 5, to: 10 },
      { from: 5, to: 11 },
    ];
    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      nodes: {
        shape: "circle",
        size: 20,
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
        color: {
          background: "#ffffff",
          border: "#ffffff",
          highlight: {
            border: "#ffffff",
            background: "#ffffff",
          },
        },
        font: {
          color: "#000000",
          face: "Arial",
          size: 16,
          align: "center",
          vadjust: 0,
        },
      },
      edges: {
        color: {
          color: "#ffffff",
          highlight: "#ffffff",
          hover: "#000000",
        },
      },
      physics: { enabled: true },
    };

    const network = new Network(containerRef.current, data, options);

    network.once("stabilizationIterationsDone", () => {
      network.focus(1, {
        scale: 0.5,
        animation: {
          duration: 500,
          easingFunction: "easeInOutQuad",
        },
      });
      network.selectNodes([1]);
    });

    network.on("selectNode", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const nodeData = nodes.find((node) => node.id === nodeId);

        network.focus(nodeId, {
          scale: 1,
          animation: {
            duration: 500,
            easingFunction: "easeInOutQuad",
          },
        });

        if (nodeData?.link?.length) {
          window.open(nodeData.link, "_blank");
          return;
        }

        if (nodeData?.type === "text-content") {
          setTextContent(nodeData?.textContent ?? "");
          setSelectedNode(nodeId);
        } else if (nodeData?.type === "image-content") {
          setImageContent(nodeData?.imageContent ?? []);
          setSelectedNode(nodeId);
        } else {
          setSelectedNode(null);
        }
      }
    });

    return () => {
      network.destroy();
    };
  }, []);


  return (
    <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
      {selectedNode && textContent && (
        <TextContent setTextContent={setTextContent} setSelectedNode={setSelectedNode} content={textContent} />
      )}
      {selectedNode && imageContent.length > 0 && (
        <ImageContent setImageContent={setImageContent} setSelectedNode={setSelectedNode} content={imageContent} />
      )}
    </div>
  );
};
