const express = require('express');
const { default: fetch } = require('node-fetch');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const auth = require('../middleware/auth');
var ObjectID = require('mongodb').ObjectID;
const { OLD_SITE_URL, API_PORT, StockId, SaleType } = process.env;
var im = require('imagemagick');
const resizeImg = require('resize-img');
const jMoment = require('moment-jalaali');
const ServiceSchema = require('../models/product/Services');
const ProductSchema = require('../models/product/products');
const BrandSchema = require('../models/product/brand');
const category = require('../models/product/category');
const { env } = require('process');
const filterNumber = require('../middleware/Functions');

const productCount = require('../models/product/productCount');
const productPrice = require('../models/product/productPrice');
const NormalTax = require('../middleware/NormalTax');
const openOrders = require('../models/orders/openOrders');
const Filters = require('../models/product/Filters');
const factory = require('../models/product/factory');
const orders = require('../models/orders/orders');
const faktor = require('../models/product/faktor');
const users = require('../models/auth/users');
const products = require('../models/product/products');
const UpdateMarket = require('../middleware/UpdateMarket');
const crmlist = require('../models/crm/crmlist');
const CanAnalyze = require('../middleware/CanAnalyze');
const Stocks = require('../models/product/Stocks');
const salePolicyGroupModel = require('../models/sale/salePolicyGroup');
const saleCommissionGroupModel = require('../models/sale/saleCommissionGroup');
const customerModel = require('../models/auth/customers');
const cartModel = require('../models/product/cart');

router.use(bodyParser.json());

