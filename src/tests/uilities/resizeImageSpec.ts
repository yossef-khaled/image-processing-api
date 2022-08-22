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
};

describe('resizeImage function', () => {
    it('Should return a file created at the destination image path', async () => {
        try {
            const value = await resizeImage(
                testImagePath,
                destinationImagePath,
                width,
                height
            );

            const expected: Image = {
                format: 'jpeg',
                width,
                height,
                channels: 3,
                premultiplied: false,
            };

            expect(value).toEqual(expected);
        } catch (err) {
            throw new Error(err.message);
        }
    });
});
