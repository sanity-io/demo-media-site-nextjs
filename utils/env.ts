/* eslint-disable no-process-env */

/*
 * Retrieve an environment variable
 */
export const env = (id: string): string | undefined => {
  return process.env[id]
}
