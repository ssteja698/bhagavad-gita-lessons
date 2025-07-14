import React, { useEffect, useRef, useState } from 'react';
import { getVideoTimestamp, saveVideoTimestamp, getVideoProgressData, formatTime } from '../utils/videoProgress';
import { youtubeAPI } from '../utils/youtubeAPI';

interface YouTubeEmbedProps {
  youtubeId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeId }) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasRestoredTimestamp, setHasRestoredTimestamp] = useState(false);

  // Load YouTube API and create player
  useEffect(() => {
    let mounted = true;

    const initializePlayer = async () => {
      try {
        // Load YouTube API using singleton manager
        await youtubeAPI.loadAPI();
        
        if (!mounted || !containerRef.current || !youtubeId) return;

        // Get saved timestamp
        const savedTime = getVideoTimestamp(youtubeId);

        // Create player
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
              if (!mounted) return;
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
      } catch (error) {
        console.error('Error initializing YouTube player:', error);
      }
    };

    initializePlayer();

    return () => {
      mounted = false;
    };
  }, [youtubeId]);

  // Update current time periodically
  useEffect(() => {
    if (!isPlayerReady) return;

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const time = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          setCurrentTime(time);
          setDuration(dur);
          
          // Save timestamp every 5 seconds
          if (Math.floor(time) % 5 === 0) {
            saveVideoTimestamp(youtubeId, time);
          }
        } catch (error) {
          console.error('Error getting video time:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayerReady, youtubeId]);

  const progressData = getVideoProgressData(youtubeId);

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>


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

      {/* Loading indicator */}
      {!isPlayerReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-600">Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed; 