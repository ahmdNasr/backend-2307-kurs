import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECTID,
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2024-06-06', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  })

export async function getPlants() {
    const plants = await client.fetch('*[_type == "plant"]')
    return plants
}
  
  