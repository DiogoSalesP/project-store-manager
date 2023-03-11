const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const Model = require('../../../src/models/salesProductsModel');
const mockSales = require('../mocks/salesProducts.mock');

describe('SalesProducts Model', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockSales[0]]);
      const result = await Model.getById(1);
      expect(result).to.be.deep.equal(mockSales[0])
    })
  })
})