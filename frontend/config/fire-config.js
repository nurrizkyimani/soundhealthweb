import firebase from 'firebase/app';


try {
	// Use your config values here.
	firebase.initializeApp({
	
	});

} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack);
	}
}

const fire = firebase

export default fire
