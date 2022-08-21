import resizeImage from "../../utilities/resizeImage";
import fs from 'fs';
import express from "express";
import request from "supertest";
import supertest from "supertest";

const app = express();

describe('GET /images', () => {
    it('Should response with an image', async () => {
        const response = await supertest(app)
        .get('localhost:3000/images')
        .query({
            fileName: 'fjord',
            width: '300',
            height: '400'
        })

        console.log(response.headers);

        expect(response.headers['Content-Type']).toEqual('image/jpg');
        expect(response.status).toEqual(200);

    })

})