router.route('/customers-list').post(async (req, res) => {
	try {
		const { userId, manageId, offset = 0, pageSize = 10, dateFrom = [], dateTo = [], brandId, productsList = [] } = req.body;
		const limit = parseInt(pageSize);
		const skip = parseInt(offset);
		const data = {
			manageId,
			userId,
			dateFrom: jMoment().startOf('day').toISOString(),
			dateTo: jMoment().endOf('day').toISOString(),
		};
		if (dateFrom[0]) {
			const [year, month, day] = dateFrom;
			data.dateFrom = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toISOString();
		}
		if (dateTo[0]) {
			const [year, month, day] = dateTo;
			data.dateTo = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').endOf('day').toISOString();
		}
		if (brandId) {
			data.brand = brandId;
		}
		if (productsList.length) {
			data.productsList = productsList;
		}
		const cartsMatchCondition = {
			initDate: {
				$gte: new Date(data.dateFrom),
				$lte: new Date(data.dateTo),
			},
		};
		if (data.manageId) {
			cartsMatchCondition.manageId = data.manageId;
		}
		if (data.userId) {
			cartsMatchCondition.userId = data.userId;
		}
		if (data.productsList) {
			cartsMatchCondition['cartItems.id'] = { $in: data.productsList };
		}
		const cartsAggregation = [
			{ $match: cartsMatchCondition },
			{
				$lookup: {
					from: 'tasks',
					localField: 'cartNo',
					foreignField: 'orderNo',
					as: 'taskInfo',
				},
			},
			{
				$match: {
					$and: [
						{ taskInfo: { $ne: [] } },
						{ 'taskInfo.taskStep': { $nin: ['cancel', 'quote'] } },
					],
				},
			},
			{ $addFields: { userId: { $toObjectId: '$userId' } } },
			{
				$lookup: {
					from: 'customers',
					localField: 'userId',
					foreignField: '_id',
					as: 'userInfo',
				},
			},
			{ $sort: { initDate: -1 } },
			{ $skip: skip },
			{ $limit: limit },
		];
		if (data.productsList) {
			cartsAggregation.unshift({ $unwind: '$cartItems' });
		}
		const reportList = await cartModel.aggregate(cartsAggregation);
		const userList = [];

		for (let i = 0; i < (reportList && reportList.length); i++) {
			const index = userList.findIndex((item) => item.id === reportList[i].userId);
			reportList[i].userInfo && index == -1 && userList.push({ id: reportList[i].userId, ...reportList[i].userInfo[0] });
		}
		return res.json({
			userList,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

router.route('/products-list').post(async (req, res) => {
	try {
		const { userId, offset = 0, pageSize = 10, dateFrom = [], dateTo = [], brandId, productsList = [] } = req.body;
		const limit = parseInt(pageSize);
		const skip = parseInt(offset);
		const data = {
			manageId: req.body.manageId,
			userId,
			dateFrom: jMoment().startOf('day').toISOString(),
			dateTo: jMoment().endOf('day').toISOString(),
		};
		if (dateFrom[0]) {
			const [year, month, day] = dateFrom;
			data.dateFrom = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toISOString();
		}
		if (dateTo[0]) {
			const [year, month, day] = dateTo;
			data.dateTo = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').endOf('day').toISOString();
		}
		if (brandId) {
			data.brand = brandId;
		}
		if (productsList.length) {
			data.productsList = productsList;
		}
		const cartsMatchCondition = {
			initDate: {
				$gte: new Date(data.dateFrom),
				$lte: new Date(data.dateTo),
			},
		};
		if (data.manageId) {
			cartsMatchCondition.manageId = data.manageId;
		}
		if (data.userId) {
			cartsMatchCondition.userId = data.userId;
		}
		if (data.productsList) {
			cartsMatchCondition['cartItems.id'] = { $in: data.productsList };
		}
		const cartsAggregation = [
			{ $match: cartsMatchCondition },
			{
				$lookup: {
					from: 'tasks',
					localField: 'cartNo',
					foreignField: 'orderNo',
					as: 'taskInfo',
				},
			},
			{
				$match: {
					$and: [
						{ taskInfo: { $ne: [] } },
						{ 'taskInfo.taskStep': { $nin: ['cancel', 'quote'] } },
					],
				},
			},
			{
				$unwind: {
					path: '$cartItems',
				},
			},
			{ $addFields: { userId: { $toObjectId: '$userId' } } },
			{
				$lookup: {
					from: 'customers',
					localField: 'userId',
					foreignField: '_id',
					as: 'userInfo',
				},
			},
			{
				$lookup: {
					from: 'products',
					localField: 'cartItems.sku',
					foreignField: 'sku',
					as: 'product',
				},
			},
			{
				$lookup: {
					from: 'brands',
					localField: 'product.brandId',
					foreignField: 'brandCode',
					as: 'brandData',
				},
			},
			{
				$group: {
					_id: '$cartItems.sku',
					list: {
						$push: '$$ROOT',
					},
				},
			},
			{ $sort: { _id: 1 } },
			{ $skip: skip },
			{ $limit: limit },
		];
		if (data.productsList) {
			cartsAggregation.unshift({ $unwind: '$cartItems' });
		}
		const reportList = await cartModel.aggregate(cartsAggregation);
		const sortList = reportList.map((i) => {
			const thisCartItem = i.list[0];
			const temp = {
				id: i._id,
				count: 0,
				totalPrice: 0,
				orderList: [],
				sku: thisCartItem.cartItems.sku,
				title: thisCartItem.cartItems.title,
				product: thisCartItem.product[0],
				price: thisCartItem.cartItems.price,
				brandData: thisCartItem.brandData[0],
			};
			i.list.forEach((item) => {
				const priceByPayValue = item.cartItems.price.find((p) => {
					return p.saleType === item.payValue;
				});
				const price = priceByPayValue ? parseInt(priceByPayValue.price) : 0;
				temp.count += item.cartItems.count;
				temp.totalPrice += price * item.cartItems.count;
				temp.orderList.push({
					title: item.cartNo,
					count: item.cartItems.count,
					user: item.userInfo[0].username,
				})
			})
			return temp;
		})
		return res.json({
            data: sortList,
        });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

router.post('/report-total', jsonParser, auth, async (req, res) => {
	try {
        return res.send();
		const { userId, offset = 0, pageSize = 10, dateFrom = [], dateTo = [], brandId, productsList = [] } = req.body;
		const limit = parseInt(pageSize);
		const skip = parseInt(offset);
		const data = {
			manageId: req.body.manageId,
			userId,
			dateFrom: jMoment().subtract(10, 'days').startOf('day').toISOString(),
			dateTo: jMoment().subtract(10, 'days').endOf('day').toISOString(),
		};
		if (dateFrom[0]) {
			const [year, month, day] = dateFrom;
			data.dateFrom = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toISOString();
		}
		if (dateTo[0]) {
			const [year, month, day] = dateTo;
			data.dateTo = jMoment(`${year}-${month}-${day}`, 'YYYY-MM-DD').endOf('day').toISOString();
		}
		if (brandId) {
			data.brand = brandId;
		}
		if (productsList.length) {
			data.productsList = productsList;
		}
		const cartsMatchCondition = {
			initDate: {
				$gte: new Date(data.dateFrom),
				$lte: new Date(data.dateTo),
			},
		};
		if (data.manageId) {
			cartsMatchCondition.manageId = data.manageId;
		}
		if (data.userId) {
			cartsMatchCondition.userId = data.userId;
		}
		if (data.productsList) {
			cartsMatchCondition['cartItems.id'] = { $in: data.productsList };
		}
		const cartsAggregation = [
			{ $match: cartsMatchCondition },
			{
				$lookup: {
					from: 'tasks',
					localField: 'cartNo',
					foreignField: 'orderNo',
					as: 'taskInfo',
				},
			},
			{
				$match: {
					taskInfo: { $ne: [] },
				},
			},
			// {
			//     $project: {
			//         taskInfo: 0
			//     },
			// },
			{ $addFields: { userId: { $toObjectId: '$userId' } } },
			{
				$lookup: {
					from: 'customers',
					localField: 'userId',
					foreignField: '_id',
					as: 'userInfo',
				},
			},
			{
				$group: '$userInfo._id',
				customers: {
					$push: '$userInfo',
				},
			},
			{ $sort: { initDate: -1 } },
			{ $skip: skip },
			{ $limit: limit },
		];
		if (data.productsList) {
			cartsAggregation.unshift({ $unwind: '$cartItems' });
		}
		const reportList = await cartModel.aggregate(cartsAggregation);

		var productList = [];
		var totalPrice = 0;
		var totalCount = 0;
		var userList = [];
		var errorPrice = [];
		var marketData = managerList.map((item) => ({ name: item.cName, username: item.username, id: item._id, count: 0, price: 0 }));
		var brandData = await BrandSchema.find().sort({ title: -1 }).lean();
		for (var i = 0; i < (reportList && reportList.length); i++) {
			var analyzeStatus = await CanAnalyze(reportList[i].cartNo);
			if (!analyzeStatus) continue;
			var payValue = reportList[i].payValue;
			// var cartItems = [reportList[i].cartItems]
			var cartItems = Array.isArray(reportList[i].cartItems) ? reportList[i].cartItems : [reportList[i].cartItems];
			var manageId = reportList[i].manageId;
			var itemAdd = 0;
			for (var j = 0; j < (cartItems && cartItems.length); j++) {
				const productDetail = await products.aggregate([
					{ $match: { sku: cartItems[j].sku } },
					{
						$lookup: {
							from: 'brands',
							localField: 'brandId',
							foreignField: 'brandCode',
							as: 'brandInfo',
						},
					},
					{
						$lookup: {
							from: 'category',
							localField: 'catId',
							foreignField: 'catCode',
							as: 'categoryInfo',
						},
					},
				]);
				var price = cartItems[j].price;
				cartItems[j].product = productDetail && productDetail[0];
				if (data.brand) if (cartItems[j].product && cartItems[j].product.brandId != data.brand) continue;

				itemAdd = 1;
				cartItems[j].brandData = cartItems[j].product && cartItems[j].product.brandInfo[0];
				try {
					price = cartItems[j].price.find((item) => item.saleType == payValue);
					if (price) price = parseInt(price.price);
				} catch {
					errorPrice.push(price);
				}
				var myItem = cartItems[j];
				myItem.totalPrice = price * myItem.count;
				resultData = await UpdateMarket(marketData, manageId, myItem.count, myItem.totalPrice, brandData, cartItems[j].product);
				marketData = resultData.marketArray;
				myItem.orderList = [
					{
						title: reportList[i].cartNo,
						count: myItem.count,
						user: reportList[i].userInfo && reportList[i].userInfo[0] && reportList[i].userInfo[0].username,
					},
				];
				brandData = resultData.brandArray;
				var index = productList.findIndex((item) => item.sku == myItem.sku);
				if (index == -1) {
					productList.push(myItem);
				} else {
					var cNumber = parseInt(productList[index].count);
					cNumber += parseInt(myItem.count);
					productList[index].count = cNumber;
					productList[index].orderList.push({
						title: reportList[i].cartNo,
						count: myItem.count,
						user: reportList[i].userInfo && reportList[i].userInfo[0] && reportList[i].userInfo[0].username,
					});

					var cPrice = parseInt(productList[index].totalPrice);
					cPrice += parseInt(myItem.totalPrice);
					productList[index].totalPrice = cPrice;
				}
				totalPrice += myItem.totalPrice;
				totalCount += parseInt(myItem.count);
			}
			if (itemAdd) {
				var index = userList.findIndex((item) => item.id == reportList[i].userId);
				reportList[i].userInfo && index == -1 && userList.push({ id: reportList[i].userId, ...reportList[i].userInfo[0] });
			}
		}
		const sortList = productList.sort(function (a, b) {
			var textA = a.sku.toUpperCase();
			var textB = b.sku.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});
		const brandList = await BrandSchema.find().sort({ title: -1 }).lean();
		return res.json({
			data: sortList,
			marketList: managerList,
			errorPrice: errorPrice,
			userList,
			brandList, // TODO: remove this line
			totalCount,
			totalPrice,
			marketData,
			brandData,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = router;
