import PhotoGallery from '@/components/gallery/PhotoGallery';

export const metadata = {
    title: 'Photo Gallery | NHAASCPL',
    description: 'View photos from our projects and events.',
};

// ✅ Server component — no 'use client' here
export default function PhotoGalleryPage() {
    return <PhotoGallery />;
}