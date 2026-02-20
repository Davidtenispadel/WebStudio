import React from 'react';

interface VideoBackgroundProps {
  onVideoLoaded: (url: string) => void;
  videoUrl: string | null;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
  // Direct Cloudinary MP4 URL for DB+ Home Video
  const targetVideo = "https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4";

  return (
    <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none bg-black">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        key={targetVideo}
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={targetVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;