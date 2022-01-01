const dbClient = require('../db/db');
module.exports = {
    // method to fetch records from DB
    getDbRecords : async (gt, lt)=>{
        try {
            let connection = await dbClient.connect();
            const db = connection.db('getir-case-study');
            let collection = await db.collection('records').find({createdAt : {$gt : gt}}, {createdAt : {$lt : lt}}).toArray();
            return collection;
        } catch (error) {
            throw new Error(`error in fetching records ${error.message}`)
        }
        
    },
    
    // method to create response object
    createResponse : async (collection, minCount , maxCount)=>{
        try {
            let resultArr = []
            let code , message, records ;
            if(collection.length > 0)
            {
                // creating success response 
                for(let col of collection)
                {
                    let obj = {};
                    // calculating total count
                    let totalCount = await calculateTotalCount(col.counts , minCount , maxCount)
                    if(totalCount >= 2700 && totalCount <= 3000)
                    {
                        obj.key = col.key;
                        obj.createdAt = col.createdAt;
                        obj.totalCount = totalCount;
                        resultArr.push(obj)
                    }
                }
                code = 0;
                message = 'success';
                records = resultArr;
            }
            else
            {
                //failure response object
                code = 204,
                message = 'no records found'
                records = []
            }
            return {
                "code" : code,
                "msg" : message,
                "records" : records
            }
    
        } catch (error) {
            throw new Error(`error in creating response ${error.message}`)
        }
            
    }
}

// method to calculate total count

let calculateTotalCount = async (colArr)=>{
    try {   
        let sum = colArr.reduce((accumulator, a)=>{
            return accumulator + a;
        },0)
        return sum; 
    } catch (error) {
        throw new Error(`error in calculating count ${error.message}`)
    }
    
}