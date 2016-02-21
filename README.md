# @nxus/rest-api

## 

[![Build Status](https://travis-ci.org/nxus/rest-api.svg?branch=master)](https://travis-ci.org/nxus/rest-api)

Exposes Nxus Storage models as a REST API.

### Installation

In your Nxus application:

    > npm install @nxus/rest-api --save

### Usage

#### Configuration

In package.json:

     "config": {
       "restapi": {
         "url_path": "/api"
        }
     }
     

#### Routes

    GET /api/:model
    POST /api/:model
    GET /api/:model/:id
    PUT /api/:model/:id
    DELETE /api/:model/:id

## API

* * *

## RestAPI

Exposes a REST API for Nxus models
e.g. GET /api/todo, POST /api/todo, GET /api/todo/1, etc

**Examples**

```javascript
Configuration (defaults):
{restapi: {
  url_path: '/api'
}}
```
