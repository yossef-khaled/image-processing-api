import sharp from 'sharp';

async function  resizeImage(path: string, destination: string, width: number, height: number): Promise<void> {
    await sharp(path)
    .resize(width, height)
    .toFile(destination)
    
    .then((data: object ) => {
        console.log('return from sharp function :', data);
    })
    .catch((err) => {
        throw err;
    })
}

export default resizeImage;