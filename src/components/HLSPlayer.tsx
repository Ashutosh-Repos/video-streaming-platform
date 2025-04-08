import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  src: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [qualities, setQualities] = useState<{ index: number; name: string }[]>(
    []
  );
  const [selectedQuality, setSelectedQuality] = useState<number>(-1);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(videoRef.current as HTMLVideoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({
          index,
          name: level.height ? `${level.height}p` : `Level ${index + 1}`,
        }));
        setQualities([{ index: -1, name: "Auto" }, ...levels]);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setSelectedQuality(data.level);
      });
    } else if (videoRef.current) {
      videoRef.current.src = src;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setMuted(newVolume === 0);
    }
  };

  const handleQualityChange = (index: number) => {
    setSelectedQuality(index);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = index;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        controls={false}
        width="100%"
        className="rounded-lg border-2 border-gray-600 w-full"
      />

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 flex items-center justify-between transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Play/Pause Button */}
        <button onClick={togglePlay} className="text-white text-xl p-2">
          {playing ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Progress Bar */}
        <input
          type="range"
          className="w-full mx-2"
          value={progress}
          onChange={() => {}}
        />

        {/* Volume Control */}
        <div className="flex items-center">
          <button onClick={toggleMute} className="text-white text-xl p-2">
            {muted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="10" width="12" height="4" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="6,10 12,4 12,20 6,14" />
              </svg>
            )}
          </button>
          <input
            type="range"
            className="w-10 mx-2"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        {/* Quality Selector */}
        {qualities.length > 1 && (
          <select
            className="p-1 border rounded bg-gray-800 text-white"
            value={selectedQuality}
            onChange={(e) => handleQualityChange(Number(e.target.value))}
          >
            {qualities.map((quality) => (
              <option key={quality.index} value={quality.index}>
                {quality.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default HLSPlayer;
