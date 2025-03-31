import { useState, DragEvent as ReactDragEvent, ChangeEvent } from "react";
import "./App.css";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleDrag = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Colour Picker Palette Builder</h1>

        <div className="flex flex-row items-stretch gap-6">
          <div
            className="relative flex-grow"
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <label
              className={`block px-4 py-2 text-white text-center
                ${isDragging ? "bg-blue-300" : "bg-blue-500"}
                rounded cursor-pointer hover:bg-blue-600`}
            >
              Drop files here or click to upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
                multiple={false}
              />
            </label>
          </div>

          {image && (
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600
              text-white text-center rounded cursor-pointer"
              onClick={() => setImage(null)}
            >
              Clear image
            </button>
          )}
        </div>

        {image && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Uploaded image:</h2>
            <div className="border rounded-sm overflow-hidden">
              <img
                src={image}
                alt="Uploaded image"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
      <footer className="mt-10 flex flex-col justify-center items-center">
        <div>Made with love.</div>
        <div>Copyright © 2025-{new Date().getFullYear()} Luka Ivanović</div>
      </footer>
    </div>
  );
}

export default App;
