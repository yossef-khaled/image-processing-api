import sharp from "sharp";

async function resizeImage(
    path: string,
    destination: string,
    width: number,
    height: number
): Promise<object> {
    return new Promise((resolve, reject) => {
        sharp(path)
            .resize(width, height)
            .toFile(destination)

            .then((data: object) => {
                console.log(data);
                resolve({
                    format: "jpeg",
                    width,
                    height,
                    channels: 3,
                    premultiplied: false,
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default resizeImage;
