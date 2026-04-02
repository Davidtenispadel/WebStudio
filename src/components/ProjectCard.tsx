import React from "react";
import { Project } from "../types";

interface Props {
  project: Project;
  onClick: (p: Project) => void;
  currentSectionName: string;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="cursor-pointer group bg-white/70 backdrop-blur-md shadow-xl p-4 rounded-xl border border-white/30 hover:scale-[1.02] transition-transform"
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
    </div>
  );
};

export default ProjectCard;
