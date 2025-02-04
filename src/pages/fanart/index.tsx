import { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Carousel from '../../components/Carousel';
import { faBluesky, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GalleryItem = {
  urls: string[];
  alt: string;
  title: string;
  hoverEffect: boolean;
  isLink: boolean;
  socialLinks: object;
};

const ArtList: GalleryItem[] = [
  {
    urls: ["/img/fan_art/bkells/bkells.png"],
    alt: `"Dr. Frantic pumpkin" created by bkells`,
    title: `"Dr. Frantic pumpkin" created by bkells`,
    hoverEffect: false,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby1.png", "/img/fan_art/cyby/cyby2.png", "/img/fan_art/cyby/cyby3.png"],
    alt: `"3D Sitekick "created by cyby`,
    title: `"3D Sitekick" created by cyby`,
    hoverEffect: false,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/puppy/puppy1.png", "/img/fan_art/puppy/puppy2.png"],
    alt: `"Sitekick drawing" by puppy`,
    title: `"Sitekick drawings" by puppy`,
    hoverEffect: false,
    isLink: false,
    socialLinks: {
      "https://www.instagram.com/idogmini/": <FontAwesomeIcon icon={faInstagram}/>,
      "https://bsky.app/profile/idogmini.bsky.social": <FontAwesomeIcon icon={faBluesky}/>
    }
  },
  {
    urls: ["https://www.youtube.com/embed/7oe_WZpAVP0?si=aZ9MW7RaVx4bskC-"],
    alt: `"Sitekick Remastered Tribute?! (December 2023)" by [GM] me2006`,
    title: `"Sitekick Remastered Tribute?! (December 2023)" by [GM] me2006`,
    hoverEffect: false,
    isLink: true,
    socialLinks: {}
  }
];

function GalleryItem({ urls, alt, title, hoverEffect, isLink, socialLinks }: GalleryItem) {
  return (

    <div className={styles.galleryItem}>
      <div className={styles.galleryItemInner}>
        {!hoverEffect && urls.length > 1 ?
          <div>
            <Carousel autoPlay={false} pictures={urls} />
          </div>
          :
          hoverEffect ?
          <div className={styles.hoverImg}>
              <img className={styles.img1} src={useBaseUrl(urls[0])} />
            <img className={styles.img2} src={useBaseUrl(urls[1])} /> 
          </div>
          : isLink ?
              <iframe width="100%" height="350px" src={urls[0]} title="YouTube video player" allowFullScreen></iframe>
          :
          <img src={useBaseUrl(urls[0])} alt={alt} />
        }
        <p className={styles.galleryTitle}>{title}</p>
        <div className={styles.socialLinks}>
        {
          Object.keys(socialLinks).map((key) => (
            <a href={key}>{socialLinks[key]}</a>
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
  const bgLoc = `/img/fan_art/backgrounds/background${bgNum}.png`

  return (
    <Layout title={`Fan Art`} description="Clickity-click, it's Sitekick!">
      <main style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgLoc}) repeat`,
      }}>
        <div className={styles.fanArtContainer}>
          <div className={styles.pageTitleOuter}>
            <h1 className={styles.pageTitleInner}>Fan Art</h1>
          </div>
          <div className={styles.pageInfoOuter}>
            <p className={styles.pageInfoInner}>
              We've been seeing some really cool bits of fan art appear in our&nbsp; 
              <a href="discord.sitekickremastered.com">Discord Server</a> over the years. 
              Like YTV before us, we've decided to showcase these posts here!</p>
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
              If you want to post your own art, send it to ⁠general and we'll make sure to include it here!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
