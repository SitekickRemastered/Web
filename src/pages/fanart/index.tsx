import { type ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.css";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

type GalleryItem = {
  urls: string[];
  alt: string;
  title: string;
  isLink: boolean;
  socialLinks: object;
};

const ArtList: GalleryItem[] = [
  {
    urls: ["/img/fan_art/bkells/bkells.png"],
    alt: "\"Dr. Frantic pumpkin\" created by bkells",
    title: "\"Dr. Frantic pumpkin\" created by bkells",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/bkells/bkells2.png"],
    alt: "\"Monster pumpkin\" created by bkells",
    title: "\"Monster pumpkin\" created by bkells",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby1.png"],
    alt: "\"3D Sitekick\" created by cyby",
    title: "\"3D Sitekick\" created by cyby",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby2.png",],
    alt: "\"3D Sitekick insides\" created by cyby",
    title: "\"3D Sitekick insides\" created by cyby",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby3.png"],
    alt: "\"3D Printed Sitekick\" created by cyby",
    title: "\"3D Printed Sitekick\" created by cyby",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/puppy/puppy1.png"],
    alt: "\"Puppy's Sitekick\" by puppy",
    title: "\"Puppy's Sitekick\" by puppy",
    isLink: false,
    socialLinks: {
      "https://www.instagram.com/idogmini/": <FontAwesomeIcon icon={faInstagram}/>,
    }
  },
  {
    urls: ["/img/fan_art/puppy/puppy2.png"],
    alt: "\"Surprised Pikachu Sitekick\" by puppy",
    title: "\"Surprised Pikachu Sitekick\" by puppy",
    isLink: false,
    socialLinks: {
      "https://www.instagram.com/idogmini/": <FontAwesomeIcon icon={faInstagram}/>,
    }
  },
  {
    urls: ["/img/fan_art/redpen14/redpen14.png"],
    alt: "\"Sitekick pumpkin\" by redpen14",
    title: "\"Sitekick pumpkin\" by redpen14",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/steph/steph3d.png", "/img/fan_art/steph/steph2.png"],
    alt: "\"Fixing Kablooey\" by ItsStephJM",
    title: "\"Dr Frantic repairing Kablooey\" by ItsStephJM",
    isLink: false,
    socialLinks: {
      "https://www.youtube.com/@ItsStephJM": <FontAwesomeIcon icon={faYoutube} />
    }
  },
  {
    urls: ["/img/fan_art/azuly/azuly.png"],
    alt: "\"Whiteboard doodle\" created by Azuly",
    title: "\"Whiteboard doodle\" created by Azuly",
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["https://www.youtube.com/embed/uSs4KQWMwIk?si=iOqPPBkDlQ1Ceclt"],
    alt: "\"Uncovering YTV\"s Lost and Forgotten Game\" by Tora",
    title: "\"Uncovering YTV\"s Lost and Forgotten Game\" by Tora",
    isLink: true,
    socialLinks: {
      "https://www.youtube.com/@torafights": <FontAwesomeIcon icon={faYoutube} />
    }
  },
  {
    urls: ["https://www.youtube.com/embed/7oe_WZpAVP0?si=aZ9MW7RaVx4bskC-"],
    alt: "\"Sitekick Remastered Tribute?! (December 2023)\" by [GM] me2006",
    title: "\"Sitekick Remastered Tribute?! (December 2023)\" by [GM] me2006",
    isLink: true,
    socialLinks: {}
  }
];

function GalleryItem({ urls, alt, title, isLink, socialLinks }: GalleryItem) {
  return (

    <div className={styles.galleryItem}>
      <div className={styles.galleryItemInner}>
        {urls.length > 1 ?
          <div className={styles.hoverImg}>
            <img className={styles.img1} src={useBaseUrl(urls[0])} alt={alt}/>
            <img className={styles.img2} src={useBaseUrl(urls[1])} alt={alt}/>
          </div>
          : isLink ?
            <iframe width="100%" height="350px" src={urls[0]} title="YouTube video player" allowFullScreen></iframe>
            :
            <img src={useBaseUrl(urls[0])} alt={alt} />
        }
        <p className={styles.galleryTitle}>{title}</p>
        <div className={styles.socialLinks}>
          {
            Object.keys(socialLinks).map((key, idx) => (
              <Link key={socialLinks[key]+idx} to={key}> {socialLinks[key]}</Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default function FanArt(): ReactNode {
  //const colours = ["#9c102b", "#FAF9F6", "#8397b0", "#f0ead6", "#76736e"];
  //const bgColour = colours[Math.floor(Math.random() * colours.length)];
  const bgNum = Math.floor(Math.random() * 4) + 1;
  const bgLoc = `/img/fan_art/backgrounds/background${bgNum}.png`;

  return (
    <Layout title={"Fan art"} description="Clickity-click, it's Sitekick!">
      <main style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bgLoc}) repeat`,
        backgroundSize: "contain"
      }}>
        <div className={styles.fanArtContainer}>
          <div className={styles.pageTitleOuter}>
            <Heading as="h1" className={styles.pageTitleInner}>Fan Art</Heading>
          </div>
          <div className={styles.pageInfoOuter}>
            <p className={styles.pageInfoInner}>
              We have seen some amazing fan art in our&nbsp;
              <Link to="https://discord.sitekickremastered.com">Discord Server</Link> over the years.
              Like YTV before us, we decided to showcase these posts here!</p>
          </div>

          <div className={styles.masonryContainer}>
            <div className={styles.masonry}>
              {ArtList.map((props, idx) => (
                <GalleryItem key={idx} {...props} />
              ))}
            </div>
          </div>
          <div className={styles.pageInfoOuter}>
            <p className={styles.pageInfoInner}>
              If you want to post your own art, send it to the <Link to="https://discord.com/channels/603580736250970144/603580736250970148">#general</Link> channel in our discord server or <Link to="/contact">contact us</Link> and we will make sure to include it here!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
