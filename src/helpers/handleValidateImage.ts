export default function handleValidateImage(file: File) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name);
}
