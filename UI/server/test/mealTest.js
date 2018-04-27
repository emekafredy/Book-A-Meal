import chai from 'chai';
import should from 'should';
import request from 'request';
import util from 'util';

import Meals from '../data/meals';


import chaiHttp from 'chai-http';
import app from '../../server';

let expect = require('chai').expect;

chai.use(chaiHttp);

describe('API ENDPOINTS FOR MEAL', () => {

  describe('API to GET meals', () => {
    it('Should return 200 for a successful request', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .send({Meals})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Meals retrieved successfully');
          done();
        });
    });
    
  });

  describe('API to POST meal', () => {
    it('Should return 201 for a successful addition', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          title: 'Yam Sauce',
          description: 'Yam Sauce with beef',
          imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
          price: 800,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Meal successfully added');
          done();
        });
    });

    it('Should return 400 if required fields are not filled out', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          title: 'Yam Sauce',
          description: '',
          imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
          price: 800,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Please fill out the required fields');
          done();
        });
    });
    
  });
});