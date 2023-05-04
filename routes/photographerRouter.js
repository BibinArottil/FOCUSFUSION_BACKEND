const router = require('express').Router()
const upload = require('../utilities/multer')

const photographer = require('../controllers/photographer/photographerController')
router.post('/register',upload.array("image",3),photographer.register)
router.post('/photographer-login',photographer.login)
router.post('/verify-token',photographer.photographerVerifyToken)

const profile = require("../controllers/photographer/accountDetails")
router.get("/account-details/:id",profile.profile)
router.put("/account-details",profile.updateProfile)

const booking = require("../controllers/photographer/booking")
router.get("/bookings/:id",booking.viewBookings)
router.patch("/update-bookings/:id",booking.updateBooking)

const displayProfile = require("../controllers/photographer/displayProfile")
router.get("/display-profile/:id",displayProfile.profile)
router.put("/display-profile",displayProfile.updateProfile)

const gallery = require("../controllers/photographer/gallery")
router.post("/gallery",gallery.gallery)
router.patch("/add-image",upload.array("image",5),gallery.addImage)

const message = require('../controllers/photographer/message')
router.post('/message',message.newMessage)
router.get('/message/:chatId',message.getMessage)

module.exports = router