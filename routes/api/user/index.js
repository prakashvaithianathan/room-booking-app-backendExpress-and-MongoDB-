const router = require("express").Router();
const userModel = require("../../../models").user;
const roomModel = require("../../../models").room;
const jwt = require("jsonwebtoken");
const auth = require("../../../library").authenticate;
const moment = require("moment")
const momentRange = require("moment-range")

router.get("/", (req, res) => {
  res.send("this is user route");
});

router.post("/book", async (req, res) => {
  try {
    const room = new roomModel(req.body);
    const checkRoom = await roomModel.findById({ _id: req.body.roomId });

   
    // if((req.body.startTime.includes('pm')||req.body.endTime.includes('pm')){
    //     req
    // }

    if (checkRoom.bookings == "") {
      var startDate = new Date(`${req.body.startDate}`);
      var endDate = new Date(`${req.body.endDate}`);
        

      var start = new Date(`${req.body.startDate} ` + `${req.body.startTime}`);
      var end = new Date(`${req.body.endDate} ` + `${req.body.endTime}`);

      var now = new Date();
      
      if(start<now){
          return res.json({message:'the given date is expired'})
      }

      if (end <= start) {
        return res.json({
          message: "startTime is greater than or equal to endTime",
        });
      }

      if (startDate == "Invalid Date" || endDate == "Invalid Date") {
        return res.json({ message: "invalid date" });
      } else {
        let user = new userModel(req.body);
        let session = await userModel.startSession();

        let userDetails = await user.save({ session: session });
        let roomDetails = await roomModel
          .findByIdAndUpdate(
            { _id: req.body.roomId },
            {
              $addToSet: { bookings: user.id },
            },
            { new: true }
          )
          .session(session);

        res.json({ user: userDetails, room: roomDetails });
      }
    } else {
      if (checkRoom.bookings) {
        const room = await userModel.find({ _id: checkRoom.bookings })


        var startDate = new Date(`${req.body.startDate}`);
        var endDate = new Date(`${req.body.endDate}`);

        var start = new Date(
          `${req.body.startDate} ` + `${req.body.startTime}`
        );
        var end = new Date(`${req.body.endDate} ` + `${req.body.endTime}`);


        var now = new Date();
        
        if(start<now){
            return res.json({message:'the given date is expired'})
        }

        if (end <= start) {
          return res.json({
            message: "startTime is greater than or equal to endTime",
          });
        }

        if (startDate == "Invalid Date" || endDate == "Invalid Date") {
          return res.json({ message: "invalid date" });
        }

        const roomCheck = room.find((room) => {
          var d0 = new Date(`${room.startDate} ` + `${room.startTime}`);
          var d1 = new Date(`${room.endDate} ` + `${room.endTime}`);

          var d2 = new Date(`${req.body.startDate} ` + `${req.body.startTime}`);
          var d3 = new Date(`${req.body.endDate} ` + `${req.body.endTime}`);

       

if(d1.valueOf() >d2.valueOf() && d0.valueOf() <d3.valueOf() ){
  return true
}
       
          
       
        });
           
       

        if (roomCheck) {
          

          return res.json({
            message:
              `Sorry, This room is booked by ${roomCheck.name} and timing from ${roomCheck.startDate},${roomCheck.startTime} to ${roomCheck.startDate},${roomCheck.endDate, roomCheck.endTime}. Check another time`,
          });
        } else {
          let user = new userModel(req.body);
          let session = await userModel.startSession();

          let userDetails = await user.save({ session: session });
          let roomDetails = await roomModel
            .findByIdAndUpdate(
              { _id: req.body.roomId },
              {
                $addToSet: { bookings: user.id },
              },
              { new: true }
            )
            .session(session);
          return res.json({ user: userDetails, room: roomDetails });
        }
      }
    }
  } catch (error) {
    res.json({ error });
  }
});

// router.post('/check/:id',auth,async(req, res)=>{
//     try {
//         // console.log(req.userId==)
//         if(req.userId=="jwt expired"){

//             const userId = await userModel.findById({_id:req.params.id});
//             const roomId = await roomModel.findByIdAndUpdate(
//                 {_id:userId.roomId},
//                 {isBooked:false},
//                 {new:true})

//             return  res.json({message:'room expired'})

//         }else{
//             res.json(req.userId)
//         }

//     } catch (error) {
//         res.json({error})
//     }
// })

router.get("/get", async (req, res) => {
  const find = await await userModel
    .find({})
    .populate({ path: "roomId", select: "name seats price -_id" })
    .select("name startDate startTime endDate endTime roomId -_id");

  res.json(find);
});
module.exports = router;
