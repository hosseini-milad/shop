const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const auth = require("../middleware/auth");
var ObjectID = require("mongodb").ObjectID;
const multer = require("multer");
const fs = require("fs");
const user = require("../models/auth/users");
const customer = require("../models/auth/customers");
const payLog = require("../models/orders/payLog");
const tasks = require("../models/crm/tasks");
const ProfileAccess = require("../models/auth/ProfileAccess");
const orders = require("../models/orders/orders");
const cart = require("../models/product/cart");
const quickCart = require("../models/product/quickCart");
const classes = require("../models/auth/classes");
const Policy = require("../models/auth/Policy");
const category = require("../models/product/category");
const brand = require("../models/product/brand");
const Filters = require("../models/product/Filters");
const factory = require("../models/product/factory");
const crmlist = require("../models/crm/crmlist");
const sepidarPOST = require("../middleware/SepidarPost");

router.post("/fetch-user", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var userId = req.body.userId;
    try {
        const userData = await user.findOne({ _id: ObjectID(userId) });
        res.json({ data: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/list", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? parseInt(req.body.offset) : 0;
    try {
        const data = {
            orderNo: req.body.orderNo,
            status: req.body.status,
            customer: req.body.customer,
            access: req.body.access,
            offset: req.body.offset,
            brand: req.body.brand,
        };
        const reportList = await user.aggregate([
            { $match: data.access ? { access: data.access } : {} },
        ]);
        const filter1Report = data.customer
            ? reportList.filter(
                (item) =>
                    item &&
                    item.userInfo[0] &&
                    item.userInfo[0].cName &&
                    item.userInfo[0].cName.includes(data.customer)
            )
            : reportList;
        const orderList = filter1Report.slice(
            offset,
            parseInt(offset) + parseInt(pageSize)
        );
        const storeList = StoreList();
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
        res.json({
            filter: orderList,
            size: filter1Report.length,
            access: accessUnique,
            storeList,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-user", jsonParser, async (req, res) => {
    var userId = req.body._id;
    if (userId == "new") userId = "";
    const data = {
        username: req.body.username,
        cName: req.body.username,
        sName: req.body.sName,
        email: req.body.email,
        phone: req.body.phone,
        meli: req.body.meli,
        cCode: req.body.cCode,
        address: req.body.address,
        classess: req.body.classes,
        profile: req.body.profile,
        access: req.body.access,
        password: req.body.password,
        StockId: req.body.StockId,
        CustomerID: req.body.CustomerID,
    };
    try {
        const userData = userId
            ? await user.updateOne({ _id: ObjectID(userId) }, { $set: data })
            : await user.create(data);
        res.json({ data: userData, success: "تغییرات اعمال شدند" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const StoreList = () => {
    return [
        {
            StockID: 5,
            Code: 1,
            Title: "انبار مرکزی",
            IsActive: true,
        },
        {
            StockID: 6,
            Code: 2,
            Title: "انبار فروشگاه ",
            IsActive: true,
        },
        {
            StockID: 9,
            Code: 3,
            Title: "انبار 3",
            IsActive: true,
        },
        {
            StockID: 12,
            Code: 4,
            Title: "انبار غیر قابل فروش",
            IsActive: true,
        },
        {
            StockID: 13,
            Code: 5,
            Title: "انبار فروشگاه جایگاه",
            IsActive: true,
        },
        {
            StockID: 17,
            Code: 6,
            Title: "انبار پخش",
            IsActive: true,
        },
        {
            StockID: 21,
            Code: 7,
            Title: "انبار سایت",
            IsActive: true,
        },
    ];
};

/*Customers*/
router.post("/fetch-customer", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var userId = req.body.userId;
    try {
        const userData = await customer.findOne({ _id: ObjectID(userId) });
        res.json({ data: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/list-customers", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? parseInt(req.body.offset) : 0;
    try {
        const data = {
            orderNo: req.body.orderNo,
            status: req.body.status,
            customer: req.body.customer,
            access: req.body.access,
            offset: req.body.offset,
            brand: req.body.brand,
            official: req.body.official,
        };
        const reportList = await customer.aggregate([
            { $match: data.access ? { access: data.access } : {} },
            {
                $match: data.official
                    ? data.official == "official"
                        ? { agent: { $exists: false } }
                        : { agent: { $exists: true } }
                    : {},
            },
            {
                $match: data.customer
                    ? {
                        $or: [
                            { meli: new RegExp(".*" + data.customer + ".*") },
                            { phone: new RegExp(".*" + data.customer + ".*") },
                            { cName: new RegExp(".*" + data.customer + ".*") },
                            { username: new RegExp(".*" + data.customer + ".*") },
                            { mobile: new RegExp(".*" + data.customer + ".*") },
                        ],
                    }
                    : {},
            },
        ]);
        const filter1Report = reportList;
        const orderList = filter1Report.slice(
            offset,
            parseInt(offset) + parseInt(pageSize)
        );
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
        res.json({
            filter: orderList,
            size: filter1Report.length,
            access: accessUnique,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-customer", jsonParser, async (req, res) => {
    var userId = req.body.userId;
    const data = {
        cName: req.body.cName,
        sName: req.body.sName,
        //username:req.body.sName+" "+req.body.cName,
        email: req.body.email,
        phone: req.body.phone,
        mobile: req.body.mobile,
        meliCode: req.body.meliCode,
        cCode: req.body.cCode,
        Address: req.body.Address,
        postalCode: req.body.postalCode,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        about: req.body.about,
        roleId: req.body.roleId,
        nif: req.body.nif,
        perBox: req.body.perBox,
        active: req.body.active,
        official: req.body.official,

        birthDay: req.body.birthDay,
        clothSize: req.body.clothSize,
        call: req.body.call,
        urgCall: req.body.urgCall,
        contractCall: req.body.contractCall,
        zone: req.body.zone,
        gps: req.body.gps,
        workTime: req.body.workTime,
        website: req.body.website,
    };
    if (req.body.imageUrl1) data.imageUrl1 = req.body.imageUrl1;
    if (req.body.imageUrl2) data.imageUrl2 = req.body.imageUrl2;
    if (req.body.kasbUrl) data.kasbUrl = req.body.kasbUrl;
    if (req.body.shopUrl1) data.shopUrl1 = req.body.shopUrl1;
    if (req.body.shopUrl2) data.shopUrl2 = req.body.shopUrl2;
    if (req.body.shopUrl3) data.shopUrl3 = req.body.shopUrl3;
    const userOld = await customer.findOne({ _id: ObjectID(userId) });
    if (!userOld) {
        res.status(400).json({
            error: "کاربر پیدا نشد",
        });
        return;
    }
    if (!data.cName) data.cName = userOld.cName;
    if (!data.sName) data.sName = userOld.sName;
    data.username = data.sName + " " + data.cName;
    try {
        const userData = await customer.updateOne(
            { _id: ObjectID(userId) },
            { $set: data }
        );
        res.json({ data: userData, success: "تغییرات اعمال شدند" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/create-customer", jsonParser, async (req, res) => {
    var agent = req.headers["userid"];
    const data = req.body;
    data.username = data.sName + " " + data.cName;
    data.agent = agent;
    data.active = true
    try {
        const userData = await customer.create(data);
        res.json({ data: userData, success: "مشتری اضافه شد" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/my-customer", auth, jsonParser, async (req, res) => {
    var search = req.body.search;
    try {
        const userData = await customer.aggregate([
            { $match: { agent: { $exists: true } } },
            {
                $match: search
                    ? {
                        $or: [
                            { meli: new RegExp(".*" + search + ".*") },
                            { phone: new RegExp(".*" + search + ".*") },
                            { cName: new RegExp(".*" + search + ".*") },
                            { username: new RegExp(".*" + search + ".*") },
                            { mobile: new RegExp(".*" + search + ".*") },
                        ],
                    }
                    : {},
            },
        ]);
        res.json({ data: userData, success: "مشتری پیدا شد" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*Profile*/
router.post("/fetch-profile", jsonParser, async (req, res) => {
    var profileId = req.body.profileId;
    try {
        const profileData = await ProfileAccess.findOne({
            _id: ObjectID(profileId),
        });
        const crmData = await crmlist.findOne({});
        res.json({ data: profileData, crmData: crmData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/list-profiles", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? parseInt(req.body.offset) : 0;
    try {
        const data = {
            rderNo: req.body.orderNo,
        };
        const profilesList = await ProfileAccess.find();
        res.json({ profiles: profilesList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-profile", jsonParser, async (req, res) => {
    var profileId = req.body.profileId;
    if (profileId === "new") profileId = "";
    const data = {
        profileName: req.body.profileName,
        profileCode: req.body.profileCode,
        manId: req.body.manId,
        parentId: req.body.parentId,
        access: req.body.access,
    };
    try {
        //const profile = await ProfileAccess.find({_id: ObjectID(profileId)})
        var profileData = "";
        if (profileId)
            profileData = await ProfileAccess.updateOne(
                { _id: ObjectID(profileId) },
                { $set: data }
            );
        else profileData = await ProfileAccess.create(data);

        res.json({ data: profileData, success: "تغییرات اعمال شدند" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/fetch-class", jsonParser, async (req, res) => {
    var classId = req.body.classId;
    if (classId === "new") classId = "";
    try {
        const classData =
            classId && (await classes.findOne({ _id: ObjectID(classId) }));
        const userClass =
            classData &&
            (await user.find({
                class: { $elemMatch: { _id: String(classData._id) } },
            }));
        const customerClass =
            classData &&
            (await customer.find({
                class: { $elemMatch: { _id: String(classData._id) } },
            }));
        const policyClass =
            classData && (await Policy.find({ classId: String(classData._id) }));
        res.json({
            filter: classData,
            userClass: userClass,
            policyClass: policyClass,
            customerClass: customerClass,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/list-classes", jsonParser, async (req, res) => {
    try {
        //const classList = await classes.find()
        const allClasses = await classSeprate(req.body.userId);
        res.json(allClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-class", jsonParser, async (req, res) => {
    var classId = req.body.classId;
    if (classId === "new") classId = "";
    const data = {
        className: req.body.className,
        classEn: req.body.classEn,
        classCat: req.body.classCat,
        manId: req.body.manId,
    };
    try {
        //const profile = await ProfileAccess.find({_id: ObjectID(profileId)})
        var profileData = "";
        if (classId)
            classData = await classes.updateOne(
                { _id: ObjectID(classId) },
                { $set: data }
            );
        else classData = await classes.create(data);

        const allClasses = await classSeprate(req.body.userId);
        res.json(allClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-user-class", jsonParser, async (req, res) => {
    var userId = req.body.userId;
    const data = {
        class: req.body.class,
    };
    try {
        const userData = await user.findOne({ _id: ObjectID(userId) });
        var userClass = userData.class ? userData.class : [];
        var found = 0;
        for (var i = 0; i < userClass.length; i++) {
            if (userClass[i]._id == data.class._id) {
                userClass.splice(i, 1);
                found = 1;
            }
        }
        !found && userClass.push(data.class);

        const newClassUser = await user.updateOne(
            { _id: ObjectID(userId) },
            { $set: { class: userClass } }
        );
        //const allClasses =await classSeprate(req.body.userId)
        res.json({ data: newClassUser, status: "23" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-customer-class", jsonParser, async (req, res) => {
    var userId = req.body.userId;
    const data = {
        class: req.body.class,
    };
    try {
        const userData = await customer.findOne({ _id: ObjectID(userId) });
        var userClass = userData.class ? userData.class : [];
        var found = 0;
        for (var i = 0; i < userClass.length; i++) {
            if (userClass[i]._id == data.class._id) {
                userClass.splice(i, 1);
                found = 1;
            }
        }
        !found && userClass.push(data.class);

        const newClassUser = await customer.updateOne(
            { _id: ObjectID(userId) },
            { $set: { class: userClass } }
        );
        //const allClasses =await classSeprate(req.body.userId)
        res.json({ data: newClassUser, status: "23" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/// حذف مشتری از پنل اگر در مودل های
///orderوcartوquickCart 
/// رکوردی موجود نباشد.
///و اینکه به گفته مهندس میلاد، یوزر ایدی همان کاستومر ایدی می باشد
router.post("/delete-customer", jsonParser, async (req, res) => {
    var { userId } = req.body;
    if (!userId)
        return res.status(500).json({ message: "شناسه کاربر ارسال نشده است" });
    userId
    try {
        const userData = await customer.findOne({ _id: ObjectID(userId) });
        if (!userData)
            return res
                .status(400)
                .json({ message: "کاربر با این شناسه در سامانه وجود ندارد" });
        const order = await orders.findOne({ userId });
        if (order)
            return res
                .status(400)
                .json({
                    message: `مشتری دارای سفارشی با شماره ${order.orderNo} می باشد`,
                });
        const cartObj = await cart.findOne({ userId });
        if (cartObj)
            return res
                .status(400)
                .json({
                    message: `مشتری دارای سبد خرید با شماره ${cartObj.cartNo} می باشد`,
                });
        const quickCartObj = await quickCart.findOne({ userId });
        if (quickCartObj)
            return res
                .status(400)
                .json({
                    message: `مشتری دارای ${"quickCart"} می باشد`,
                });
        const deleteResponse = await customer.deleteOne({ _id: ObjectID(userId) });
        if (!deleteResponse.acknowledged)
            res.status(500).json({ message: 'خطا در حذف مشتری داده' })
        res.json({ message: "مشتری با موفقیت حذف شد." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const classSeprate = async (userId) => {
    const allClass = await classes.find();

    var userData = await user.findOne({ _id: ObjectID(userId) });
    if (!userData) userData = await customer.findOne({ _id: ObjectID(userId) });
    const assignClass = userData && userData.class;

    var availableClass = [];
    if (assignClass)
        for (var i = 0; i < allClass.length; i++) {
            var found = 0;
            for (var j = 0; j < assignClass.length; j++) {
                if (allClass[i]._id == assignClass[j]._id) {
                    found = 1;
                    break;
                }
            }
            !found && availableClass.push(allClass[i]);
        }
    else availableClass = allClass;
    return {
        availableClass: availableClass,
        assignClass: assignClass,
        filter: allClass,
    };
};

router.post("/fetch-policy", jsonParser, async (req, res) => {
    var policyId = req.body.policyId;
    try {
        const policyData =
            policyId !== "new" &&
            (await Policy.aggregate([
                { $match: { _id: ObjectID(policyId) } },
                { $addFields: { user_Id: { $toObjectId: "$userId" } } },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_Id",
                        foreignField: "_id",
                        as: "userInfo",
                    },
                },
            ]));
        const classData = await classes.find();
        const catData = await category.find();
        const brandData = await brand.find();
        const filterData = await Filters.find();
        res.json({
            filter: policyData && policyData[0],
            classes: classData,
            brands: brandData,
            filters: filterData,
            category: catData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/option-policy", jsonParser, async (req, res) => {
    const category = req.body.category;
    const factoryInfo = req.body.factory;
    const catId = String(category._id);
    try {
        const brandData = category.brands; //await brand.find()
        //console.log(brandData)
        const factoryData = await factory.find();
        const filterData = await Filters.find();
        const resultBrand = [];
        const resultFilter = [];
        for (var i = 0; i < filterData.length; i++) {
            if (filterData[i].category._id === catId)
                resultFilter.push(filterData[i]);
        }
        if (factoryInfo && brandData)
            for (var i = 0; i < brandData.length; i++) {
                const brandFact = brandData[i].factory;
                if (brandFact)
                    for (var j = 0; j < brandFact.length; j++) {
                        if (brandFact[j]._id === factoryInfo._id)
                            resultBrand.push(brandData[i]);
                    }
            }
        res.json({
            factory: factoryData,
            filters: resultFilter,
            brands: factoryInfo ? resultBrand : brandData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/list-policy", jsonParser, async (req, res) => {
    try {
        const policyList = await Policy.aggregate([
            { $addFields: { user_Id: { $toObjectId: "$userId" } } },
            {
                $lookup: {
                    from: "users",
                    localField: "user_Id",
                    foreignField: "_id",
                    as: "userInfo",
                },
            },
        ]);
        //const allClasses =await classSeprate(req.body.userId)
        res.json({ filter: policyList, message: "List" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-policy", jsonParser, async (req, res) => {
    var policyId = req.body.policyId;
    if (policyId === "new") policyId = "";
    const data = req.body;
    try {
        //const profile = await ProfileAccess.find({_id: ObjectID(profileId)})
        var policyData = "";
        if (policyId)
            policyData = await Policy.updateOne(
                { _id: ObjectID(policyId) },
                { $set: data }
            );
        else policyData = await Policy.create(data);

        //const allPolicy =await classSeprate(req.body.userId)
        res.json({ data: policyData, status: "Done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/update-user-class", jsonParser, async (req, res) => {
    var userId = req.body.userId;
    const data = {
        class: req.body.class,
    };
    try {
        const userData = await user.findOne({ _id: ObjectID(userId) });
        var userClass = userData.class ? userData.class : [];
        var found = 0;
        for (var i = 0; i < userClass.length; i++) {
            if (userClass[i]._id == data.class._id) {
                userClass.splice(i, 1);
                found = 1;
            }
        }
        !found && userClass.push(data.class);
        const newClassUser = await user.updateOne(
            { _id: ObjectID(userId) },
            { $set: { class: userClass } }
        );
        //const allClasses =await classSeprate(req.body.userId)
        res.json({ data: newClassUser, status: "23" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/sendSMS", jsonParser, async (req, res) => {
    var userId = req.body.userId;
    const data = {
        users: req.body.users,
        message: req.body.message,
    };
    try {
        var messageStatus = [];
        for (var i = 0; i < data.users.length; i++) {
            const result = await sendMessageUser(data.users[i], data.message);
            messageStatus.push({ status: result, userId: data.users[i] });
        }
        res.json({
            data: messageStatus,
            sentStatus: messageStatus.length + " sent",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/allow-menu", auth, jsonParser, async (req, res) => {
    var userId = req.headers["userid"];
    if (!userId) {
        res.status(500).json({ error: "no Credit" });
    }
    try {
        const userData = await user.findOne({ _id: ObjectID(userId) });
        const profileData = await ProfileAccess.findOne({
            _id: ObjectID(userData.profile),
        });

        res.json({ access: profileData.access, message: "Profile List" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

var storage = multer.diskStorage({
    destination: "/dataset/",
    filename: function (req, file, cb) {
        cb(null, "Deep" + "-" + Date.now() + "-" + file.originalname);
    },
});
const uploadImg = multer({ storage: storage, limits: { fileSize: "5mb" } });

router.post("/upload", uploadImg.single("upload"), async (req, res, next) => {
    const folderName = req.body.folderName ? req.body.folderName : "temp";
    try {
        // to declare some path to store your converted image
        var matches = req.body.base64image.match(
            /^data:([A-Za-z-+/]+);base64,(.+)$/
        ),
            response = {};
        if (matches.length !== 3) {
            return new Error("Invalid input string");
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], "base64");
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        //let type = decodedImg.type;
        //let extension = mime.extension(type);
        let fileName = `MGM-${Date.now().toString() + "-" + req.body.imgName}`;
        var upUrl = `/upload/${folderName}/${fileName}`;
        fs.writeFileSync("." + upUrl, imageBuffer, "utf8");
        return res.send({ status: "success", url: upUrl });
    } catch (e) {
        res.send({ status: "failed", error: e });
    }
});

router.post("/transactions", jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? parseInt(req.body.offset) : 0;
    try {
        const data = {
            orderNo: req.body.orderNo,
            status: req.body.status,
            customer: req.body.customer,
        };
        const reportList = await payLog.aggregate([
            { $match: data.orderNo ? { stockOrderNo: data.orderNo } : {} },

            {
                $match: data.status
                    ? { payStatus: data.status }
                    : { payStatus: { $in: ["paid", "undone"] } },
            },
            { $sort: { payDate: -1 } },
        ]);
        const filter1Report = /*data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):*/ reportList;
        const logList = filter1Report.slice(
            offset,
            parseInt(offset) + parseInt(pageSize)
        );
        for (var i = 0; i < logList.length; i++) {
            var orderData = await orders.aggregate([
                { $match: { orderNo: logList[i].orderNo } },
                { $addFields: { user_Id: { $toObjectId: "$userId" } } },
                {
                    $lookup: {
                        from: "customers",
                        localField: "user_Id",
                        foreignField: "_id",
                        as: "userDetail",
                    },
                },
            ]);
            logList[i].orderData = orderData;
            logList[i].userDetail = [];
        }
        res.json({ filter: logList, size: filter1Report.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/taskData", async (req, res) => {
    const taskId = req.body.taskId;
    try {
        const taskDetail = taskId && (await tasks.findOne({ _id: taskId }));
        const currentUser =
            taskDetail &&
            taskDetail.assign &&
            (await user.findOne({ _id: taskDetail.assign }));
        const currentProfile =
            taskDetail &&
            taskDetail.profile &&
            (await ProfileAccess.findOne({ _id: taskDetail.profile }));
        const profileList = await ProfileAccess.find();
        const userDetails = await user.find({
            profile: { $exists: true },
            cName: { $nin: [""] },
            access: { $nin: ["customer"] },
        });
        res.json({
            user: userDetails,
            currentUser: currentUser ? currentUser : "",
            currentAssign: currentProfile ? currentProfile : "",
            profileList: profileList,
            message: "list users",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/formal-customer", async (req, res) => {
    const userInfo = req.body.userData;
    const customerQuery = SepidarUser(userInfo);
    //console.log(customerQuery)
    if (!customerQuery) {
        res
            .status(400)
            .json({
                message: "اطلاعات کافی نیست، کدملی، کدپستی و شماره تماس اجباری است",
                error: "error occure",
            });
        return;
    }
    const sepidarResult =
        customerQuery &&
        (await sepidarPOST(customerQuery, "/api/Customers", "", "admin"));
    //console.log(sepidarResult)
    if (!sepidarResult || sepidarResult.Message) {
        res
            .status(400)
            .json({
                message: sepidarResult ? sepidarResult.Message : "Error",
                error: "error occure",
            });
        return;
    }
    //console.log(userInfo)
    if (sepidarResult.CustomerID) {
        await customer.updateOne(
            { _id: userInfo._id },
            {
                $set: {
                    CustomerID: sepidarResult.CustomerID,
                    creator: userInfo.agent,
                    agent: "",
                },
            },
            { $unset: { agent: 1 } }
        );
    }
    res.json({
        query: customerQuery,
        result: sepidarResult,
        message: "مشتری در سپیدار ثبت شد",
    });
    //
    return;
    const taskId = req.body.taskId;
    try {
        const taskDetail = taskId && (await tasks.findOne({ _id: taskId }));
        const currentUser =
            taskDetail &&
            taskDetail.assign &&
            (await user.findOne({ _id: taskDetail.assign }));
        const currentProfile =
            taskDetail &&
            taskDetail.profile &&
            (await ProfileAccess.findOne({ _id: taskDetail.profile }));
        const profileList = await ProfileAccess.find();
        const userDetails = await user.find({
            profile: { $exists: true },
            cName: { $nin: [""] },
            access: { $nin: ["customer"] },
        });
        res.json({
            user: userDetails,
            currentUser: currentUser ? currentUser : "",
            currentAssign: currentProfile ? currentProfile : "",
            profileList: profileList,
            message: "list users",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
function normalNumber(number) {
    return number.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}
const SepidarUser = (data) => {
    if (!data) return "";
    if (!data.meliCode || !data.postalCode || (!data.phone && !data.mobile))
        return "";
    var max = 999999999999;
    var min = 100000000000;
    var query = {
        GUID:
            "124ab075-fc79-417f-b8cf-" + Math.ceil(Math.random() * (max - min) + min),
        PhoneNumber: normalNumber(data.phone ? data.phone : data.mobile),
        CustomerType: 1,
        Name: data.cName,
        LastName: data.sName,
        NationalID: data.meliCode,
        EconomicCode: data.roleId,
        Addresses: [
            {
                Title: data.Address ? data.Address.split(" ")[0] : "شریف اویل",
                IsMain: true,
                CityRef: 1,
                Address: data.Address,
                ZipCode: data.postalCode,
                Latitude: "", //data.nif?data.nif.split(','||'|')[0]:"",
                Longitude: "", //data.nif?data.nif.split(',')[0]:"",
                GUID: "3fa85f64-5717-4562-b3fc-2c" + data.meliCode,
            },
        ],
    };
    return query;
};

module.exports = router;
