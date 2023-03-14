const { expect } = require('chai');
const sinon = require('sinon');
const ModelSales = require('../../../src/models/salesModel');
const ModelSalesProducts = require('../../../src/models/salesProductsModel');
const Service = require('../../../src/services/salesService');
const mockSales = require('../mocks/salesProducts.mock');

describe('Sales Service', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      sinon.stub(ModelSales, 'getAll').resolves(mockSales);
      const result = await Service.getAll();
      expect(result).to.be.deep.equal({ status: 200, message: mockSales })
    })
  })
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      sinon.stub(ModelSalesProducts, 'getById').resolves([mockSales[0]]);
      const result = await Service.getById(1);
      expect(result).to.be.deep.equal({isError: false, status: 200, message: [mockSales[0]] })
    })
    it('failure', async function () {
      sinon.stub(ModelSalesProducts, 'getById').resolves([]);
      const result = await Service.getById(5);
      expect(result).to.be.deep.equal({ isError: true, status: 404, message: 'Sale not found' })
    })
  })
  describe('Test the function "deleteProduct"', function () {
    it('successfully', async function () {
      sinon.stub(ModelSales, 'deleteSales').resolves({affectedRows: 1});
      const result = await Service.deleteSales(2);
      expect(result).to.be.deep.equal({isError: false, status: 204 })
    })
    it('failure', async function () {
      sinon.stub(ModelSales, 'deleteSales').resolves({affectedRows: 0});
      const result = await Service.deleteSales(999);
      expect(result).to.be.deep.equal({ isError: true, status: 404, message: 'Sale not found' })
    })
  })
})