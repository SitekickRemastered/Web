import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Sitekick Remastered",
  favicon: "img/favicon.ico",
  url: "https://sitekickremastered.com/",
  baseUrl: "/",
  customFields: {
    BASE_URL: process.env.BASE_URL,
    GAME_URL: process.env.GAME_URL,
    METRICS: process.env.METRICS,
    LOGIN: process.env.LOGIN,
    GET_ONE: process.env.GET_ONE,
    GET_LIST: process.env.GET_LIST,
    CHANGE_INFO: process.env.CHANGE_INFO,
    RESET_XP: process.env.RESET_XP,
    PASS_RESET: process.env.PASS_RESET,
    CREATE_PASS_RESET: process.env.CREATE_PASS_RESET,
    BAN: process.env.BAN,
    UNBAN: process.env.UNBAN,
    DELETE: process.env.DELETE,
    GET_CHIPS: process.env.GET_CHIPS,
    GET_CODES: process.env.GET_CODES,
    ADD_CODE: process.env.ADD_CODE,
    EDIT_CODE: process.env.EDIT_CODE,
    DEL_CODE: process.env.DEL_CODE,
    GET_C_LISTS: process.env.GET_C_LISTS,
    ADD_C_LIST: process.env.ADD_C_LIST,
    EDIT_C_LIST: process.env.EDIT_C_LIST,
    DEL_C_LIST: process.env.DEL_C_LIST,
    GET_FUSIONS: process.env.GET_FUSIONS,
    ADD_FUSION: process.env.ADD_FUSION,
    EDIT_FUSION: process.env.EDIT_FUSION,
    DEL_FUSION: process.env.DEL_FUSION,
    GET_ACTIVITY_LOG: process.env.GET_ACTIVITY_LOG,
    GET_CONSOLE_LOG: process.env.GET_CONSOLE_LOG
  },

  // Github Deployment and repo name
  organizationName: "SitekickRemastered",
  projectName: "Web",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // For Docusaurus faster https://github.com/facebook/docusaurus/issues/10556
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true, // required
    },
    experimental_faster: true,
  },

  plugins: [require.resolve("docusaurus-lunr-search")],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Remove this to get rid of the "Edit this page" button
          editUrl:  "https://github.com/SitekickRemastered/Web/tree/main/",
          admonitions: {
            keywords: ["discord","frantic","yap"],
            extendDefaults: true,
          },
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",

          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          // Use "warn" for this if you want to be warned about mdx files not have <!-- truncate --> (Which adds "Read More")
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social_card.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      logo: {
        src: "img/logo.svg",
        alt: "Sitekick Remastered Logo",
      },
      items: [
        { to: "/download", label: "Download", position: "left" },
        { to: "/blog", label: "News", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Wiki",
        },
        { type: "dropdown", label: "Community", position: "left", activeBaseRegex: "/fanart",
          items: [
            { to: "https://discord.sitekickremastered.com", label: "Discord", },
            { to: "https://yap.sitekickremastered.com/", label: "Message Boards", },
            { to: "/fanart", label: "Fan Art", }
          ],
        },
        /*
        { to: "/contact", label: "Contact Us", position: "left"}
        { to: "/games", label: "Games", position: "left" },
        { to: "/metrics", label: "Metrics", position: "left"},
        { to: "/status", label: "Status", position: "left"},
        */
      ],
    },

    footer: {
      style: "dark",
      logo: {
        src: "img/logo.svg",
        alt: "Sitekick Remastered Logo",
        href: "https://sitekickremastered.com",
        className: "footer__logo",
      },
      links: [
        {
          title: "General",
          items: [
            { label: "Metrics", to: "/metrics" },
            { label: "Rules", to: "/docs/rules" },
            { label: "Server Status", to: "/status" }
          ]
        },
        {
          title: "Community",
          items: [
            { label: "Discord", to: "https://discord.sitekickremastered.com" },
            { label: "Message Boards", to: "https://yap.sitekickremastered.com/" },
            { label: "Fan Art", to: "/fanart" },
          ]
        },
        {
          title: "Development",
          items: [
            { label: "News", to: "/blog" },
            { label: "Changelog", to: "/docs/development/changelog" },
            { label: "Join the Team", to: "/docs/development/join_the_team" },
          ]
        },
        {
          title: "Legal",
          items: [
            { label: "Privacy Policy", to: "/legal/privacy-policy" },
            { label: "Terms of Service", to: "/legal/terms-of-service" },
            { label: "Cookies Policy", to: "/legal/cookies" },
            { label: "Contact Us", to: "/contact" },
          ]
        }

        /* Single Row Footer
        { label: "Home", to: "/" },
        { label: "News", to: "/blog" },
        { label: "Download", to: "/download" },
        { label: "Fan Art", to: "/fanart" },
        { label: "Wiki", to: "/wiki" },
        { label: "Metrics", to: "/metrics"},
        { label: "Status", to: "/status"},

        { label: "Privacy Policy", to: "/legal/privacy"},
        { label: "Terms of Service", to: "/legal/tos"},
        { label: "Cookies Policy", to: "/legal/cookies"},
        { label: "Rules", to: "/docs/rules"},

        { label: "Join the Team", to: "/docs/development/join_the_team"},
        { label: "Contact Us", to: "/contact"},
        */
      ],
      copyright: `Sitekick Remastered is in no way affiliated with YTV Canada, Inc. and/or Corus Entertainment, Inc. <br/>
                  Sitekick Remastered is a completely free game, containing no advertisements, subscriptions, microtransactions,
                  or any other form of monetization.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
