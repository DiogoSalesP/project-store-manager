const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const Service = require('../../../src/services/salesService')
const Controller = require('../../../src/controllers/salesController')
const mockSales = require('../mocks/salesProducts.mock');

chai.use(sinonChai);

describe('Sales Controller', function () {
  afterEach(function () { sinon.restore() });

  describe('Test the function "getAll"', function () {
    it('successfully', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(Service, 'getAll').resolves({isError: false, status: 200, message: mockSales });
      await Controller.getAll(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(mockSales)
    })
  })
  describe('Test the function "getById"', function () {
    it('successfully', async function () {
      const req = {};
      const res = {};
      req.params = sinon.stub().returns(1);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Service, 'getById').resolves({ isError: false, status: 200, message: mockSales[1] });
      await Controller.getById(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(mockSales[1])
    })
    it('failure', async function () {
      const req = {};
      const res = {};
      req.params = sinon.stub().returns(5);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Service, 'getById').resolves({ isError: true, status: 404, message: 'Sale not found' });
      await Controller.getById(req, res);
      expect(res.status).to.have.be.calledWith(404);
      expect(res.json).to.have.be.calledWith({ message: 'Sale not found' })
    })
  })
})