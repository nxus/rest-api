/**
 * [![Build Status](https://travis-ci.org/nxus/rest-api.svg?branch=master)](https://travis-ci.org/nxus/rest-api)
 * 
 * Exposes Nxus Storage models as a REST API.
 * 
 * ## Installation
 * 
 * In your Nxus application:
 * 
 *     > npm install @nxus/rest-api --save
 * 
 * ## Usage
 * 
 * ### Configuration
 * 
 * In package.json:
 * 
 *      "config": {
 *        "restapi": {
 *          "url_path": "/api"
 *         }
 *      }
 *      
 * ### Routes
 * 
 * ```
 * GET /api/:model
 * POST /api/:model
 * GET /api/:model/:id
 * PUT /api/:model/:id
 * DELETE /api/:model/:id
 * ```
 * 
 * # API
 * 
 * * * *
 */

'use strict';
/**
 * Exposes a REST API for Nxus models
 * e.g. GET /api/todo, POST /api/todo, GET /api/todo/1, etc
 * @example Configuration (defaults):
 * {restapi: {
 *   url_path: '/api'
 * }}
 */
export default class RestAPI {
  
  constructor(app) {
    const _defaultConfig = {
      url_path: '/api'
      // TODO Need allowedModels whitelist
    }

    this.app = app
    this.config = Object.assign(_defaultConfig, app.config.restapi)
    
    var router = app.get('router')
    var url = this.config.url_path+'/:model';
    var url_instance = this.config.url_path+'/:model/:id';

    router.route('GET', url, this._list.bind(this))
    router.route('POST', url, this._post.bind(this))
    router.route('GET', url_instance, this._get.bind(this))
    router.route('PUT', url_instance, this._put.bind(this))
    router.route('DELETE', url_instance, this._delete.bind(this))
  }
  
  getModel (modelName) {
    return this.app.get('storage').getModel(modelName)
  }
  

  _list (req, res) {
    var query = req.param('query') || {};
    this.getModel(req.params.model).then((model) => {
      model.find().where(query).then((results) => {
        res.send(results);
      }).catch((e) => {
        this.app.log(e.stack);
        res.status(500).send(e);
      });
    });
  }

  _post (req, res) {
    this.getModel(req.params.model).then((model) => {
      model.create(req.body).then((results) => {
        res.status(201).send(results);
      }).catch((e) => {
        this.app.log(e.stack);
        res.status(500).send(e);
      });
    });
  }

  _get (req, res) {
    this.getModel(req.params.model).then((model) => {
      model.findOne(req.params.id).then((results) => {
        res.send(results);
      }).catch((e) => {
        this.app.log(e.stack);
        res.status(500).send(e);
      });
    });
  }

  _put (req, res) {
    this.getModel(req.params.model).then((model) => {
      model.update(req.params.id, req.body).then((results) => {
        res.send(results);
      }).catch((e) => {
        this.app.log(e.stack);
        res.status(500).send(e);
      });
    });
  }
  
  _delete (req, res) {
    this.getModel(req.params.model).then((model) => {
      model.destroy(req.params.id).then(() => {
        res.send();
      }).catch((e) => {
        this.app.log(e.stack);
        res.status(500).send(e);
      });
    });
  }
}
