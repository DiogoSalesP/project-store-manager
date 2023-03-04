const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const Service = require('../../../src/services/productService')
const Controller = require('../../../src/controllers/productController')
const mockProducts = require('../mocks/products.mock');
const mockProductsAdd = require('../mocks/productsAdd.mock');

chai.use(sinonChai);

describe('Product Controller', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(Service, 'getAll').resolves({isError: false, status: 200, message: mockProducts });
      await Controller.getAll(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(mockProducts)
    })
  })
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      const req = {};
      const res = {};
      req.params = sinon.stub().returns(3);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Service, 'getById').resolves({ isError: false, status: 200, message: mockProducts[2] });
      await Controller.getById(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(mockProducts[2])
    })
    it('failure', async function () {
      const req = {};
      const res = {};
      req.params = sinon.stub().returns(5);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Service, 'getById').resolves({ isError: true, status: 404, message: 'Product not found' });
      await Controller.getById(req, res);
      expect(res.status).to.have.be.calledWith(404);
      expect(res.json).to.have.be.calledWith({ message: 'Product not found' })
    })
  })
  describe('Test the function "registerProducts"', function () {
    it('successfully', async function () {
      const req = {};
      const res = {};
      req.body = sinon.stub().resolves([mockProductsAdd[3].name])
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(Service, 'registerProducts')
        .resolves({ isError: true, status: 201, message: mockProductsAdd[3] });
      await Controller.registerProducts(req, res);
      expect(res.status).to.have.be.calledWith(201);
      expect(res.json).to.have.be.calledWith(mockProductsAdd[3])
    })
  })
})