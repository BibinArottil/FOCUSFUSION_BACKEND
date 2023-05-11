const router = require("express").Router();
const upload = require("../utilities/multer")

const user = require("../controllers/user/userController");
router.post("/signup", user.signup);
router.post("/otp-verify", user.otpVerify);
router.post("/user-login", user.userLogin);
router.post("/forgot-password", user.forgotPassword);
router.post("/new-password", user.newPassword);
router.get("/home-banner", user.banner);
router.post("/users", user.getUser);
router.post("/verify-token", user.userVerifyToken);

const profile = require("../controllers/user/profile")
router.get("/profile/:id",profile.profile)
router.put("/profile",profile.updateProfile)
router.post("/profile-pic/:id",upload.single('photo'),profile.addProfilePic)

const photographerList = require("../controllers/user/photographerList");
router.get("/list", photographerList.photographerList);

const chat = require("../controllers/user/chat");
router.post("/chat", chat.newChat);
router.get("/chat/:userId", chat.getChat);
router.post("/get-chat", chat.userChat);

const booking = require("../controllers/user/booking");
router.get("/company-list",booking.company)
router.post("/shoot-booking", booking.shootBooking);
router.get("/bookings/:id",booking.viewBooking)
router.get("/booking-history/:id",booking.history)
router.patch("/booking-update/:id",booking.updateSuccess)
router.patch("/booking-cancel/:id",booking.bookingCancel)

const review = require("../controllers/user/review")
router.post("/review",review.addReview)
router.get("/review/:id",review.viewReview)
router.get("/view-review/:id",review.ownReview)
router.patch("/view-review/:id",review.ownReviewEdit )

module.exports = router;
