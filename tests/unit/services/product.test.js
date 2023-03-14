const { expect } = require('chai');
const sinon = require('sinon');
const Model = require('../../../src/models/productModel');
const Service = require('../../../src/services/productService');
const mockProducts = require('../mocks/products.mock');
const mockProductsAdd = require('../mocks/productsAdd.mock');
const mockProductUpdate = require('../mocks/productsUpdate.mock');

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
  describe('Test the function "updateProduct"', function () {
    it('successfully', async function () {
      sinon.stub(Model, 'updateProduct').resolves({affectedRows: 1});
      const result = await Service.updateProduct('Boneco do Naruto', 1);
      expect(result).to.be.deep.equal({isError: false, status: 200, message: mockProductUpdate[0] })
    })
    it('failure', async function () {
      sinon.stub(Model, 'updateProduct').resolves({affectedRows: 0});
      const result = await Service.updateProduct('Boneco do Naruto', 999);
      expect(result).to.be.deep.equal({ isError: true, status: 404, message: 'Product not found' })
    })
  })
  describe('Test the function "deleteProduct"', function () {
    it('successfully', async function () {
      sinon.stub(Model, 'deleteProduct').resolves({affectedRows: 1});
      const result = await Service.deleteProduct(3);
      expect(result).to.be.deep.equal({isError: false, status: 204 })
    })
    it('failure', async function () {
      sinon.stub(Model, 'deleteProduct').resolves({affectedRows: 0});
      const result = await Service.deleteProduct(999);
      expect(result).to.be.deep.equal({ isError: true, status: 404, message: 'Product not found' })
    })
  })
})