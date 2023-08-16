const EnquiryDataAccessor = require("../data-accessor/CountryDataAccessor")

class EnquiryService {
    constructor(){
        this.CountryDataAccessor=new EnquiryDataAccessor();
    }
    async fetchCountries(payload){
        return await this.CountryDataAccessor.fetch(payload);
    }
}

module.exports=EnquiryService