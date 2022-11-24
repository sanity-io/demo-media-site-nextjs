import { getCookie, setCookie } from 'cookies-next'

const cookieKey = 'content-experiments'

interface Document {
    _id: string,
}

interface DocumentWithVariations extends Document{
    variations: { variationId: string }[]
}

/**
 * Map of document IDs to the variation ID that we've shown to the user
 */
interface ActiveExperiments {
    [id: string]: string
}

/**
 * Given a document and a list of active experiments, return the document an updated list of active experiments
 */
export function pickVariation(doc: DocumentWithVariations, activeExperiments: ActiveExperiments): [Document, ActiveExperiments] {

    const {variations, ...fallback} = doc;
    let currentVariationId = activeExperiments[doc._id]
    const availableVariationIds = variations?.map(variation => variation.variationId) || []

    // ensure we only show a valid experiment
    if (!availableVariationIds.includes(currentVariationId)) {
        currentVariationId = undefined
    }

    // if we don't have a current experiment, set one
    if (!currentVariationId && variations.length) {
        currentVariationId = availableVariationIds[Math.floor(Math.random() * availableVariationIds.length)]
    }

    // if we have a valid variation id, merge the variation onto the document, and return the updated list of active experiments
    if (currentVariationId) {
        const {variationId, ...currentVariationValues} = variations.find(variation => currentVariationId === variation.variationId)
        const mergedDocument = {...fallback, ...currentVariationValues}
        const updatedActiveExperiments = {...activeExperiments, [doc._id]: currentVariationId}

        return [
            mergedDocument,
            updatedActiveExperiments
        ]
    }

    return [
        fallback,
        {
            ...activeExperiments,
            [doc._id]: undefined,
        }
    ]
}

/**
 * Use this on any list of documents to pick variations for the current user and set cookies
 * TODO: figure out Next.js req and res typings
 */
export function selectVariationsAndSetCookies({documents, req, res}: {documents: DocumentWithVariations[], req: any, res: any}) {
    let experiments = getCookie(cookieKey, {req, res}) || {}

    const finalDocuments = []
    documents.forEach(document => {
        const [pickedDoc, newExperiments] = pickVariation(document, experiments)
        experiments = newExperiments
        finalDocuments.push(pickedDoc)
    })

    setCookie(cookieKey, experiments, {req, res})

    return documents
}


