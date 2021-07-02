const router = require('express').Router();
const roomModel = require('../../../models').room;


router.get('/',(req,res)=>{
    res.send('this is room route')
})

router.post('/create',async(req,res)=>{
    try {
        const book = new roomModel(req.body);
        await book.save();
        res.json({message:'room created successfully in database'})
    } catch (error) {
        res. json({error})
    }
})

router.get('/get',async(req,res)=>{
    try {
        const find = await roomModel.find({}).populate({path:'bookings',select:'name startDate startTime endDate endTime -_id status'}).select('name price seats -_id')
        
        

        res.json(find)
    } catch (error) {
        res.json({message:error})
    }
})

module.exports = router;