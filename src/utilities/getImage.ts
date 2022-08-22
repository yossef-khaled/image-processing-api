import fs from "fs";

function getImage(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path,
            (err: NodeJS.ErrnoException | null, resizedImage: Buffer) => {
                if (err) {
                    reject(err);
                }

                resolve(resizedImage);
            }
        );
    });
}

export default getImage;
