import React from "react";
import { X } from "lucide-react";
import { Project } from "../types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[999] flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
        >
          <X className="h-6 w-6" />
        </button>

        <img
          src={project.imageUrl}
          className="w-full h-auto rounded-xl mb-4"
          loading="lazy"
        />
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-gray-700">{project.description}</p>

        {project.additionalImages?.length > 1 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {project.additionalImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="rounded-xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
