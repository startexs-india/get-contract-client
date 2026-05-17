const galleryData = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  src: `/assets/images/gallery/g${i + 1}.jpg`
}));

export default galleryData;
