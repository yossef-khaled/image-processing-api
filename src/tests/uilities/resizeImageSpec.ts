import resizeImage from '../../utilities/resizeImage';

const testImage: string = 'santamonica';
const testImagePath: string = `src/assets/originalImages/${testImage}.jpg`;
const width: number = 380;
const height: number = 500;
const destinationImagePath: string = `src/assets/editedImages/${testImage}_${width}x${height}.jpg`;

type Image = {
    format: string;
    width: number;
    height: number;
    channels: number;
    premultiplied: boolean;
    size: number;
}

describe('resizeImage function', () => {
    it('Should not return any thing with a file created at the destination image path', async () => {
        resizeImage(testImagePath, destinationImagePath, width, height).then(
            (value: object) => {
                const expected: Image = {
                    format: 'jpeg',
                    width,
                    height,
                    channels: 3,
                    premultiplied: false,
                    size: 60354
                }
                expect(value).toBe(expected);
            }
        )
        .catch((err: NodeJS.ErrnoException) => {
            expect(err.message).toContain('illegal operation on a directory');
        })
    });
});
