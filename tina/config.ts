import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src",
        match: {
            include: '*',
        },
        format: 'md',
        templates: [
          {
            name: "index",
            label: "Home Page",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "blocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "latestActionText",
                label: "Latest Action: Text",
                ui: {
                  component: "textarea"
                },
              },
              {
                type: "string",
                name: "latestActionVideo",
                label: "Latest Action: Video",
              },
            ],
          },
          {
            name: "rightsrecorder",
            label: "Rights Recorder App",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title",
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                },
              },
              {
                type: "object",
                name: "iconBlocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Block Title",
                },
                {
                  type: "string",
                  name: "text",
                  label: "Block Text",
                  ui: {
                    component: "textarea"
                  },
                },
                {
                  type: "image",
                  name: "image",
                  label: "Block Image",
                },
                {
                  type: "string",
                  name: "button",
                  label: "Include Button?",
                  options: [
                    {
                      value: "yes",
                      label: "Yes"
                    },
                    {
                      value: "no",
                      label: "No"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
              ],
              }
            ]
          },
          {
            name: "advocateportal",
            label: "Advocate Portal",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "iconBlocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Block Title",
                },
                {
                  type: "string",
                  name: "text",
                  label: "Block Text",
                  ui: {
                    component: "textarea"
                  },
                },
                {
                  type: "image",
                  name: "image",
                  label: "Block Image",
                },
                {
                  type: "string",
                  name: "button",
                  label: "Include Button?",
                  options: [
                    {
                      value: "yes",
                      label: "Yes"
                    },
                    {
                      value: "no",
                      label: "No"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
              ],
              },
              {
                type: "string",
                name: "yellowBannerTitle",
                label: "Yellow Banner Title"
              },
              {
                type: "string",
                name: "yellowBannerText",
                label: "Yellow Banner Text",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            name: "datapage",
            label: "Data Page",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "blocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "orangeBannerTitle",
                label: "Orange Banner Title"
              },
              {
                type: "string",
                name: "orangeBannerText",
                label: "Orange Banner Text",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            name: "voucherholders",
            label: "For Voucher Holders",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "blocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              },
              {
                type: "image",
                name: "keyImage1",
                label: "Key Image 1"
              },
              {
                type: "image",
                name: "keyImage2",
                label: "Key Image 2"
              },
              {
                type: "image",
                name: "keyImage3",
                label: "Key Image 3"
              },
              {
                type: "image",
                name: "keyImage4",
                label: "Key Image 4"
              },
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "quoteAuthor",
                label: "Quote Author",
              },
              {
                type: "string",
                name: "authorTitle",
                label: "Author Title",
              },
              {
                type: "object",
                name: "linksList",
                label: "Resource Links",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Block Title",
                },
                {
                  type: "string",
                  name: "text",
                  label: "Block Text",
                  ui: {
                    component: "textarea"
                  },
                },
                {
                  type: "image",
                  name: "image",
                  label: "Block Image",
                },
                {
                  type: "string",
                  name: "button",
                  label: "Include Button?",
                  options: [
                    {
                      value: "yes",
                      label: "Yes"
                    },
                    {
                      value: "no",
                      label: "No"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
              ],
              },

            ]
          },
          {
            name: "communityorganizers",
            label: "Community Organizers",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerSubtitle",
                label: "Banner Subtitle"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "blocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "orangeBannerTitle",
                label: "Orange Banner Title"
              }
            ]
          },
          {
            name: "housingspecialists",
            label: "Housing Specialists",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerSubtitle",
                label: "Banner Subtitle"
              },
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "quoteAuthor",
                label: "Quote Author",
              },
              {
                type: "string",
                name: "quoteTitle",
                label: "Author Title",
              },
              {
                type: "object",
                name: "linksList",
                label: "Ways We Support",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              }
            ]
          },
          {
            name: "funding",
            label: "Funding Partners",
            fields: [
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "blocksList",
                label: "Page Blocks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.title };
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Block Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Block Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Block Image"
                  },
                  {
                    type: "string",
                    name: "button",
                    label: "Include Button?",
                    options: [
                      {
                        value: "yes",
                        label: "Yes"
                      },
                      {
                        value: "no",
                        label: "No"
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "buttonList",
                    label: "Buttons",
                    list: true,
                    itemProps: (item) => {
                      // Field values are accessed by item?.<Field name>
                      return { label: item?.buttonText };
                    },
                    defaultItem: {
                      buttonText: "Learn more",
                    },
                    fields: [
                      {
                        type: "string",
                        name: "buttonText",
                        label: "Button Text",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "orangeBannerTitle",
                label: "Orange Banner Title"
              }
            ]
          }
        ]
      },
    ],
  },
});
