import VideoGallery from '@/components/gallery/VideoGallery';

export const metadata = {
    title: 'Video Gallery | NHAASCPL',
    description: 'Watch videos from our projects and site visits.',
};

// ✅ Server component — no 'use client' here
export default function VideoGalleryPage() {
    return <VideoGallery />;
}