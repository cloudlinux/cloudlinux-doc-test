const urls = require("./urls-mapping.js");
const sidebarUrls = require("./sidebar-urls");
const _slugify = require('@vuepress/shared-utils/lib/slugify');

const slugifyLinks = (s) => {
  if (sidebarUrls[s]) {
    return sidebarUrls[s];
  }
  return _slugify(s);
};

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  base: "/",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
  ],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "CloudLinux Documentation",
    },
    "/ru/": {
      lang: "ru",
      title: "Документация",
      description: "Документация CloudLinux",
    }
  },
  theme: "cloudlinux",
  markdown: {
    slugify: slugifyLinks,
    toc: {
      slugify: slugifyLinks,
    }
  },

  themeConfig: {
    repo: "cloudlinux/cloudlinux-doc",
    editLinks: true,
    docsBranch: "dev",
    docsDir: "docs",
    translationSource: 'docs.cloudlinux.com',
    defaultURL: "/home/",
    redirectionMapping: urls,
    sidebarDepth: 2,
    logo: "/logo.svg",
    logoShort: "/logo-short.svg",

    social: [
      { url: "https://www.facebook.com/cloudlinux/", logo: "/fb.png" },
      { url: "https://twitter.com/cloudlinuxos/", logo: "/tw.png" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.png" },
      {
        url: "https://www.youtube.com/channel/UCZ3YMHWnMP7TaxlXVay5-aw",
        logo: "/ytube.png"
      }
    ],
    cloudlinuxSite: "https://cloudlinux.com",
    locales: {
      "/": {
        try_free: "https://cloudlinux.com/trial",
        layouts: {
          product: {
            siteTitle: "Cloudlinux OS"
          },
          documentation: {
            siteTitle: "Documentation",
            sidebar: [
              {
                title: "Content",
                collapsable: false,
                children: [
                  "/introduction/",
                  "/cloudlinux_installation/",
                  "/control_panel_integration/",
                  "/limits/",
                  "/command-line_tools/",
                  "/lve_manager/",
                  "/cloudlinux_os_components/",
                  "/cloudlinux_os_kernel/",
                  "/for_cloudlinux_partners/",
                  "/deprecated/"
                ]
              }
            ],
          },
          knowledgeBase: {
            siteTitle: "Knowledge base",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [
                "/kb/Billing/",
                "/kb/KernelCare/",
                "/kb/Imunify/",
                "/kb/FAQ/",
                "/kb/Technology/",
                "/kb/HowDoI/",
                "/kb/Troubleshooting/"
              ],
            }],
          },
          gettingStarted: {
            siteTitle: "Getting started",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [],
            }],
          },
          videoTutorials: {
            siteTitle: "Video tutorials",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [],
            }],
          }
        },
        navBar: {
          submitRequest: "Submit request",
          products: "Products",

          productsMenu: {
            product: 'Products',
            resources: 'Resources',
            list: [
              {
                default: true,
                name: "CloudLinux OS",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "/introduction" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/forum/categories/group2" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://cloudlinux.com/cloudlinux-os-blog" },
                ]
              },
              {
                name: "KernelCare",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.kernelcare.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.kernelcare.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.kernelcare.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.kernelcare.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/forum/categories/kernelcare-live-patching" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://blog.kernelcare.com/" },
                ]
              },
              {
                name: "Imunify360",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.imunify360.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.imunify360.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.imunify360.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.imunify360.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/forum/categories/imunify360" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: " https://blog.imunify360.com" },
                ]
              },
              {
                name: "ImunifyAV/AV+",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.imunifyav.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.imunifyav.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.imunifyav.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.imunifyav.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/forum/categories/imunify360" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://blog.imunify360.com" },
                ]
              },
            ]
          }
        },
        productPage: {
          title: "CloudLinux OS support resources",
        },
        stayInTouch: "Stay in touch",
        bottomLinks: [
          {
            text: "How to",
            url:
              "https://cloudlinux.zendesk.com/hc/sections/115001344329-How-do-I"
          },
          {
            text: "Getting started",
            url: "https://www.cloudlinux.com/getting-started-with-cloudlinux-os"
          },
          {
            text: "Contact support",
            url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
          },
          { text: "Blog", url: "https://www.cloudlinux.com/blog" }
        ],

        // text for the language dropdown title
        title: "Language",
        // text for the language dropdown
        selectText: "En",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page",
        tryFree: "Try Free",
        search: "Search",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {
          apiKey: "efaa28397ce47241021d716c439b80d1",
          indexName: "cloudlinuxos",
          appId: "0TCNL6CGX8"
        },
      },
      "/ru/": {
        try_free: "https://cloudlinux.com/ru/trial",
        layouts: {
          product: {
            siteTitle: "Cloudlinux OS"
          },
          documentation: {
            siteTitle: "Документация",
            sidebar: [
              {
                title: "Содержание",
                collapsable: false,
                children: [
                  "/ru/introduction/",
                  "/ru/cloudlinux_installation/",
                  "/ru/control_panel_integration/",
                  "/ru/limits/",
                  "/ru/command-line_tools/",
                  "/ru/lve_manager/",
                  "/ru/cloudlinux_os_components/",
                  "/ru/cloudlinux_os_kernel/",
                  "/ru/for_cloudlinux_partners/",
                  "/ru/deprecated/"
                ]
              }
            ]
          },
          knowledgeBase: {
            siteTitle: "База знаний",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [],
            }],
          },
          gettingStarted: {
            siteTitle: "Начало работы",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [],
            }],
          },
          videoTutorials: {
            siteTitle: "Обучающие ролики",
            sidebar: [{
              title: "Content",
              collapsable: false,
              children: [],
            }],
          }
        },
        title: "Язык",
        selectText: "Рус",
        label: "Русский",
        editLinkText: "Редактировать",
        tryFree: "Попробовать бесплатно",
        search: "Поиск",
        serviceWorker: {
          updatePopup: {
            message: "Доступен новый контент",
            buttonText: "Обновить"
          }
        },
        algolia: {
          apiKey: "efaa28397ce47241021d716c439b80d1",
          indexName: "cloudlinuxos-ru",
          appId: "0TCNL6CGX8"
        },
        navBar: {
          submitRequest: "Отправить запрос",
          products: "Продукты",
          productsMenu: {
            product: 'Продукты',
            resources: 'Resources',
            list: [
              {
                default: true,
                name: "CloudLinux OS",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "/ru/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "/ru/introduction" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/ru/forum/categories/group2" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://cloudlinux.com/ru/cloudlinux-os-blog" },
                ]
              },
              {
                name: "KernelCare",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.kernelcare.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.kernelcare.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.kernelcare.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.kernelcare.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/ru/forum/categories/kernelcare-live-patching" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://blog.kernelcare.com/" },
                ]
              },
              {
                name: "Imunify360",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.imunify360.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.imunify360.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.imunify360.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.imunify360.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/ru/forum/categories/imunify360" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://blog.imunify360.com" },
                ]
              },
              {
                name: "ImunifyAV/AV+",
                resources: [
                  { name: "Getting started", icon: "/svg/gs-blue-icon.svg", url: "https://docs.imunifyav.com/getting-started" },
                  { name: "Documentation", icon: "/svg/doc-blue-icon.svg", url: "https://docs.imunifyav.com/" },
                  { name: "Knowledge base", icon: "/svg/kb-blue-icon.svg", url: "https://docs.imunifyav.com/kb" },
                  { name: "Video tutorials", icon: "/svg/video-blue-icon.svg", url: "https://docs.imunifyav.com/vt" },
                  { name: "Forum", icon: "/svg/forum-blue-icon.svg", url: "https://www.cloudlinux.com/ru/forum/categories/imunify360" },
                  { name: "Blog", icon: "/svg/blog-blue-icon.svg", url: "https://blog.imunify360.com" },
                ]
              },
            ]
          }
        },
        productPage: {
          title: "CloudLinux OS support resources",
        },
        stayInTouch: "Будем на связи",
        bottomLinks: [
            {
                text: "Инструкции",
                url: "https://cloudlinux.zendesk.com/hc/sections/115001344329-How-do-I"
            },
            {
                text: "С чего начать",
                url: "https://www.cloudlinux.com/getting-started-with-cloudlinux-os"
            },
            {
                text: "Техподдержка",
                url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
            },
            { text: "Блог", url: "https://www.cloudlinux.com/blog" }
        ],
      }
    }
  }
};
