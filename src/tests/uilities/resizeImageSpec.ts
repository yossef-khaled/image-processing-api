import resizeImage from '../../utilities/resizeImage';
import fs from 'fs';

const testImage: string = 'santamonica';
const testImagePath: string = `src/assets/originalImages/${testImage}.jpg`;
const width: number = 380;
const height: number = 500;
const destinationImagePath: string = `src/assets/editedImages/${testImage}_${width}x${height}.jpg`;

describe('resizeImage function', () => {
    it('Should not return any thing with a file created at the destination image path', async () => {
        resizeImage(testImagePath, destinationImagePath, width, height).then(
            () => {
                expect(fs.existsSync(destinationImagePath)).toBe(true);
            }
        );
    });
});
