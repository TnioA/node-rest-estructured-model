const sqlite = require('sqlite-sync');

class UserRepository {
    
    constructor() {}

    Migration() {
        try {
            sqlite.connect('db.sqlite'); 
            var content = [];
            content = sqlite.run('SELECT * FROM Customer;');
            sqlite.run('DROP TABLE Customer;');

            sqlite.run('CREATE TABLE User (Id INTEGER PRIMARY KEY AUTOINCREMENT,FullName VARCHAR(100),NickName VARCHAR(50),Password VARCHAR(500),IsMaster BIT);');
            sqlite.close();
            console.log('database updated successfuly');
            
        } catch (error) {
            console.log(error);
        }
    } 

    GetAllUsers() {
        try {
            sqlite.connect('db.sqlite'); 
            var content = [];
            content = sqlite.run('SELECT * FROM User;');
            sqlite.close();
            return content;
            
        } catch (error) {
            console.log(error);
        }
    }  

    GetUserById(id) {
        try {
            sqlite.connect('db.sqlite');
            var content = [];
            content = sqlite.run('SELECT * FROM User WHERE Id = ' + id + ';')[0];
            sqlite.close();
            return content === undefined ? -1 : content;
            
        } catch (error) {
            console.log(error);
        }
    }

    AddUser(user) {
        try {
            sqlite.connect('db.sqlite');
            var content = [];

            content = sqlite.run("INSERT INTO User (FullName, NickName, Password, IsMaster) VALUES('" + user.FullName + 
            "', '" + user.NickName + "', '" + user.Password + "', " + user.IsMaster + ");");

            sqlite.close();
            if(content.error === undefined){
                return { Success: true, Message: 'User inserted successfuly!'};
            }else{
                throw content.error;
            }

        } catch (error) {
            return { Success: false, Message: 'Error adding user', Error: error};
        }
    }

    EditUser(user) {
        try {
            sqlite.connect('db.sqlite');
            var content = [];

            content = sqlite.run("UPDATE User SET FullName = '" + user.FullName + "', NickName = '" + user.NickName + 
            "', Password = '" + user.Password + "', IsMaster = " + user.IsMaster + " WHERE Id = " + user.Id + ";");

            sqlite.close();
            if(content.error === undefined){
                return { Success: true, Message: 'Customer updated successfuly!'};
            }else{
                throw content.error;
            }
        } catch (error) {
            return { Success: false, Message: 'Error adding user', Error: error};
        }
    }

    RemoveUser(id){
        try {
            sqlite.connect('db.sqlite');
            var content = [];

            content = sqlite.run("DELETE FROM User WHERE Id = " + id + ";");

            sqlite.close();
            if(content.error === undefined){
                return { Success: true, Message: 'Customer removed successfuly!'};
            }else{
                throw content.error;
            }
        } catch (error) {
            return { Success: false, Message: 'Error removing user', Error: error};
        }
    }
}

module.exports = UserRepository;