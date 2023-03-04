const { expect } = require('chai');
const sinon = require('sinon');
const Model = require('../../../src/models/productModel')
const Service = require('../../../src/services/productService')
const mockProducts = require('../mocks/products.mock');
const mockProductsAdd = require('../mocks/productsAdd.mock');

describe('Product Service', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      sinon.stub(Model, 'getAll').resolves(mockProducts);
      const result = await Service.getAll();
      expect(result).to.be.deep.equal({ status: 200, message: mockProducts })
    })
  })
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      sinon.stub(Model, 'getById').resolves([mockProducts[2]]);
      const result = await Service.getById(3);
      expect(result).to.be.deep.equal({isError: false, status: 200, message: mockProducts[2] })
    })
    it('failure', async function () {
      sinon.stub(Model, 'getById').resolves([]);
      const result = await Service.getById(5);
      expect(result).to.be.deep.equal({ isError: true, status: 404, message: 'Product not found' })
    })
  })
  describe('Test the function "registerProducts"', function () {
    it('successfully', async function () {
      sinon.stub(Model, 'registerProducts').resolves([mockProductsAdd[3].name]);
      sinon.stub(Model, 'getByProductName').resolves([mockProductsAdd[3]]);
      const result = await Service.registerProducts('Boneco do Naruto');
      expect(result).to.be.deep.equal({ status: 201, message: mockProductsAdd[3] })
    })
  })
})