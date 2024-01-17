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
            <div className="p-8 rounded-lg shadow-md bg-primary w-80">
              <h3 className="mb-6 text-lg font-bold text-center text-black">
                Loading...
              </h3>
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-center text-accent">
                <a href={'#'} target="_blank">
                  Song Title
                </a>
              </h2>
              {/* Artist Name */}
              <p className="text-sm text-center text-black">by Artist</p>
              <div className="flex justify-center mt-6">
                <SpotifyLogo />
              </div>
            </div>
          </div>
        )}
        {result.isPlaying ? (
          <div>
            <div className="p-8 rounded-lg shadow-md bg-primary w-80">
              <h3 className="mb-6 text-lg font-bold text-center text-black">
                I&apos;m currently hearing this:
              </h3>
              {/* Album Cover */}
              <Image
                src={result.albumImageUrl}
                alt={`${result.title} album art`}
                width={256}
                height={256}
                className="w-64 h-64 mx-auto mb-4 rounded-lg shadow-lg shadow-teal-50"
              />
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-center text-accent">
                <a href={result.songUrl} target="_blank">
                  {result.title}
                </a>
              </h2>
              {/* Artist Name */}
              <p className="mt-4 text-sm text-center text-black">
                by {result.artist}
              </p>
              <div className="flex flex-col items-center gap-4 mt-4">
                <SpotifyLogo />
                <a
                  href="#"
                  className="text-xs text-center text-black underline "
                >
                  See how this works
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-8 rounded-lg shadow-md bg-primary w-80">
              <h3 className="mb-6 text-lg font-bold text-center text-black">
                One of my recent favorite tracks:
              </h3>
              {/* Album Cover */}
              <Image
                src={result.albumImageUrl}
                alt={`${result.title} album art`}
                width={256}
                height={256}
                className="w-64 h-64 mx-auto mb-4 rounded-lg shadow-lg shadow-teal-50"
              />
              {/* Song Title */}
              <h2 className="text-2xl font-bold text-center text-accent">
                <a href={result.songUrl} target="_blank">
                  {result.title}
                </a>
              </h2>
              {/* Artist Name */}
              <p className="mt-4 text-sm text-center text-black">
                {result.artist}
              </p>
              <div className="flex flex-col items-center gap-4 mt-4">
                <SpotifyLogo />
                <a
                  href="#"
                  className="text-xs text-center text-black underline "
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
