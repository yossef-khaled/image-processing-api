import getImage from '../../utilities/getImage';
import fs from 'fs';

const firstTestImagePath = 'src/assets/originalImages/santamonica.jpg';
const secondTestImagePath = 'src/assets/originalImages/fjord.jpg';

describe('getImage function', () => {
    it('Should return a buffer', () => {
        getImage(firstTestImagePath)
            .then(() => {
                expect(fs.existsSync(firstTestImagePath)).toBe(true);
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    });

    it('Should return a buffer 2', () => {
        getImage(secondTestImagePath)
            .then(() => {
                expect(fs.existsSync(secondTestImagePath)).toBe(true);
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    });
});
