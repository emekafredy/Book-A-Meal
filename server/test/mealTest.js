import chai from 'chai';
import should from 'should';
import request from 'request';

import Meals from '../data/meals';


import chaiHttp from 'chai-http';
import app from '../../server';

let expect = require('chai').expect;

chai.use(chaiHttp);

describe('API ENDPOINTS FOR MEAL', () => {

  describe('API to GET meals', () => {
    it('Should return Meal Options', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          expect(Meals[0].title).to.equal('Fried Noodles');
          done();
        });
    });
  });

  describe('API to POST meal', () => {
    it('Should successfully add meal option', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          title: 'Yam Sauce',
          description: 'Yam Sauce with beef',
          imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
          price: 800,
        })
        .end((err, res) => {
          expect(Meals[3].description).to.equal('Yam Sauce with beef');
          done();
        });
    });

    it('Should not add meal option if required fields are not filled out', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          title: 'Yam Sauce',
          description: '',
          imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
          price: 800,
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Please fill out the required fields');
          done();
        });
    });
    
  });

});