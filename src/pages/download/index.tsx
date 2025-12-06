import type { ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

type DownloadButton = {
  alt: string;
  url: string;
  imgUrl: string;
};

const ButtonList: DownloadButton[] = [
  {
    alt: "Google Play Download Badge",
    url: "https://play.google.com/store/apps/details?id=com.SitekickRemastered.Sitekick",
    imgUrl: "/img/download/google-play-badge.svg",
  },
  {
    alt: "Windows Store Download Badge",
    url: "ms-windows-store://pdp/?productid=9P7KL6QQLP4X",
    imgUrl: "/img/download/microsoft-badge.svg",
  },
  {
    alt: "GitHub APK Download Badge",
    url: "https://github.com/SitekickRemastered/Game/releases/",
    imgUrl: "/img/download/github-badge.svg",
  },
];

function DownloadButton({ alt, url, imgUrl }: DownloadButton) {
  return (
    <div className={styles.platformBlock}>
      <Link to={url} rel="noopener" target="__blank">
        <img src={useBaseUrl(imgUrl)} alt={alt} />
      </Link>
    </div>
  );
}

function DownloadPage() {
  return (
    <main className={styles.downloadMain}>
      <div className={styles.downloadInner}>
        <div className={styles.downloadContent}>

          { /* Logo and slogan */}
          <img className={styles.downloadLogo} src={useBaseUrl("/img/logo-beta.svg")} alt="Sitekick Remastered Beta Logo"/>
          <Heading as="h1" className={styles.slogan}>Made by fans, for fans</Heading>

          { /* Beta warning */ }
          <div className={"admonition alert alert--danger"}>
            <div className={"admonitionHeading"}>
              <span className={"admonitionIcon"}>
                <FontAwesomeIcon icon={faWarning} />
                <b> Warning</b>
              </span>
            </div>
            <div className="admonitionContent">
              <p style={{ textAlign: "center" }}>Sitekick Remastered is still in Beta. All chips, xp, and collection lists will be wiped upon the full release.</p>
              <p style={{ textAlign: "center", marginBottom: 0 }}>Apple devices are not supported. <Link href="/docs/tutorials/downloading">Click here</Link> for more info.</p>
            </div>
          </div>

          { /* Download buttons */ }
          <div className={styles.downloadButtonContainer}>
            {ButtonList.map((props, idx) => (
              <DownloadButton key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}

export default function Download(): ReactNode {
  return (
    <Layout title={"Download"} description="Clickity-click, it's Sitekick!">
      <DownloadPage />
    </Layout>
  );
}
