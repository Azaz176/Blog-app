import User from './models/user.models.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

/********** Authentication using Passport ******* */
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    // Authentication logic here
    try {
      const user = await User.findOne({ email: email });
      // done takes three parameters (error, user, info)
      
      if (!user) return done(null, false, { msg: "Incorrect email" }); // User does not exist
      
      const isRightPassword = await user.comparePassword(password);
      // Check if the password is correct for that user
      if (isRightPassword) {
        //console.log(user)
        return done(null, user);
      }
      else return done(null, false, { msg: "Incorrect password" });
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
