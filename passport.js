const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: "677700427736-gfrb78gogor2oi0q93km8nociulleo27.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "https://stark-beach-01901.herokuapp.com/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
