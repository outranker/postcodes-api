module.exports = {
  "apps": [
    {
      "name": "postcodes",
      "script": "./dist/index.js",
      "instances": 1,
      "autorestart": true,
      "watch": false,
      "time": true,
      "env": {
        "NODE_ENV": "development"
      },
      "ignore_watch": ["node_modules"]
    }
  ]
}
