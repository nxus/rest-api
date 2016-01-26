'use strict';

import RestAPI from '../src/index'

import TestApp from '@nxus/core/lib/test/support/TestApp';

describe("RestAPI", () => {
  var module;
  var app = new TestApp();
 
  beforeEach(() => {
    app = new TestApp();
  });
  
  describe("Load", () => {
    it("should not be null", () => RestAPI.should.not.be.null)

    it("should be instantiated", () => {
      module = new RestAPI(app);
      module.should.not.be.null;
    });
  });
  describe("Init", () => {
    beforeEach(() => {
      module = new RestAPI(app);
    });

    it("should have a base url", () => {
      module.config.url_path.should.equal('/api');
    });
    
    it("should have routes", () => {
      app.get('router').provide.calledWith('route', 'GET', '/api/:model').should.be.true;
      app.get('router').provide.calledWith('route', 'POST', '/api/:model').should.be.true;
      app.get('router').provide.calledWith('route', 'GET', '/api/:model/:id').should.be.true;
      app.get('router').provide.calledWith('route', 'PUT', '/api/:model/:id').should.be.true;
      app.get('router').provide.calledWith('route', 'DELETE', '/api/:model/:id').should.be.true;
    });
  });
});
