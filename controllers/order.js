const Order = require('../models/Order');
const { validationResult } = require('express-validator');

exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  await Order.create({
    user: req.body.user,
    item: req.body.item,
    totalCount: req.body.totalCount,
    totalAmount: req.body.totalAmount,
    address: req.body.address,
    discount: req.body.discount
  }).then((order) => {
    return res.status(201).send({ error: "false", message: "Successfully created order", data: order });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Error occured, please try again" });
  });
};

exports.getAll = async (req, res, next) => {
  await Order.find().populate('user').sort('created_at').exec((err, order) => {
    if(err){
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    }
    return res.status(200).send({ error: false, message: "Sucessfully fetched all order", data: order });
  });
}

exports.getOne = async (req, res, next) => {
  await Order.findById(req.params.id).populate('user').sort('created_at').exec((err, order) => {
    if(err){
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    }
    if(!order){
      return res.status(500).send({ error: true, message: "Order not found" });
    }
    return res.status(200).send({ error: false, message: "Sucessfully fetched order", data: order });
  });
}
