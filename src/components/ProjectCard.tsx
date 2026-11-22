import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  aspectRatio = 'aspect-[4/5]',
  className = ''
}) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block overflow-hidden transition-all duration-500 ${className}`}
    >
      {/* Image Container with Luxury Hover Zoom */}
      <div className={`relative w-full overflow-hidden bg-beige-200 ${aspectRatio}`}>
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="w-12 h-12 rounded-full bg-ivory/90 text-charcoal flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </div>

        {/* Category & Year Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-ivory/90 backdrop-blur-sm text-[10px] tracking-widest-luxury uppercase font-semibold text-charcoal">
            {project.category}
          </span>
          <span className="px-2 py-1 bg-charcoal/80 text-[10px] tracking-wider text-ivory backdrop-blur-sm font-light">
            {project.year}
          </span>
        </div>
      </div>

      {/* Typography & Details */}
      <div className="pt-5 pb-2 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-earth transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs uppercase tracking-luxury text-taupe mt-1 font-light">
            {project.location}
          </p>
        </div>
        <span className="text-xs tracking-widest text-taupe font-serif italic pt-1">
          {project.area}
        </span>
      </div>
    </Link>
  );
};
