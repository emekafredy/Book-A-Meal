import chai from 'chai';
import should from 'should';
import request from 'request';
import util from 'util';

import Menu from '../data/menu';


import chaiHttp from 'chai-http';
import app from '../../server';

let expect = require('chai').expect;

chai.use(chaiHttp);

describe('API ENDPOINTS FOR MENU', () => {

  describe('API to GET menu', () => {
    it('Should return 200 for a successful request', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .send({Menu})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Menu retrieved successfully');
          done();
        });
    });    
  });

  describe('API to set menu', () => {
    it('Should return 201 for a successful addition', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          id: 2,
          mealTitle: 'Egusi Soup',
          description: 'Egusi Soup prepared with Chicken and stockfish',
          price: 1000,
          imageUrl: 'http://allnigerianfoods.com/wp-content/uploads/2015/02/egusi-soup1.jpg',
          category: 'African',
          quantity: 3,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Meal successfully added to menu');
          done();
        });
    });

    it('Should return 409 if Meal Option is already on the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          id: 2,
          mealTitle: 'Egusi Soup',
          description: 'Egusi Soup prepared with Chicken and stockfish',
          price: 1000,
          imageUrl: 'http://allnigerianfoods.com/wp-content/uploads/2015/02/egusi-soup1.jpg',
          category: 'African',
          quantity: 3,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.equal('Meal already exists');
          done();
        });
    });
    
  });

});