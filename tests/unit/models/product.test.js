const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const mockProducts = require('../mocks/products.mock');
const Model = require('../../../src/models/productModel');

describe('Product Model', function () {
  afterEach(function () { sinon.restore(); });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await Model.getAll();
      expect(result).to.be.deep.equal(mockProducts);
    });
  });
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts[2]]);
      const result = await Model.getById(3);
      expect(result).to.be.deep.equal(mockProducts[2]);
    });
  });
});