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
import { motion, Frame, useAnimation } from 'framer-motion';

function PermissionModal(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(
		() => {
			if (props.modalOpen == true) {
				onOpen();
			}

			console.log(props.modalOpen);
		},
		[ props.modalOpen == true ]
	);

	function handleSubmitModal(event) {
		event.preventDefault();
		onClose();

		props.setHiddenWelcome(true);
	}

	return (
		<Modal
			size="lg"
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={(event) => handleSubmitModal(event)}>
					<ModalHeader>Informasi Subjek </ModalHeader>
					<ModalCloseButton />
					<ModalBody>setuju atau enggak</ModalBody>

					<ModalFooter>
						<div className="flex w-full justify-center">
							<input type="submit" className={`px-10 py-4 text-left border rounded-full `} />
						</div>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default function Home() {
	const [ isAudioOn, setIsAudioOn ] = useState(false);
	const [ isUpload, setIsUpload ] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm();
	const [ audioUrl, setAudioUrl ] = useState('');
	const [userData, setUserData] = useState(null);
	
	const [hiddenWelcome, setHiddenWelcome] = useState(false);
	const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
	const [ onModalOpen, setonModalOpen ] = useState(false);

	const [onAboutSH, setOnAboutSH] = useState(false);


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


	useEffect(
		() => {
			//send the blob function,
			const setblob = async (url) => {
				let metadata = {
					contentType: 'audio/wav'
				};
				//fetch the blob from the browser local storage;
				const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
				//creating ref from storage ref
				const storageRef = fire.storage().ref();
				//get mediaurl uuid parse from the uri;
				const uuid = mediaBlobUrl.substring(mediaBlobUrl.lastIndexOf('/') + 1);
				//storage cloud reference
				const soundref = storageRef.child(`sound/soundhealth-${uuid}.wav`);

				//get the url then put it into the firebase;
				soundref.put(blob, metadata).then((res) => {
					soundref.getDownloadURL().then((burl) => {
						setAudioUrl(burl);
						setUserData({ ...userData, url: burl });
					});
				});
			};

			if (mediaBlobUrl != null) {
				setblob(mediaBlobUrl);
			}
		},
		//when the media url is exist;
		[ mediaBlobUrl ]
	);

	//function handling Audio On and Off; 
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

			console.log(userData);

			if (userData == null) {
				onOpen();
			} else if (userData != null) {
				console.log('send user data without open the dialog; handleaudioonoff');
				fire.firestore().collection('coughdataset').add(userData).then((ress) => {
					console.log('another sound withuot submit the voice');
					console.log(ress);
				});
			}
		}
	};

	//On Submit 
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

		fire
			.firestore()
			.collection('coughdataset')
			.add(newdata)
			.then(() => {
				setUserData(newdata);
				onClose();
			})
			.then(() => {
				setIsUpload(true);
			});
	};

	

	let welcomeControl = useAnimation()
	let aboutControl = useAnimation()
	let onceControl = useAnimation()


	const sequence = () => {
		welcomeControl.start({
			scale: 1.5,
			transition: {
				duration: 1
			}
		})
			.then(() => {
				welcomeControl.start({ visibility: 'hidden' })
			})
			.then(() => {
				aboutControl.start({ visibility: 'visible', scale: 1.2 })
			})
			.then(() => {
				aboutControl.start({ visibility: 'hidden' })
			})
			.then(() => {
				onceControl.start({ visibility: 'visible' })
			})

	}

		useEffect(() => {
			
			sequence()
		}, [])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>SoundHealth</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
				<motion.div
					animate={welcomeControl}
				>
					<h1 hidden={hiddenWelcome} className="text-4xl font-bold max-w-xl text-justify">
						Welcome to SoundHealth!
					</h1>
				</motion.div>

				<motion.div
					animate={aboutControl}
					onAnimationComplete={() => setonModalOpen(!onModalOpen)}
				>
				
				<h1 hidden={onAboutSH} className="text-6xl font-bold max-w-xl text-justify">
					SoundHealth is a deep learning project based that detects cough sound!
				</h1>

				</motion.div>

				<PermissionModal modalOpen={onModalOpen} setHiddenWelcome={setHiddenWelcome} />

			

				<motion.div
					initial='hidden'
					animate={onceControl}
				>

					<h1 className="text-6xl font-bold max-w-xl text-justify">
					{isUpload ? (
						'Your data is now saved! You can Record it again '
					) : (
						'Once you are ready, press and hold the button below until you’re done.'
					)}
				</h1>

				</motion.div>
				

				<div>
					<p>{status}</p>

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
