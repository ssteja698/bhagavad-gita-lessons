import React, { useEffect, useRef, useState } from 'react';
import { getVideoTimestamp, saveVideoTimestamp, getVideoProgressData, formatTime } from '../utils/videoProgress';

interface YouTubeEmbedProps {
  youtubeId: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeId }) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasRestoredTimestamp, setHasRestoredTimestamp] = useState(false);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    }
  }, [youtubeId]);

  const createPlayer = () => {
    if (!containerRef.current) return;

    // Get saved timestamp
    const savedTime = getVideoTimestamp(youtubeId);

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '100%',
      width: '100%',
      videoId: youtubeId,
      playerVars: {
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        start: savedTime > 0 ? savedTime : 0,
      },
      events: {
        onReady: (event: any) => {
          setIsPlayerReady(true);
          if (savedTime > 0) {
            event.target.seekTo(savedTime);
            setHasRestoredTimestamp(true);
          }
        },
        onStateChange: (event: any) => {
          // Save timestamp when video is paused or ended
          if (event.data === window.YT.PlayerState.PAUSED || 
              event.data === window.YT.PlayerState.ENDED) {
            const currentTime = event.target.getCurrentTime();
            saveVideoTimestamp(youtubeId, currentTime);
          }
        },
      },
    });
  };

  // Update current time periodically
  useEffect(() => {
    if (!isPlayerReady) return;

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time);
        setDuration(dur);
        
        // Save timestamp every 5 seconds
        if (Math.floor(time) % 5 === 0) {
          saveVideoTimestamp(youtubeId, time);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayerReady, youtubeId]);

  const progressData = getVideoProgressData(youtubeId);

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      {/* Progress Indicator */}
      {progressData && progressData.timestamp > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          <div className="flex items-center gap-2">
            <span>📺 Resumed from {formatTime(progressData.timestamp)}</span>
            {hasRestoredTimestamp && (
              <span className="text-green-400">✓</span>
            )}
          </div>
        </div>
      )}

      {/* Video Player */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />

      {/* Time Display */}
      {isPlayerReady && (
        <div className="absolute bottom-2 right-2 z-10 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed; 