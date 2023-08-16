class CountryRouterHandler{
  update( req, res, next){
    
  }
  fetch( req, res, next){
    res.send(['Apple','Banana'])
  }
  delete( req, res, next){

  }
  insert( req, res, next){

  }
}
module.exports=new CountryRouterHandler()