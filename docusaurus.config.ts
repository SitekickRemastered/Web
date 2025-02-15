import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Sitekick Remastered",
  favicon: "img/favicon.ico",
  url: "https://sitekickremastered.com/",
  baseUrl: "/",

  // Github Deployment and repo name
  organizationName: "SitekickRemastered",
  projectName: "Web",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Remove this to get rid of the "Edit this page" button
          editUrl:  "https://github.com/sitekickremastered/Web/",
          admonitions: {
            keywords: ['discord','frantic'],
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
           // Use "warn" fr this if you want to be warned about mdx files not have <!-- truncate --> (Which adds "Read More")
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
        { type: "dropdown", label: "Community", position: "left", activeBaseRegex: "/fanart",
          items: [
            { to: "https://discord.sitekickremastered.com", label: "Discord", },
            { to: "/fanart", label: "Fan Art", }
          ],
        },
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Wiki",
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
            { label: "Fan Art", to: "/fanart" },
            { label: "Metrics", to: "/metrics" },
            { label: "Rules", to: "/docs/rules" },
            { label: "Server Status", to: "/status" }
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
            { label: "Privacy Policy", to: "/legal/privacy" },
            { label: "Terms of Service", to: "/legal/tos" },
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
