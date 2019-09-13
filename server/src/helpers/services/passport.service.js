const passport = require( "passport" ),
  LocalStrategy = require( "passport-local" ).Strategy,
  Account = require( "../../models/Account.model" );

passport.use(
  new LocalStrategy(
    {
      "usernameField": "email"
    },
    async ( email, password, done ) => {
      try {
        // Find the user given the email
        const user = await Account.findOne( { email } );
        // If not, handle it

        if ( !user ) {
          return done( null, false );
        }
        // Check if the password is correct
        let isMatch = await user.isValidPassword( password );
        // If not, handle it

        if ( !isMatch ) {
          return done( null, false );
        }
        // otherwise, return the user
        done( null, user );
      } catch ( e ) {
        done( e, false );
      }
    }
  )
);

// TELL PASSPORT.JS HOW TO HANDLE A GIVEN USER OBJECT
passport.serializeUser( ( user, done ) => {
  done( null, user );
} );

// HANDLE IT WHEN A USER MAKES A REQUEST FOR A SECURED URL
passport.deserializeUser( ( id, done ) => {
  let user = Account.find( ( dataUser ) => {
    return dataUser._id === id;
  } );

  done( null, user );
} );
