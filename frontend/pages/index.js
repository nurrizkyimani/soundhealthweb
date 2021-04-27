import Head from 'next/head'

import { useState } from 'react';

import { MdKeyboardVoice } from 'react-icons/md';
export default function Home() {

  const [isAudioOn, setIsAudioOn] = useState(false);

  const [isUpload, setIsUpload] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>SoundHealth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold max-w-xl text-justify">
          {isUpload ? "Your data is now saved! You can Record it again " : "Once you are ready, press and hold the button below until you’re done."}
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-xl mt-6 sm:w-full">
          <div
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`p-10 text-left border  hover:text-blue-600 focus:text-blue-600 rounded-full  ${isAudioOn ? "bg-blue-600" : null}`}
          >
            <MdKeyboardVoice size={"3em"} color={` ${isAudioOn? "white": "blue" }`}  />
          </div>
        </div>

        <div
          className={`px-10 py-4 text-left border rounded-full mt-10`}
          onClick={() => setIsUpload(!isUpload)}
        >
          <h1 className="text-2xl font-bold max-w-xl text-justify">
          Kirim
        </h1>
        </div>
      </main>

    </div>
  )
}
