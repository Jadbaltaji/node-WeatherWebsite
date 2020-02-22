const request=require('request')
//FUNCTION that takes lat/latitude and provides weather forecast
const forecast=(latitude,longtitude,callback)=>{
    const url= 'https://api.darksky.net/forecast/2858332c771ae5f1c1cb68cd4423a3ce/'+latitude+','+longtitude
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.code===400){
            callback('Forecast location could not be found.',undefined)
        }else{
            temp= body.currently.temperature
            chanceRain=body.currently.precipProbability
            callback(undefined,body.daily.data[0].summary +' It is currently ' +temp+' degrees out. There is a '+ chanceRain+ '% Chance of rain.'  )
            // callback(undefined,{
            //     location:response.body.timezone,
            //     summary:response.body.daily.data[0].summary,
            //     temperature: temp,
            //     chanceOfRain: chanceRain

            // })
        }
    })
}

module.exports=forecast