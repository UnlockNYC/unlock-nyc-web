import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

// server code
/*const getStaticProps = () => {
  const post = await client.queries.post({ relativePath: 'HelloWorld.md' })
  return { data: { post: post } }
}*/

export default defineConfig({
  branch,
  clientId: "a67abc2a-ec7a-438a-8d1b-9944b190abfd",// Get this from tina.io
  token: process.env.TINA_TOKEN, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "build",
  },
  media: {
    /*tina: {
      mediaRoot: "media",
      publicFolder: "build",
      },*/
    loadCustomStore: async() => {
      const pack = await import('next-tinacms-dos')
      return pack.TinaCloudDOSMediaStore
    }
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
        ui: {
          allowedActions: {
            delete: false,
          }
        },
        templates: [
          {
            name: "index",
            label: "Home Page",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
                      }
                    ]
                  },
                ],
              },
              {
                type: "object",
                name: "homeSlider",
                label: "What People Are Saying",
                list: true,
                itemProps: (slide) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: slide?.quoteText || slide?.audioLabel };
                },
                fields: [
                  {
                    type: "string",
                    name: "slideType",
                    label: "Slide Type",
                    options: [
                      {
                        value: "quote",
                        label: "Quote"
                      },
                      {
                        value: "audio",
                        label: "Audio"
                      }
                    ]
                  },
                  {
                    type: "string",
                    name: "quoteText",
                    label: "Quote Text",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Quote Author"
                  },
                  {
                    type: "string",
                    name: "audioLabel",
                    label: "Audio Label"
                  },
                  {
                    type: "image",
                    name: "audioFile",
                    label: "Audio File"
                  },
                ],
              },
              {
                type: "string",
                name: "latestBanner",
                label: "Latest Update: Banner",
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
                type: "image",
                name: "latestActionImage",
                label: "Latest Action: Image",
              },
              {
                type: "string",
                name: "latestAlt",
                label: "Latest Action Image Alt Text (accessibility!)",
              },
              {
                type: "string",
                name: "latestActionVideo",
                label: "Latest Action: Video Link (leave blank if image!)",
              },
              {
                type: "string",
                name: "latestActionButton",
                label: "Latest Action: Include Button?",
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
                name: "latestActionLink",
                label: "Latest Action: Button Link",
              },
            ],
          },
          {
            name: "about",
            label: "About Page",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "image",
                name: "aboutImage",
                label: "Top Image"
              },
              {
                type: "string",
                name: "alt",
                label: "Top Image Alt Text (accessibility!)"
              },
              {
                type: "object",
                name: "thanksList",
                label: "Special Thanks",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.name };
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Org Name",
                    isTitle: true,
                    required: true
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Org Logo",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Org URL",
                  },
                ]
              },
            ]
          },
          {
            name: "rightsrecorder",
            label: "Rights Recorder App",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                type: "rich-text",
                name: "introText",
                label: "Intro Paragraph",
                parser: {
                  type: 'markdown',
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
              },
              {
                type: "string",
                name: "yellowBannerLink",
                label: "Yellow Banner Link",
              },
            ]
          },
          {
            name: "advocateportal",
            label: "Advocate Portal",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                type: "string",
                name: "scheduleLink",
                label: "Schedule Now Link"
              },
              {
                type: "string",
                name: "demoLink",
                label: "Demo Link"
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
              },
              {
                type: "string",
                name: "yellowBannerLink",
                label: "Yellow Banner Link",
              },
            ]
          },
          {
            name: "datapage",
            label: "Data Page",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
              },
              {
                type: "string",
                name: "orangeBannerButton",
                label: "Orange Banner Button Text"
              },
              {
                type: "string",
                name: "orangeBannerLink",
                label: "Orange Banner Button Link"
              }
            ]
          },
          {
            name: "voucherholders",
            label: "For Voucher Holders",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "keysHeadline",
                label: "Keys Headline"
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
                type: "image",
                name: "authorImg",
                label: "Author Image",
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
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
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
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                type: "string",
                name: "bannerLink",
                label: "Read More Link"
              },
              {
                type: "image",
                name: "topImage",
                label: "Top Image"
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
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
                name: "orangeBannerButton",
                label: "Orange Banner Button Text"
              },
              {
                type: "string",
                name: "orangeBannerLink",
                label: "Orange Banner Button Link"
              }
            ]
          },
          {
            name: "housingspecialists",
            label: "Housing Specialists",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                type: "image",
                name: "topImage",
                label: "Top Image"
              },
              {
                type: "string",
                name: "demoLink",
                label: "Demo Link"
              },
              {
                type: "string",
                name: "signUpLink",
                label: "Sign Up Link"
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
                type: "image",
                name: "quoteImg",
                label: "Quote Logo",
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
                    type: "rich-text",
                    name: "content",
                    label: "Block Text",
                    parser: {
                      type: 'markdown',
                    },
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
                      }
                    ]
                  },
                ],
              },
              {
                type: "object",
                name: "partnersList",
                label: "Featured Partners",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.name };
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Partner Name",
                    isTitle: true,
                    required: true
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Partner Logo",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Partner URL",
                  },
                ]
              }
            ]
          },
          {
            name: "funding",
            label: "Funding Partners",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
                      }
                    ]
                  },
                ],
              },
              {
                type: "string",
                name: "statsTitle",
                label: "Stats Title"
              },
              {
                type: "rich-text",
                parser: {
                  type: 'markdown',
                },
                name: "statsText",
                label: "Text Under Stats"
              },
              {
                type: "object",
                name: "fundersList",
                label: "Current Funders",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.name };
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Funder Name",
                    isTitle: true,
                    required: true
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Funder Logo",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Funder URL",
                  },
                ]
              },
              {
                type: "string",
                name: "orangeBannerTitle",
                label: "Orange Banner Title"
              },
              {
                type: "object",
                name: "annualReports",
                label: "Annual Reports",
                list: true,
                itemProps: (item) => {
                  // Field values are accessed by item?.<Field name>
                  return { label: item?.year };
                },
                fields: [
                  {
                    type: "string",
                    name: "year",
                    label: "Year"
                  },
                  {
                    type: "image",
                    name: "pdf",
                    label: "Report PDF"
                  },
                ],
              },
            ]
          },
          {
            name: "policy",
            label: "Policies",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "effective",
                label: "Effective Date"
              },
              {
                type: "string",
                name: "revised",
                label: "Last Revised Date"
              },
              {
                type: "rich-text",
                parser: {
                  type: 'markdown',
                },
                name: "body",
                label: "Policy Text",
                isBody: true
              }
            ]
          },
          {
            name: "press",
            label: "Press Page",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui:{
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "kit1",
                label: "Press Kit 1",
              },
              {
                type: "image",
                name: "kit1PDF",
                label: "Press Kit 1 Upload",
              },
              {
                type: "string",
                name: "kit2",
                label: "Press Kit 2"
              },
              {
                type: "string",
                name: "kit2Text",
                label: "Press Kit 2: Details"
              },
              {
                type: "image",
                name: "kit2Link",
                label: "Press Kit 2 Upload",
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
                ui:{
                  component: "textarea"
                }
              },
            ]
          },
          {
            name: "involved",
            label: "Get Involved",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "bannerTitle",
                label: "Banner Title"
              },
              {
                type: "string",
                name: "bannerText",
                label: "Banner Text",
                ui:{
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
                    name: "alt",
                    label: "Image Alt Text (accessibility!)"
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
                      },
                      {
                        type: "string",
                        name: "buttonLink",
                        label: "Button Link",
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
                ui:{
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "orangeBannerLink",
                label: "Orange Banner Link"
              },
            ]
          },
        ]
      },
      {
        name: "bio",
        label: "Bios",
        path: "src/bios",
        format: 'md',
        ui: {},
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Title"
          },
          {
            type: "string",
            name: "tags",
            label: "Category",
            list: true,
            options: [
              {
                value: "Staff",
                label: "Staff"
              }, {
                value: "Team",
                label: "Team"
              },
              {
                value: "LC",
                label: "LC"
              },
              {
                value: "Advisors",
                label: "Advsiors"
              }
            ]
          },
          {
            type: "image",
            name: "image",
            label: "Headshot"
          },
          {
            type: "number",
            name: "order",
            label: "Order"
          }
        ]
      },
      {
        name: "faq",
        label: "FAQs",
        path: "src/faqs",
        format: 'md',
        ui: {},
        fields: [
          {
            type: "string",
            name: "question",
            label: "Question",
            isTitle: true,
            required: true
          },
          {
            type: "rich-text",
            name: "answer",
            label: "Answer"
          },
          {
            type: "string",
            name: "tags",
            label: "Page",
            list: true,
            options: [
              {
                value: "FAQ Rights Recorder",
                label: "Rights Recorder"
              }, {
                value: "FAQ Advocate Portal",
                label: "Advocate Portal"
              },
              {
                value: "FAQ Data",
                label: "Data"
              },
              {
                value: "FAQ Press",
                label: "Press Page"
              },
            ]
          },
          {
            type: "number",
            name: "order",
            label: "Order"
          },
        ]
      },
      {
        name: "article",
        label: "Articles",
        path: "src/articles",
        format: 'md',
        ui: {},
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt"
          },
          {
            type: "image",
            name: "image",
            label: "Image"
          },
          {
            type: "string",
            name: "tags",
            label: "Collection",
            list: true,
            options: [
              {
                value: "Rights Recorder",
                label: "Rights Recorder"
              }, {
                value: "Advocate Portal",
                label: "Advocate Portal"
              }
            ]
          },
          {
            type: "string",
            name: "keywords",
            label: "Keywords",
            list: true
          },
          {
            type: "rich-text",
            parser: {
              type: 'markdown',
            },
            name: "body",
            label: "Article Body",
            isBody: true
          }
        ]
      },
      {
        name: "report",
        label: "Data Reports",
        path: "src/reports",
        format: 'md',
        fields: [
          {
            type: "string",
            name: "reportTitle",
            label: "Report Title",
            isTitle: true,
            required: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured"
          },
          {
            type: "string",
            name: "year",
            label: "Year"
          },
          {
            type: "string",
            name: "reportSummaryTop",
            label: "Report Description",
          },
          {
            type: "string",
            name: "reportSummary",
            label: "Report Summary",
          },
          {
            type: "string",
            name: "keywords",
            label: "Keywords",
            list: true
          },
          {
            type: "image",
            name: "reportPDF",
            label: "Report PDF"
          }

        ]
      },
      {
        name: "press",
        label: "Press Stories",
        path: "src/press-stories",
        format: 'md',
        ui: {},
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "pubdate",
            label: "Story Date (MM.DD.YYYY - important!)"
          },
          {
            type: "image",
            name: "image",
            label: "Logo"
          },
          {
            type: "string",
            name: "link",
            label: "Story Link"
          },
          {
            type: "string",
            name: "tags",
            label: "Collection",
            list: true,
            options: [
              {
                value: "An Illusion of Choice",
                label: "An Illusion of Choice"
              }, {
                value: "Serial Discriminators",
                label: "Serial Discriminators"
              }
            ]
          },
        ]
      },
      {
        name: "release",
        label: "Press Releases",
        path: "src/press-releases",
        format: 'md',
        ui: {},
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt"
          },
          {
            type: "string",
            name: "keywords",
            label: "Keywords",
            list: true
          },
          {
            type: "string",
            name: "year",
            label: "Year"
          },
          {
            type: "image",
            name: "pdf",
            label: "Press Release PDF"
          }
        ]
      },
    ],
  },
});
