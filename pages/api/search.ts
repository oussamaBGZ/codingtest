// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const axios = require("axios")

type Data = {
  data: unknown
}| {error_message:string}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response=await axios(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.minDate}&end_date=${req.query.maxDate}&api_key=DEMO_KEY`)
    res.status(200).json(response.data)
  } catch(e:any){
    res.status(e.response.data.code).json({ error_message: e.response.data.error_message })
  }
}
