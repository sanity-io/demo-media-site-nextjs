import cn from 'classnames'
import Link from 'next/link'

import Container from './Container'

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b', {
        'border-accent-7 bg-accent-7 text-white': preview,
        'border-accent-2 bg-accent-1': !preview,
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
  )
}
