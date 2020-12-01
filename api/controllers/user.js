const context = require('../repository/repository.js');
var crypto = require('crypto');

module.exports = () => {
    const controller = {};

    controller.getAll = (req, res) => {
        var customerList = context.getAllUsers();
        res.status(200).json(customerList);
    }
    
    controller.getById = (req, res) => {    
        let customerId = req.params.id;
        const foundCustomerIndex = context.getUserById(customerId);
        if (foundCustomerIndex === -1) {
            res.status(404).json({
                Message: 'Customer does not exist.',
                Success: false,
                Customers: [],
            });
        } else {  
            res.status(200).json({
                user: foundCustomerIndex,
            });
        }
    }

    controller.add = (req, res) => {
        var user = {
            FullName: req.body.FullName,
            NickName: req.body.NickName,
            Password: getPasswordHash(req.body.Password),
            IsMaster: req.body.IsMaster
        }
        
        res.status(200).json(context.addUser(user));
    }

    controller.edit = (req, res) => {

        if(req.body.Id === undefined || req.body.FullName === undefined || req.body.FullName === undefined ||
            req.body.Password === undefined || req.body.IsMaster === undefined) {
            res.status(404).json({
                Message: 'Incorrect json data. Please verify if all arguments were passed',
                Success: false,
                Customers: [],
            });
        } 
        else {
            var user = {
                Id: req.body.Id,
                FullName: req.body.FullName,
                NickName: req.body.NickName,
                Password: getPasswordHash(req.body.Password),
                IsMaster: req.body.IsMaster
            }

            console.log(user);

            const foundCustomerIndex = context.getUserById(req.body.Id);
            if (foundCustomerIndex === -1) {
                res.status(404).json({
                    Message: 'Customer does not exist.',
                    Success: false,
                    Customers: [],
                });
            } else {  
                res.status(200).json(context.editUser(foundCustomerIndex));
            }
        }
    }

    controller.remove = (req, res) => {
        let customerId = req.params.id;

        const foundCustomerIndex = customerList.findIndex(customer => customer.id === customerId);
        if (foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Customer does not exist.',
                success: false,
                customers: [],
            });
        } else {
            customerList.splice(foundCustomerIndex, 1);
            res.status(200).json({
                message: 'Cliente encontrado e deletado com sucesso!',
                success: true,
                customers: customerList,
            });
        }
    }

    function getPasswordHash(pass) {
        var hash = crypto.createHash('md5').update(pass).digest('hex');
        return hash
    }

  return controller;
}