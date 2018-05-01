import chai from 'chai';
import should from 'should';
import request from 'request';

import Menu from '../data/menu';


import chaiHttp from 'chai-http';
import app from '../../server';

let expect = require('chai').expect;

chai.use(chaiHttp);

describe('API ENDPOINTS FOR ORDER', () => {

  describe('API to set Order', () => {
    it('Should return 201 for a successful addition', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
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
          expect(res.body.message).to.equal('Order successfully selected');
          done();
        });
    });
    
  });

});