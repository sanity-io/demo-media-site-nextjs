import { defineArrayMember, defineField, definePlugin, DocumentDefinition, FieldDefinition, SchemaTypeDefinition } from "sanity";

// enables autocompletion and validation of document options
declare module 'sanity' {
    export interface DocumentOptions {
        enableVariations?: string[]
    }
}

/**
 * Check if we are looking at a document schema type (and not an object or primitive)
 */
const isDocument = (def: SchemaTypeDefinition): def is DocumentDefinition => def.type === 'document'

/**
 * Return a list of allowed variable fields.
 */
function filterVariableFields(fields: FieldDefinition[], variableFieldNames: string[]) {
    return fields.filter(field => variableFieldNames.includes(field.name))
}

/**
 * Given a document schema, add the variations field.
 */
function augmentSchema(type: DocumentDefinition): DocumentDefinition {
    const variableFieldNames = type.options.enableVariations

    return {
        ...type,
        fields: [
            ...type.fields,
            defineField({
                type: 'array' as const,
                name: 'variations',
                of: [
                    defineArrayMember({
                        type: 'object',
                        name: 'variation',
                        fields: [
                            defineField({
                                type: 'string' as const,
                                name: 'variationId',
                                title: 'Variation ID',
                                validation: (rule) => rule.required()
                            }),
                            ...filterVariableFields(type.fields, variableFieldNames)
                        ],
                        preview: {
                            select: {
                                title: variableFieldNames[0],
                                subtitle: 'variationId'
                            }
                        }
                    })
                ]
            })
        ]
    }
}

/**
 * Given all the types registered in the schema, add the variation field to those that are opted in
 * TODO: also define and hoist the variation object shape for each enabled type, to support GraphQL
 * TODO: consider making the variation opt-in and configuration at the plugin configuration object instead of the schema type's options object
 */
function buildTypes(types: SchemaTypeDefinition[]) {
    return types.map((def) => {
        if (isDocument(def) && def.options?.enableVariations) {
            return augmentSchema(def)
        }
        return def
    })
}

/**
 * Sanity Studio plugin to add a variations field to document types where variations are enabled
 */
export default definePlugin(() => {
    return {
        schema: {
            types: buildTypes
        }
    }
})