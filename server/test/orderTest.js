import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import request from 'request';
import app from '../../server';
import order from './../data/order';

chai.use(chaiHttp);


describe('API ENDPOINTS FOR ORDER', () => {
  describe('API to set Order', () => {
    it('Should return 201 status code for a successful addition', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          title: 'Fried Rice',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Order successfully selected');
          done();
        });
    });

    it('Should return 409 if meal already exists in order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          title: 'Fried Rice',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.equal('Order already selected');
          done();
        });
    });
  });

  describe('API to GET Orders', () => {
    it('Should return Orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((error, response) => {
          expect(order[1].title).to.equal('Fried Rice');
          done();
        });
    });
  });
});
