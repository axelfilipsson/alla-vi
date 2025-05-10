import React from "react";
import Image from "next/image";

interface AboutProps {
  setImageContent: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<number | null>>;
  content: string[];
}
const About: React.FC<AboutProps> = ({ setImageContent, setSelectedNode, content }) => {
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center  z-50 m-2">
      <div
        className="relative bg-white text-white rounded-2xl p-8 max-w-4xl w-full max-w-[50vh]overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-6 text-black">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-4">Bilder</h2>
          </div>
          <div className="flex flex-col items-end ">
            <button
              onClick={() => 
                {setSelectedNode(null)
                setImageContent([])}}
              className="mb-4 bg-white px-4 py-2  rounded-lg hover:bg-gray-800 font-bold"
            >
              Stäng
            </button>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto space-y-4 mt-4">
        {content.map((image) => (
          <div key={image} className="relative w-full aspect-video mb-4">
            <Image
              src={`/images/${image}`}
              alt="Next.js logo"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default About;
