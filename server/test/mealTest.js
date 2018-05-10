import { truncate } from 'fs';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import request from 'request';
import app from '../../server';
import models from '../models';


chai.use(chaiHttp);

// describe('API ENDPOINTS FOR MEAL', () => {

//   before((done) => {
//     models.Meal.bulkCreate([
//       { title: 'Yam', description: 'good', price: '600' },
//       { title: 'Bread', description: 'good', price: '600' },
//       { title: 'Beans', description: 'good', price: '600' },
//     ]).then(() => {
//       console.log(' 3 meals added');
//     });
//   });

//   describe('API to GET meals', () => {
//     it('Should return Meal Options', (done) => {
//       chai.request(app)
//         .get('/api/v1/meals')
//         .end((error, response) => {
//           expect(response.body).to.be.an('array');
//           done();
//         });
//     });
//   });

//   describe('API to POST meal', () => {
//     it('Should successfully add meal option', (done) => {
//       chai.request(app)
//         .post('/api/v1/meals')
//         .send({
//           title: 'Yam Sauce',
//           description: 'Yam Sauce with beef',
//           imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
//           price: 800,
//         })
//         .end((error, response) => {
//           expect(models.Meal.description).to.equal('Yam Sauce with beef');
//           done();
//         });
//     });

//     it('Should not add meal option if required fields are not filled out', (done) => {
//       chai.request(app)
//         .post('/api/v1/meals')
//         .send({
//           title: 'Yam Sauce',
//           description: '',
//           imageUrl: 'http://sisijemimah.com/wp-content/uploads/2016/01/Yam-Porridge.jpg',
//           price: 800,
//         })
//         .end((err, res) => {
//           expect(res.body.message).to.equal('Please fill out the required fields');
//           done();
//         });
//     });
//   });
// });
describe('API ENDPOINTS FOR MEAL', () => {
  before(() => {
    models.Meal.bulkCreate([
      { title: 'Yam', description: 'good', price: '600' },
      { title: 'Bread', description: 'good', price: '600' },
      { title: 'Beans', description: 'good', price: '600' },
    ]).then(() => {
      console.log(' 3 meals added');
    });
  });
  describe('API to GET meals', () => {
    it('Should return Meal Options', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((error, response) => {
          expect(response.body).to.be.an('array');
          done();
        });
    });
  });
});
