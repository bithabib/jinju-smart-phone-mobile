// Shop photo gallery — files live in public/img/shop/.
// To add more photos: drop them in public/img/shop/ and bump the count here
// (or add their filenames), keeping the shop-01.jpg, shop-02.jpg… pattern.
export const GALLERY = Array.from(
  { length: 28 },
  (_, i) => `img/shop/shop-${String(i + 1).padStart(2, "0")}.jpg`
);
