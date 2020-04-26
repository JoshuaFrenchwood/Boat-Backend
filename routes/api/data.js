const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Boat = require('../../models/Boat');

//All Backend Endpoints

//Practice Get

router.get('/test', (req, res)=>{
    res.json({msg: "Success"});
})

//Send Data to Database
router.post('/create', async (req, res)=>{
    try{
        const boat = await Boat.create({
            speed: 0,
            direction: 0,
            name:"ABS"
        })
    
        res.status(200).json({
            boat,
            status: true
        })
    }catch(err){
        res.status(400).json({
            msg:"Only one boat in database",
            status: false
        })
    }
    
})


//Update Boat Data
router.post('/send', async (req, res)=>{
    const {speed, direction} = req.body;
    if(speed >20 ){
        return res.status(400).json({
            msg: "Speed is too high",
            status: false
        })
    }

    if(speed < 0 ){
        return res.status(400).json({
            msg: "Speed is too low",
            status: false
        })
    }

    if(direction >35 || direction < -35){
        return res.status(400).json({
            msg: "Direction is out of range",
            status: false
        })
    }

    const update = {
        speed,
        direction
    }

    const name = "ABS";

    let boat = await Boat.findOneAndUpdate(name,update);

    boat = await Boat.findOne({name});

    if(!boat){
        return res.status(404).json({
            msg: "Boat not found",
            status: false
        })
    }

    res.status(200).json({
        boat,
        status: true
    })
})

//Delete Boat
router.delete('/delete', async (req,res)=>{
    const name = "ABS";
    let boat = await Boat.findOne({name});
    if(!boat){
        return res.status(404).json({
            msg:"Boat was not found",
            status: false
        })
    }

    await boat.remove();

    res.status(200).json({
        msg:"Boat has been deleted",
        status: true
    })

})

//Get Boat Data
router.get('/get', async(req,res)=>{
    const name = "ABS";
    let boat = await Boat.findOne({name});
    if(!boat){
        return res.status(404).json({
            msg:"Boat was not found",
            status: false
        })
    }

    res.status(200).json({
        boat,
        status: true
    })
} )


module.exports = router