const BaseCache=require('./baseCache');

class EnquiryCacheAccessor extends BaseCache{

}

const cache=new EnquiryCacheAccessor();
module.exports = cache;
