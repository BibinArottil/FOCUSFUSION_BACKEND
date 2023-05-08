const router = require("express").Router();
const upload = require("../utilities/multer");
const auth = require("../middleware/adminAuth");

const admin = require("../controllers/admin/adminController");
router.post("/admin-login", admin.adminLogin);
router.post("/verify-token", admin.adminVerifyToken);

const photographers = require("../controllers/admin/photographers");
router.get("/request", auth, photographers.request);
router.post("/accept", photographers.accept);
router.post("/reject", photographers.reject);
router.get("/list", auth, photographers.list);
router.post("/photographer-block", photographers.block);
router.post("/view-images", photographers.viewImages);

const users = require("../controllers/admin/users");
router.get("/users", users.userList);
router.post("/user-block", users.block);

const category = require("../controllers/admin/category");
router.get("/category", category.list);
router.post("/category-add", category.add);
router.patch("/category-block", category.block);
router.put("/category-edit", category.edit);

const banner = require("../controllers/admin/banner");
router.get("/banner", banner.list);
router.post("/banner-add", upload.single("photo"), banner.add);
router.put("/banner-edit", upload.single("photo"), banner.edit);
router.patch("/banner-block", banner.block);

const work = require('../controllers/admin/works')
router.get("/works",work.viewWorks)
router.patch("/works/:id",work.photographerPayment)
router.get("/history",work.history)
router.post("/sales",work.sales)

module.exports = router;
