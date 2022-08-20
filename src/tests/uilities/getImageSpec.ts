import getImage from "../../utilities/getImage";
import fs from 'fs';

const firstTestImagePath = 'src/assets/originalImages/santamonica.jpg';
const secondTestImagePath = 'src/assets/originalImages/'

describe('getImage function', () => {
    it('Should return a buffer', () => {
        getImage(firstTestImagePath)
        .then((value) => {
            expect(fs.existsSync(value)).toBe(true);
        })
    })

    it('Should return an error', async () => {
        
        const regex = new RegExp(/^((([a-zA-Z\-0-9])+[no such a file or directory]+[a-zA-Z\-0-9]))$/);
        getImage('random path')
        .then((value) => {
            expect(value).toThrowError(regex);
        })

    })

    it('Should return a buffer 2', async () => {
        
        getImage(secondTestImagePath)
        .then((value) => {
            expect(fs.existsSync(value)).toBe(true);
        })
        
    })
})