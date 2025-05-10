import React from "react";

interface AboutProps {
  setTextContent: React.Dispatch<React.SetStateAction<any>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<any>>;
  content: string;
}
const TextContent: React.FC<AboutProps> = ({ setTextContent, setSelectedNode, content }) => {
  
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center  z-50 m-2">
      <div
        className="relative bg-white text-white rounded-2xl p-8 max-w-4xl w-full max-w-[50vh]overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-6 text-black">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-4">Om oss</h2>
          </div>
          <div className="flex flex-col items-end ">
            <button
              onClick={() => 
                {setSelectedNode(null)
                setTextContent("")}}
              className="mb-4 bg-white px-4 py-2  rounded-lg hover:bg-gray-800 font-bold"
            >
              Stäng
            </button>
          </div>
        </div>
        <div className="grid  gap-6 text-black">
        {content}
        </div>
      </div>
    </div>
  );
};

export default TextContent;
