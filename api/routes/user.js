module.exports = app => {
  const controller = require('../controllers/user.js')();

  app.route('/api/user/getAll').get(controller.getAll);
  app.route('/api/user/getById/:id').get(controller.getById);
  app.route('/api/user/add').post(controller.add);
  app.route('/api/user/edit').post(controller.edit);
  app.route('/api/user/remove/:id').post(controller.remove);
}