const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const Model = require('../../../src/models/productModel')
const mockProducts = require('../mocks/products.mock');
const mockProductsAdd = require('../mocks/productsAdd.mock');
const mockProductUpdate = require('../mocks/productsUpdate.mock');

describe('Product Model', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await Model.getAll();
      expect(result).to.be.deep.equal(mockProducts)
    })
  })
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts[2]]);
      const result = await Model.getById(3);
      expect(result).to.be.deep.equal(mockProducts[2])
    })
  })
  describe('Test the function "registerProducts"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProductsAdd[3]]);
      const result = await Model.registerProducts('Boneco do Naruto');
      expect(result).to.be.deep.equal(mockProductsAdd[3].name)
    })
  })
  describe('Test the function "getByProductName"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProductsAdd[3]]);
      const result = await Model.getByProductName("Boneco do Naturo");
      expect(result).to.be.deep.equal(mockProductsAdd[3])
    })
  })
  describe('Test the function "updateProduct"', function () {
    it('successfully', async function () {
      sinon.stub(connection, 'execute').resolves([mockProductUpdate[0]]);
      const result = await Model.updateProduct('Boneco do Naruto', 1);
      expect(result).to.be.deep.equal(mockProductUpdate[0])
    })
  })

})