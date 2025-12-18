export function getValidImage(image?: string, fallback = "/img/user.jpg"): string {
  if (!image) return fallback;

  const isValidUrl =
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:image/");

    

  return isValidUrl ? image : fallback;
}
