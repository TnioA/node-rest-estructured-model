const UserController = require('../Controller/UserController.js');

class Router {

    userController = new UserController();

     constructor(app) {

        app.route('/api/user/getAll').get(this.userController.GetAll);
        app.route('/api/user/getById/:id').get(this.userController.GetById);
        app.route('/api/user/add').post(this.userController.Add);
        app.route('/api/user/edit').post(this.userController.Edit);
        app.route('/api/user/remove/:id').get(this.userController.Remove);   
    }
}

module.exports = Router;