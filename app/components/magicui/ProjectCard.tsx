import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
}

const ProjectCard = ({ src, title, description }: Props) => {
  return (
    <div className="project-card grid grid-rows-[2fr,1fr] rounded-lg shadow-lg border border-[#2A0E61] w-full h-[550px] overflow-hidden">
      <div className="w-full relative z-10"> {/* Ajoutez z-10 ici */}
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between text-[#273c75] z-20"> {/* Ajoutez z-20 ici */}
        <h2 className="text-xl md:text-xl font-semibold text-[#273c75]">{title}</h2>
        <p className="text-sm md:text-base text-[#273c75]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;


