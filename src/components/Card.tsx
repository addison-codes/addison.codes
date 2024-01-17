import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="max-w-sm rounded-lg shadow bg-primary">
      <a href={`/post/${post.slug.current}`}>
        {post.mainImage && (
          <Image
            className="rounded-t-md"
            src={urlForImage(post.mainImage).width(500).height(300).url()}
            height={300}
            width={500}
            alt=""
          />
        )}
      </a>
      <div className="p-5">
        <a
          className="text-gray-700 dark:text-gray-400"
          href={`/post/${post.slug.current}`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400">
            {post.title}
          </h5>
        </a>
        <p className="w-full mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.excerpt}
        </p>
        <p className="mb-6 ">{formatDate(post._createdAt)}</p>

        <a
          href={`/post/${post.slug.current}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-700 transition-colors duration-300 ease-in-out bg-blue-700 rounded-lg dark:bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-secondary hover:bg-white hover:text-black"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
