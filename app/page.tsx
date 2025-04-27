"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";

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
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Content node 1", type: "content-node" },
      { id: 6, label: "Content node 2", type: "content-node" },
    ];

    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 5 },
      { from: 2, to: 4 },
      { from: 2, to: 6 },
    ];

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      nodes: {
        shape: "dot",
        size: 20,
        color: {
          background: "#ffffff",
          border: "#040404",
          highlight: {
            background: "#000000",
            border: "#000000",
          },
        },
        font: {
          color: "#000000",
        },
      },
      edges: {
        color: {
          color: "#000000",
          highlight: "#000000",
          hover: "#000000",
        },
      },
      physics: { enabled: true },
    };

    const network = new Network(containerRef.current, data, options);

    network.once("stabilizationIterationsDone", () => {
      network.focus(1, {
        scale: 1,
        animation: {
          duration: 500,
          easingFunction: "easeInOutQuad",
        },
      });
      network.selectNodes([1]);
    });

    network.on("selectNode", (params) => {
      if (params.nodes.length > 0 ) {
        const nodeId = params.nodes[0];
        const nodeData = nodes.find((node) => node.id === nodeId);

    
        network.focus(nodeId, {
          scale: 1,
          animation: {
            duration: 500,
            easingFunction: "easeInOutQuad",
          },
        });

        if (nodeData?.type === "content-node") {
          setSelectedNode(nodeId); 
          console.log("Selected node label:", nodeData.label);
        } else {
          console.log("close node")
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
      {selectedNode && (
        <div
          className="fixed inset-0 bg-transparent flex items-center justify-center z-50 m-2"
        
        >
          <div
            className="relative bg-black text-white rounded-2xl p-8 max-w-4xl w-full max-w-[50vh] max-h-[200vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-start">
                <h2 className="text-3xl font-bold mb-4">Node 1</h2>
                <Image
                  src="/images/image-1.jpg"
                  alt="Next.js logo"
                  width={180}
                  height={80}
                  priority
                />
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="mb-4 bg-white px-4 py-2 text-black rounded-lg hover:bg-gray-800"
                >
                  Close
                </button>
                <p className="text-lg text-right">
                  Mer info om denna node kan fyllas på här.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
