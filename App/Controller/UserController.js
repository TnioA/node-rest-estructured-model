const UserRepository = require('../Repository/UserRepository.js');
var crypto = require('crypto');

class UserController {

    _userRepository;

    constructor() {
        this._userRepository = new UserRepository();
     }

    GetAll = (req, res) => {
        var customerList = this._userRepository.GetAllUsers();
        res.status(200).json(customerList);
    }
    
    GetById = (req, res) => {    
        let customerId = req.params.id;
        const foundCustomerIndex = this._userRepository.GetUserById(customerId);
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

    Add = (req, res) => {
        var user = {
            FullName: req.body.FullName,
            NickName: req.body.NickName,
            Password: this.GetPasswordHash(req.body.Password),
            IsMaster: req.body.IsMaster
        }
        
        res.status(200).json(this._userRepository.AddUser(user));
    }

    Edit = (req, res) => {

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
                Password: this.GetPasswordHash(req.body.Password),
                IsMaster: req.body.IsMaster
            }

            console.log(user);

            const foundCustomerIndex = this._userRepository.GetUserById(req.body.Id);
            if (foundCustomerIndex === -1) {
                res.status(404).json({
                    Message: 'Customer does not exist.',
                    Success: false,
                    Customers: [],
                });
            } else {  
                res.status(200).json(this._userRepository.EditUser(foundCustomerIndex));
            }
        }
    }

    Remove = (req, res) => {
        let customerId = req.params.id;

        const foundCustomer = this._userRepository.GetUserById(customerId);

        if (foundCustomer === -1) {
            res.status(404).json({
                message: 'Customer does not exist.',
                success: false
            });
        } else {
            this._userRepository.RemoveUser(customerId);
            res.status(200).json({
                message: 'Cliente encontrado e deletado com sucesso!',
                success: true
            });
        }
    }

    GetPasswordHash(pass) {
        var hash = crypto.createHash('md5').update(pass).digest('hex');
        return hash
    }
}

module.exports = UserController;