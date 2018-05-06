import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import request from 'request';
import app from '../../server';
import Menu from '../data/menu';

chai.use(chaiHttp);

describe('API ENDPOINTS FOR MENU', () => {
  describe('API to set menu', () => {
    it('Should add meal option to Menu and return updated list', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          id: 1,
          title: 'Fried Noodles',
          description: 'Fried Noodels with roasted Pork',
          imageUrl: 'http://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201301-xl-stir-fried-noodles-with-roast-pork.jpg?itok=RCs_EHvq',
          price: 500,
        })
        .end((error, response) => {
          expect(response.body.message).to.equal('Meal successfully added to menu');
          done();
        });
    });

    it('Should return 409 if Meal Option is already on the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          id: 1,
          title: 'Fried ',
          description: 'Fried Noodels with roasted Pork',
          imageUrl: 'http://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201301-xl-stir-fried-noodles-with-roast-pork.jpg?itok=RCs_EHvq',
          price: 500,
        })
        .end((error, response) => {
          expect(response.body.message).to.equal('Meal already exists');
          expect(response).to.have.status(409);
          done();
        });
    });
  });

  describe('API to GET menu', () => {
    it('Should return menu list for a successful request', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .send({ Menu })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Menu retrieved successfully');
          done();
        });
    });
  });
});
