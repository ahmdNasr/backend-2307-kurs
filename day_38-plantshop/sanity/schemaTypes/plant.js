export default {
  name: 'plant',
  title: 'Plant',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: 'title',
      title: 'Titel der Pflanze',
      type: 'string',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'lightPreference',
      title: 'How bright should the spot for this plant be?',
      type: 'string',
      options: {
        list: ["bright", "halfshade", "shade"],
        layout: "radio"
      },
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
        name: 'similarPlants',
        title: "Similar plants",
        type: "reference",
        to: [{type: 'plant'}]
    },
    {
      name: 'available',
      type: 'boolean',
    },
  ],
}
