const jwt = require('jsonwebtoken');
const User = require('../models/user');

const autorization = async (req, res, next) => {
       const token = req.headers['authorization'];
       
       try{
              const data = jwt.verify(token, process.env.JTW_SECRET)
              const user = await User.findOne({
                     _id:data._id,
                     'tokens.token':token,
                     'tokens.type':'logIn'
              })

              if(!user){
                     return res.status(401).send('Invalid User');
              }

              req.user = user;
              next();
       }catch(err){
              //eliminando token              
              res.status(401).send(err.message || err);

              const decoded = jwt.decode(token);
              await User.findOneAndUpdate(
                     { _id: decoded._id },
                     {$pull: {
                         tokens: {
                           token: token, 
                           type: 'logIn'
                         }
                       }
                     });
       }
};

const isAdmin = (req, res, next)=> {
       if(req.user.role === 'admin')
       return next();

       res.status(403).send('Ruta solo para admin');
};

module.exports = {autorization, isAdmin};