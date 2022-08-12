
'use strict';

const data = [
    {
      id: '1',
      name: 'Dogs',
      description: 'Only dog images here!'
    },
    {
      id: '2',
      name: 'Nature',
      description: 'What can be a better object for photography',
    },
    {
      id: '3',
      name: 'Cities',
      description: 'Creative display of urban settings',
    }
  ]

  
const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    });
});
