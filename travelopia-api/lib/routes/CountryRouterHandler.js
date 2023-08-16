const CountryService=require('../service/CountryService')
class CountryRouterHandler{
  async update( req, res, next){
    const response=await new CountryService().updateCountry(req);
    res.send(response)
  }

  async fetch( req, res, next){
    const response=await new CountryService().fetchCountries(req);
    res.send(response)
  }

  async delete( req, res, next){
    const response=await new CountryService().deleteCountries(req);
    res.send(response)
  }
  
  async insert( req, res, next){
    const response=await new CountryService().addCountry(req);
    res.send(response)
  }
}
module.exports=new CountryRouterHandler()