const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const Model = require('../../../src/models/salesModel');
const mockSales = require('../mocks/salesProducts.mock');

describe('Sales Model', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockSales]);
      const result = await Model.getAll();
      expect(result).to.be.deep.equal(mockSales)
    })
  })
})