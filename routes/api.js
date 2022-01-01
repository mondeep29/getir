
const dbClient = require('../db/db');

const helper = require('../helpers/helper')

module.exports = (router)=>{

    router.post('/getAll', async (req,res)=>{
        if(req.body)
        {
            const {startDate , endDate , minCount , maxCount} = req.body;
            // fetching the filter by dates
            let gt = new Date(startDate)
            let lt = new Date(endDate)
            let finalResObj = {}

            // fetch records from DB
            await helper.getDbRecords(gt, lt).then(async records=>{
                finalResObj = await helper.createResponse(records , minCount , maxCount);
            }).catch(err=>{
                finalResObj = {
                    "code" : 400,
                    "msg" : err.message,
                    "records" : []
            }  
            }).finally(()=>{
                dbClient.close();
            });
            if(finalResObj.code == 0)
                res.status(200).send(finalResObj);
            else
                res.status(finalResObj.code).send(finalResObj);
            }
        else
        {
            res.status(400).send("Bad Request")
        }
        
    })
    
}



