const BaseCache=require('./baseCache');

class CountryCacheAccessor extends BaseCache{

}

const cache=new CountryCacheAccessor();
module.exports = cache;
