export default {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
            source: "name",
            maxLength: 96
        }
      },
      {
        name: "image",
        title: "Author image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "bio",
        title: "Bio",
        type: "string"
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image'
      }
    }
  };
  