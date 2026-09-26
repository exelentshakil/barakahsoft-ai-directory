/**
 * Auto-generated Media Assets from Pexels API
 * Project: barakahsoft-ai-directory
 * Zero attribution clutter on UI (Enterprise Clean Standard)
 */

export interface PhotoAsset {
  id: string;
  url: string;
  alt: string;
  avg_color: string;
}

export interface VideoAsset {
  id: string;
  videoUrl: string;
  posterUrl: string;
  width: number;
  height: number;
}

export interface MediaConfig {
  caseStudyPhoto: PhotoAsset;
  editorialPhotos: PhotoAsset[];
  ambientVideo: VideoAsset;
}

export const mediaConfig: MediaConfig = {
  caseStudyPhoto: {
    "id": "fb-1",
    "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    "alt": "High-throughput enterprise circuit architecture",
    "avg_color": "#0D1738"
},
  editorialPhotos: [
    {
    "id": "fb-2",
    "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    "alt": "Modern datacenter optical server rack array",
    "avg_color": "#111827"
},
    {
    "id": "fb-3",
    "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    "alt": "Cryptographic security stream and data firewall",
    "avg_color": "#080E24"
},
    {
    "id": "fb-4",
    "url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    "alt": "Autonomous AI operations command center",
    "avg_color": "#1E293B"
}
  ],
  ambientVideo: {
    "id": "fb-video-1",
    "videoUrl": "https://videos.pexels.com/video-files/1085656/1085656-sd_960_540_25fps.mp4",
    "posterUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    "width": 960,
    "height": 540
}
};
