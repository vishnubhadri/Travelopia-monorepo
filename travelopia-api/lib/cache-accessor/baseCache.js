class BaseCache{
    constructor(){
        this.cache = {};
    }
    get(key){
        return this.cache[key];
    }
    set(key,value){
        return this.cache[key]=value;
    }
    findCache(key){
        return !!this.cache[key];
    }
}

module.exports = BaseCache;