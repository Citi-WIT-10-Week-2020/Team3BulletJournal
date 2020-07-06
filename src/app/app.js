var mongoUtil = require( 'mongoUtil' );

mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
} );