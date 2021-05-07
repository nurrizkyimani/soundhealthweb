import firebase from 'firebase/app';


try {
	// Use your config values here.
	firebase.initializeApp({
		apiKey: `${process.env.apiKey}`,
		authDomain: `${process.env.authDomain}`,
		projectId: `${process.env.projectId}`,
		storageBucket: `${process.env.storageBucket}`,
		messagingSenderId: `${process.env.messagingSenderId}`,
		appId: `${process.env.appId}`,
		measurementId: `${process.env.measurementId}`
	});

} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack);
	}
}

const fire = firebase

export default fire
