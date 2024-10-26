const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const getCordsForAddress = require('../util/location');


let DUMMY_PLACES = 
[
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'

    }  
]


function getPlaceById(req, res, next)  {
    const placeId = req.params.pid; 
    const place = DUMMY_PLACES.find(p => {
      return p.id === placeId;
    });
    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.',404);
        error.code = 404;
        return next(error);
      }
    res.json({place}); 
  };


  function getPlacesByUserId(req, res, next)  {
    const userId = req.params.uid;
  
    const places = DUMMY_PLACES.filter(p => {
      return p.creator === userId;
    });

    if (!places || places.length === 0) {
        const error = new HttpError('Could not find a place for the provided user id.',404);
        return next(error);
      }
  
    res.json({ places });
  }

  const createPlace = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid input passed, please check your data.',422));
    }
    const {title, description, address, creator } = req.body;

    let coordinates;
    try{
        coordinates = await getCordsForAddress(address);
    }catch(error){
        return next(error);
    }

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createPlace);

    res.status(201).json({createdPlace});
  }

  function updatePlace(req,res,next){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid input passed, please check your data.',422);
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatePlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatePlace.title = title;
    updatePlace.description = description;
    DUMMY_PLACES[placeIndex] = updatePlace
    res.status(200).json({place: updatePlace});
  }

  function deletePlace(req,res,next){
    const placeId = req.params.pid;
    if(DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find a place for that id.',404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: 'Deleted place'})
  }

  exports.getPlaceById = getPlaceById;
  exports.getPlacesByUserId = getPlacesByUserId;
  exports.createPlace = createPlace;
  exports.updatePlace = updatePlace;
  exports.deletePlace = deletePlace;
