'use strict';

const _defaultConfig = {
  url_path: '/api'
  // TODO Need allowedModels whitelist
}

export default class RestAPI {
  
  constructor(app) {
    this.app = app
    this.config = Object.assign(_defaultConfig, app.config.storage)
    
    var router = app.get('router')
    var url = this.config.url_path+'/:model';
    var url_instance = this.config.url_path+'/:model/:id';

    router.provide('route', 'GET', url, this._list.bind(this))
    router.provide('route', 'POST', url, this._post.bind(this))
    router.provide('route', 'GET', url_instance, this._get.bind(this))
    router.provide('route', 'PUT', url_instance, this._put.bind(this))
    router.provide('route', 'DELETE', url_instance, this._delete.bind(this))
  }
  
  getModel (modelName) {
    return this.app.get('storage').request('getModel', modelName).then((model) => {
      return model
    });
  }
  

  _list (req, res) {
    var query = req.params.query || {};
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
