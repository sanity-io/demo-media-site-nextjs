import Image from 'next/image'
import Link from 'next/link'
import React, {createContext, useContext} from 'react'

import {urlForImage} from '../lib/sanity'
import {Article} from '../types'
import {BRAND_LIFESTYLE_NAME} from '../utils/brand'
import {getUrlForDocumentType} from '../utils/routing'
import Date from './Date'

const PeopleContext = createContext<Article['people']>([])

export function PeopleProvider({
  people,
  children,
}: {
  people: Article['people']
  children: React.ReactNode
}) {
  return (
    <PeopleContext.Provider value={people}>{children}</PeopleContext.Provider>
  )
}

// Create a hook that uses the PeopleContext and filters the list of people based on their role
export function usePeople(role: string) {
  try {
    const people = useContext<Article['people']>(PeopleContext)
    return people?.filter((person) => person.role === role)
  } catch (e) {
    return []
  }
}

export function Credits({
  role = 'author',
  brandName,
  date,
}: {
  role?: 'author' | 'photographer' | 'contributor' | 'copyEditor'
  date?: string
  brandName?: string
}) {
  const people = usePeople(role)
  const isLifestyle = brandName === BRAND_LIFESTYLE_NAME
  if (isLifestyle && people) {
    const [firstPerson] = people

    return (
      <div className="sm:text-md mx-auto flex max-w-2xl justify-center pb-3 text-sm md:mb-4 md:pb-4 md:pb-5">
        <div className="flex items-center gap-2">
          {firstPerson?.image && (
            <div className="h-6 w-6 overflow-hidden rounded-full bg-purple-500">
              <Image
                className="block rounded-full"
                alt={firstPerson.name}
                src={urlForImage(firstPerson.image)
                  .height(100)
                  .width(100)
                  .url()}
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="">
            {date && (
              <>
                <Date dateString={date} />
                <br />
              </>
            )}
            {firstPerson && (
              <span className="font-serif">
                <span className="italic">by </span>
                <span className="uppercase">
                  <Link
                    href={getUrlForDocumentType(
                      'person',
                      firstPerson?.slug,
                      firstPerson?.brand
                    )}
                  >
                    {firstPerson.name}
                  </Link>
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 mb-4 max-w-2xl border-b border-gray-200 pb-3 text-sm dark:border-gray-900 sm:text-lg md:mt-auto md:pb-4 md:text-xl">
      {date && (
        <span
          data-after=" ● "
          className="after:inline after:content-[attr(data-after)]"
        >
          <Date dateString={date} />
        </span>
      )}
      <PeopleList people={people} />
    </div>
  )
}

export const PeopleList = ({people}: {people: Article['people']}) => {
  return (
    <>
      {people?.length &&
        people.map((person) => (
          <span
            key={person.name}
            data-after=" ● "
            className="after:inline after:content-[attr(data-after)] last:after:hidden"
          >
            <Link href={getUrlForDocumentType('person', person?.slug)}>
              {person.name}
            </Link>
          </span>
        ))}
    </>
  )
}
