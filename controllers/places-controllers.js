const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');


// let DUMMY_PLACES = 
// [
//     {
//       id: 'p1',
//       title: 'Empire State Building',
//       description: 'One of the most famous sky scrapers in the world!',
//       imageUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//       address: '20 W 34th St, New York, NY 10001',
//       location: {
//         lat: 40.7484405,
//         lng: -73.9878584
//       },
//       creator: 'u1'

//     }  
// ]


async function getPlaceById(req, res, next)  {
    const placeId = req.params.pid; 
    let place;
    try{
       place = await Place.findById(placeId);
    } catch(err){
      const error = new HttpError('Something went wrong, please try again.',500); 
      return next(error);
    }
    
    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.',404);
        error.code = 404;
        return next(error);
      }
    res.json({place: place.toObject({getters: true})}); 
  };


  async function getPlacesByUserId(req, res, next)  {
    const userId = req.params.uid;
    
    let places;
    try{
      places = await Place.find({creator: userId});
    } catch(err){
      const error = new HttpError('Fetching places failed, please try again.', 500);
      return next(error);
    }

    if (!places || places.length === 0) {
        const error = new HttpError('Could not find a place for the provided user id.',404);
        return next(error);
      }
  
    res.json({ places: places.map(place => place.toObject({getters: true}))});
  }

  async function createPlace(req,res,next) {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      creator
    })

    let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};


  async function updatePlace(req,res,next){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new HttpError('Invalid input passed, please check your data.',422);
        return next(error);
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;

    let place;
    try{
      place = await Place.findById(placeId);
    } catch(err){
      const error = new HttpError('Something failed, could not update.', 500);
      return next(error);
    }
    
    place.title = title;
    place.description = description;

    try{
      await place.save();
    } catch(err) {
      const error = new HttpError('Could not update place, plese try again.', 500);
      return next(error);
    }
    
    res.status(200).json({place: place.toObject({getters: true})});
  }

  async function deletePlace(req, res, next) {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
        if (!place) {
            const error = new HttpError('Place not found, could not delete.', 404);
            return next(error);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place with the provided id.', 500);
        return next(error);
    }

    if(!place){
      const error = new HttpError('Could not find place for the provided id.',404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await Place.deleteOne({ _id: placeId }, { session: sess });
      place.creator.places.pull(place);
      await place.creator.save({session: sess});
      await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted place' });
}


  exports.getPlaceById = getPlaceById;
  exports.getPlacesByUserId = getPlacesByUserId;
  exports.createPlace = createPlace;
  exports.updatePlace = updatePlace;
  exports.deletePlace = deletePlace;
