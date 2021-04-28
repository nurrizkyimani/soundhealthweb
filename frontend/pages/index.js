import Head from 'next/head';

import { useState } from 'react';

import { MdKeyboardVoice } from 'react-icons/md';

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
	Radio, RadioGroup,
	Stack,
	Select,
	Checkbox,
	Center
} from '@chakra-ui/react';


export default function Home() {
	const [ isAudioOn, setIsAudioOn ] = useState(false);

	const [ isUpload, setIsUpload ] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	
	 const [value, setValue] = useState("1")

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>SoundHealth</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
				
				<h1 hidden="true" className="text-6xl font-bold max-w-xl text-justify">Welcome to SoundHealth!</h1>

				<h1 hidden="true" className="text-6xl font-bold max-w-xl text-justify">SoundHealth is a deep learning project based  that detects cough sound!</h1>

				<h1 className="text-6xl font-bold max-w-xl text-justify">
					{isUpload ? (
						'Your data is now saved! You can Record it again '
					) : (
						'Once you are ready, press and hold the button below until you’re done.'
					)}
				</h1>
				<div className="flex flex-wrap items-center justify-around max-w-xl mt-6 sm:w-full">
					<div
						onClick={() => setIsAudioOn(!isAudioOn)}
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
						onOpen()
					}}
				>
					<h1 className="text-2xl font-bold max-w-xl text-justify"> { isUpload ? "Kirim" : "Rekam"}</h1>
				</div>

				

				<Modal size="lg" isOpen={isOpen}
					onClose={() => {
						setIsUpload(!isUpload)
						onClose()
				}}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>

							 <FormLabel>Umur </FormLabel>
								<Input size="lg" placeholder=" " />

							<FormLabel className="pt-4" >Gender</FormLabel>

							<Select size="lg" placeholder="Pilih Salah Satu">
								<option value="option1">Laki-Laki</option>
								<option value="option2">Perempuan</option>
								<option value="option3">Prefer Not to Say </option>
							</Select>
							
							
							<FormLabel className="pt-4" >Symptom</FormLabel>
							<Stack direction="column">
								  <Checkbox size="lg" colorScheme="orange" >
									Batuk 
									</Checkbox>
								 <Checkbox size="lg" colorScheme="orange" >
									Batuk Kering
									</Checkbox>
								 <Checkbox size="lg" colorScheme="orange" >
									Batuk Berdahak 
									</Checkbox>
								 <Checkbox size="lg" colorScheme="orange" >
										Batuk 
									</Checkbox>
							</Stack>

							<FormLabel className="pt-4" >Suspek Corona</FormLabel>

							<RadioGroup onChange={setValue} value={value}>
								<Stack direction="column">
									<Radio size="lg" value="1">Ya </Radio>
									<Radio size="lg" value="2">Tidak</Radio>
									<Radio size="lg" value="3">Prefer Not to Say</Radio>
								</Stack>
							</RadioGroup>

							<FormLabel className="pt-4">Kondisi Anda Sekarang</FormLabel>
								<Input size="lg"  placeholder="Sehat, Panas" />
						</ModalBody>

						<ModalFooter>
							<div  className="flex w-full justify-center">
							

								<div
										className={`px-10 py-4 text-left border rounded-full `}
									onClick={() => {
										onClose()
										setIsUpload(!isUpload)
									}}
									>
										<h1 className="text-2xl font-bold max-w-xl text-justify">Kirim</h1>
									</div>
						</div>
						</ModalFooter>
					</ModalContent>
				</Modal>
				
			</main>
		</div>
	);
}
