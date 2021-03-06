import {default as axios} from 'axios'
import FormData from 'form-data'
import fs from 'fs'

import {APIHelper, Payload} from './interfaces'

export const apiConstructor = (baseIntakeUrl: string, apiKey: string, appKey: string): APIHelper => {
  const uploadDependencies = (payload: Payload) => {
    const form = new FormData()

    form.append('source', payload.source)
    form.append('file', fs.createReadStream(payload.dependenciesFilePath))
    form.append('service', payload.service)
    if (payload.version) {
      form.append('version', payload.version)
    }

    return axios.post(`${baseIntakeUrl}/profiling/api/v1/dep-graphs`, form, {
      headers: {
        'DD-API-KEY': apiKey,
        'DD-APPLICATION-KEY': appKey,
        ...form.getHeaders(),
      },
    })
  }

  return {
    uploadDependencies,
  }
}
