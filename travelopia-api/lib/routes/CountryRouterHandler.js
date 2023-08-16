const CountryService=require('../service/CountryService')
class CountryRouterHandler{
  update( req, res, next){
    
  }
  async fetch( req, res, next){
    const response=await new CountryService().fetchCountries(req);
    res.send(response)
  }
  delete( req, res, next){

  }
  insert( req, res, next){

  }
}
module.exports=new CountryRouterHandler()