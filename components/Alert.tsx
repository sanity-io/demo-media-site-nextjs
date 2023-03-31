import cn from 'classnames'
import Link from 'next/link'
import * as React from 'react'

import {isLifestyle} from '../utils/brand'
import Container from './Container'

const isLifestyleBrand = isLifestyle()

export default function Alert({preview}: {preview: boolean}) {
  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen items-end justify-end">
      <div
        className={cn(!isLifestyleBrand && 'border-b', {
          'border-accent-7 bg-accent-7 pointer-events-auto bg-black text-white':
            preview,
          'mx-auto mb-6 flex max-w-lg rounded-md bg-purple-300 px-3 py-1 text-white dark:text-white':
            isLifestyleBrand && preview,
          hidden: !preview,
        })}
      >
        <Container>
          <div className="py-2 text-center text-sm">
            {preview && (
              <>
                This page is a preview.{' '}
                <Link
                  href="/api/exit-preview"
                  className="hover:text-cyan underline transition-colors duration-200"
                >
                  Click here
                </Link>{' '}
                to exit preview mode.
              </>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}
