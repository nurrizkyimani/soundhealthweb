import Head from 'next/head';

import { useState, useEffect } from 'react';

import { MdKeyboardVoice } from 'react-icons/md';

import { useReactMediaRecorder } from 'react-media-recorder';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Input,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Select,
	Checkbox,
	Center
} from '@chakra-ui/react';

import fire from '../config/fire-config';
import 'firebase/firestore';
import 'firebase/storage';

import { useForm } from 'react-hook-form';

export default function Home() {
	const [ isAudioOn, setIsAudioOn ] = useState(false);

	const [ isUpload, setIsUpload ] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm();

	const [ audioUrl, setAudioUrl ] = useState('');

	const [ userData, setUserData ] = useState(null);

	// let recorder;

	useEffect(() => {
		function mediaRec() {
			if ('MediaRecorder' in window) {
				// everything is good, let's go ahead
				navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
					let recorder = new MediaRecorder(stream);
				});
			} else {
				console.log("Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work.");
			}
		}
		mediaRec();
	}, []);

	const onSubmit = async (data) => {
		const condition = data.condition.split(',');
		console.log({ ...data, condition });

		const newdata = {
			age: data.age,
			gender: data.gender,
			symptoms: data.symptoms,
			condition: data.condition.split(','),
			isCovid: data.suspek,
			url: audioUrl
		};

		console.log(newdata);

		fire.firestore().collection('coughdataset').add(newdata).then(() => {
			setUserData(newdata);
			onClose();
		});
	};

	const options = [ { label: 'Ya', id: '1' }, { label: 'Tidak', id: '2' } ];
	const genderOptions = [
		{ label: 'Laki-laki', id: '1' },
		{ label: 'Perempuan', id: '2' },
		{ label: 'Prefer not to Say', id: '3' }
	];

	const symptomOptions = [
		{ id: 1, label: 'batuk' },
		{ id: 2, label: 'batuk berdahak' },
		{ id: 3, label: 'batuk kering' }
	];

	const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

	useEffect(
		() => {
			const setblob = async (url) => {
				const soundRef = fire.storage().ref();
				let metadata = {
					contentType: 'audio/wav'
				};
				const blob = await fetch(mediaBlobUrl).then((r) => r.blob());

				const storageRef = fire.storage().ref();

				const uuid = mediaBlobUrl.substring(mediaBlobUrl.lastIndexOf('/') + 1);

				const soundref = storageRef.child(`sound/soundhealth-${uuid}.wav`);

				soundref.put(blob, metadata).then((res) => {
					console.log(res);

					soundref.getDownloadURL().then((burl) => {
						setAudioUrl(burl);
							setUserData({...userData, url : burl})
					});
				
			
				
				if (userData != null) {
					fire.firestore().collection('coughdataset').add(userData).then(() => {
						console.log('another sound withuot submit the voice');
						console.log(userData);
				});
			}
				});
			};

			if (mediaBlobUrl != null) {
				setblob(mediaBlobUrl);
			}
		},
		[ mediaBlobUrl ]
	);

	const handleAudioOnOff = () => {
		//if the user not yet click
		if (isAudioOn == false) {
			//set the blue audio
			setIsAudioOn(!isAudioOn);

			//start recording
			startRecording();
		} else if (isAudioOn == true) {
			//turn off the buttonn
			setIsAudioOn(!isAudioOn);
			//stop recording
			stopRecording();

			//modal is open; for user isi infonya

			console.log(userData);

			if (userData == null) {
				onOpen();
			}

			//send the recording to the blob in firebase
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>SoundHealth</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
				<h1 hidden={true} className="text-6xl font-bold max-w-xl text-justify">
					Welcome to SoundHealth!
				</h1>

				<h1 hidden={true} className="text-6xl font-bold max-w-xl text-justify">
					SoundHealth is a deep learning project based that detects cough sound!
				</h1>

				<h1 className="text-6xl font-bold max-w-xl text-justify">
					{isUpload ? (
						'Your data is now saved! You can Record it again '
					) : (
						'Once you are ready, press and hold the button below until you’re done.'
					)}
				</h1>

				<div>
					<p>{status}</p>
					<button onClick={startRecording}>Start Recording</button>
					<button onClick={stopRecording}>Stop Recording</button>
					<audio src={mediaBlobUrl} controls autoPlay />
				</div>

				<div className="flex flex-wrap items-center justify-around max-w-xl mt-6 sm:w-full">
					<div
						onClick={() => handleAudioOnOff()}
						className={`p-10 text-left border  hover:text-blue-600 focus:text-blue-600 rounded-full  ${isAudioOn
							? 'bg-blue-600'
							: null}`}
					>
						<MdKeyboardVoice size={'3em'} color={` ${isAudioOn ? 'white' : 'blue'}`} />
					</div>
				</div>

				<div
					className={`px-10 py-4 text-left border rounded-full mt-10`}
					onClick={() => {
						onOpen();
					}}
				>
					<h1 className="text-2xl font-bold max-w-xl text-justify"> {isUpload ? 'Kirim' : 'Rekam'}</h1>
				</div>

				<Modal
					size="lg"
					isOpen={isOpen}
					onClose={() => {
						onClose();
					}}
				>
					<ModalOverlay />

					<ModalContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader>Informasi Subjek </ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<FormLabel>Umur </FormLabel>
								<Input size="lg" placeholder="test" {...register('age')} />

								<FormLabel className="pt-4">Gender</FormLabel>
								<RadioGroup>
									<Stack direction="column">
										{genderOptions.map((opt) => (
											<Radio {...register('gender')} size="lg" value={opt.id}>
												{opt.label}
											</Radio>
										))}
									</Stack>
								</RadioGroup>

								<FormLabel className="pt-4">Symptom</FormLabel>
								<Stack direction="column">
									{symptomOptions.map((symp) => (
										<Checkbox
											size="lg"
											colorScheme="orange"
											key={symp.id}
											value={symp.label}
											{...register('symptoms')}
										>
											{symp.label}
										</Checkbox>
									))}
								</Stack>

								<FormLabel className="pt-4">Suspek Corona</FormLabel>
								<RadioGroup>
									<Stack direction="column">
										{options.map((opt) => (
											<Radio key={opt.id} {...register('suspek')} size="lg" value={opt.id}>
												{opt.label}
											</Radio>
										))}
									</Stack>
								</RadioGroup>

								<FormLabel className="pt-4">Kondisi Anda Sekarang</FormLabel>
								<Input size="lg" placeholder="Sehat, Panas" {...register('condition')} />
							</ModalBody>

							<ModalFooter>
								<div className="flex w-full justify-center">
									<input type="submit" className={`px-10 py-4 text-left border rounded-full `} />
								</div>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</main>
		</div>
	);
}
