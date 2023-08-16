const CountryService=require('../service/CountryService')
class CountryRouterHandler{
  constructor(){
    this.CountryService=new CountryService();
  }

  async update( req, res, next){
    const response=await this.CountryService.updateCountry(req);
    res.send(response)
  }

  async fetch( req, res, next){
    const response=await this.CountryService.fetchCountries(req);
    res.send(response)
  }

  async delete( req, res, next){
    const response=await this.CountryService.deleteCountries(req);
    res.send(response)
  }
  
  async insert( req, res, next){
    const response=await this.CountryService.addCountry(req);
    res.send(response)
  }
}
module.exports=new CountryRouterHandler()