import React, { useRef, useEffect } from "react";

interface Props {
  videoUrl: string;
  onVideoLoaded?: () => void;
}

const VideoBackground: React.FC<Props> = ({ videoUrl, onVideoLoaded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover z-0"
      onLoadedData={onVideoLoaded}
    />
  );
};

export default VideoBackground;
