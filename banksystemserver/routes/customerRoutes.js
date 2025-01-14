const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/create', async (req, res) => {
    const { accountId, introducerId } = req.body;
  
    if (!accountId || !introducerId) {
      return res.status(400).json({ message: 'Account ID and Introducer ID are required' });
    }
  
    const accountIdNumber = Number(accountId);
    const introducerIdNumber = Number(introducerId);
  
    if (isNaN(accountIdNumber) || isNaN(introducerIdNumber)) {
      return res.status(400).json({ message: 'Account ID and Introducer ID must be valid numbers' });
    }
  
    try {
      let beneficiaryId = 0;
  

      if (accountIdNumber === 0 || accountIdNumber === 1) {
        beneficiaryId = 0;
      } else {
        const introducer = await Customer.findOne({ accountId: introducerIdNumber });
  
        if (!introducer) {
          return res.status(400).json({ message: 'Introducer not found' });
        }
  
        const introducerBeneficiary = introducer.beneficiaryId;
  
        if (accountIdNumber % 2 === 0 && introducerBeneficiary) {
          beneficiaryId = introducerBeneficiary;
        } else {
          beneficiaryId = introducerIdNumber;
        }
      }
  
     
      const existingCustomer = await Customer.findOne({ accountId: accountIdNumber });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Account ID already exists' });
      }
  
      
      const newCustomer = new Customer({
        accountId: accountIdNumber,
        introducerId: introducerIdNumber,
        beneficiaryId,
      });
  
      await newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating customer', error });
    }
  });
  
  

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});

module.exports = router;
