const express = require('express');
const router = express.Router();
require('./connection');
const Product = require('./Product');
const multer = require('multer');
// const client = require('./connection');
// const { ObjectId } = require('mongodb');

router.get('/products', async (req, res) => {
  // const db = client.db('latihan');
  // const products = await db.collection('products').find().toArray();

  const products = await Product.find();
  if (products.length > 0) {
    res.send({
      status: 'success',
      message: 'list products',
      data: products,
    });
  } else {
    res.send({
      status: 'success',
      message: 'list products are not found',
    });
  }
});

router.get('/product/:id', async (req, res) => {
  // const db = client.db('latihan');
  // const id = new ObjectId(req.params.id);
  // const products = await db.collection('products').findOne({ _id: id });

  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.send({
        status: 'success',
        message: 'single product',
        data: product,
      });
    } else {
      res.send({
        status: 'warning',
        message: 'single product not found',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

router.post('/product', multer().none(), async (req, res) => {
  // const db = client.db('latihan');
  // const product = await db.collection('products').insertOne({

  try {
    const { name, price, stock, status } = req.body;
    const product = await Product.create({
      name,
      price,
      stock,
      status,
    });
    if (product) {
      res.send({
        status: 'success',
        message: 'add product success',
      });
    } else {
      res.send({
        status: 'warning',
        message: 'add product failed',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

router.put('/product/:id', multer().none(), async (req, res) => {
  // const db = client.db('latihan');
  // const id = new ObjectId(req.params.id);

  try {
    const id = req.params.id;
    const { name, price, stock, status } = req.body;
    const result = await Product.updateOne(
      { _id: id },
      {
        name,
        price,
        stock,
        status,
      },
      { runValidators: true }
    );

    if (result.modifiedCount == 1) {
      res.send({
        status: 'success',
        message: 'update product success',
      });
    } else {
      res.send({
        status: 'warning',
        message: 'update product failed',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

router.delete('/product/:id', async (req, res) => {
  // const db = client.db('latihan');
  // const id = new ObjectId(req.params.id);
  // const result = await db.collection('products').deleteOne({ _id: id });

  try {
    const id = req.params.id;
    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount == 1) {
      res.send({
        status: 'success',
        message: 'delete product success',
      });
    } else {
      res.send({
        status: 'warning',
        message: 'delete product failed',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router;
