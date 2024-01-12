import Image from 'next/image'
import { useEffect, useState } from 'react'

import getTrackItem from '~/lib/SpotifyAPI'

import SpotifyLogo from './SpotifyLogo'
// import SpotifyLogo from "./SpotifyLogo";
// import SpotifyPlayingAnimation from "./SpotifyPlayingAnimation";

interface NowPlayingResult {
  isPlaying: boolean
  title: string
  albumImageUrl: string
  songUrl: string
  artist: string
}

const SpotifyNowPlaying = () => {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<NowPlayingResult>()
  useEffect(() => {
    Promise.all([getTrackItem()]).then((results) => {
      if (results[0]) {
        setResult(results[0] as NowPlayingResult)
      }
      setLoading(false)
    })
  }, [result])
  if (result) {
    return (
      <div>
        {loading && (
          <div>
            <div className="bg-primary p-8 rounded-lg shadow-md w-80">
              <h3 className="text-lg mb-6 text-black text-center font-bold">
                Loading...
              </h3>
              {/* Album Cover */}
              {/* <Image
                src={result.albumImageUrl}
                alt={`${result.title} album art`}
                width={256}
                height={256}
                className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
              /> */}
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-accent text-center">
                <a href={'#'} target="_blank">
                  Song Title
                </a>
              </h2>
              {/* Artist Name */}
              <p className="text-black text-sm text-center">by Artist</p>
              <div className="flex justify-center mt-6">
                <SpotifyLogo />
              </div>
            </div>
          </div>
        )}
        {result.isPlaying ? (
          <div>
            <div className="bg-primary p-8 rounded-lg shadow-md w-80">
              <h3 className="text-lg mb-6 text-black text-center font-bold">
                I&apos;m currently hearing this:
              </h3>
              {/* Album Cover */}
              <Image
                src={result.albumImageUrl}
                alt={`${result.title} album art`}
                width={256}
                height={256}
                className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
              />
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-accent text-center">
                <a href={result.songUrl} target="_blank">
                  {result.title}
                </a>
              </h2>
              {/* Artist Name */}
              <p className="text-black mt-4 text-sm text-center">
                by {result.artist}
              </p>
              <div className="flex flex-col gap-4 items-center mt-4">
                <SpotifyLogo />
                <a
                  href="#"
                  className="text-center underline text-black text-xs "
                >
                  See how this works
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-primary p-8 rounded-lg shadow-md w-80">
              <h3 className="text-lg mb-6 text-black text-center font-bold">
                One of my recent favorite tracks:
              </h3>
              {/* Album Cover */}
              <Image
                src={result.albumImageUrl}
                alt={`${result.title} album art`}
                width={256}
                height={256}
                className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
              />
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-accent text-center">
                <a href={result.songUrl} target="_blank">
                  {result.title}
                </a>
              </h2>
              {/* Artist Name */}
              <p className="text-black mt-4 text-sm text-center">
                {result.artist}
              </p>
              <div className="flex flex-col gap-4 items-center mt-4">
                <SpotifyLogo />
                <a
                  href="#"
                  className="text-center underline text-black text-xs "
                >
                  See how this works
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SpotifyNowPlaying
