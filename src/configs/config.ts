function Config(){
  let defaultConfig = require('./config.json')
  let envConfig = null;
  if(__DEV__){
    envConfig = require('./config.dev.json')
  }else{
    envConfig = require('./config.prd.json')
  }

  return angular.merge({}, defaultConfig, envConfig)
}

export { Config }

