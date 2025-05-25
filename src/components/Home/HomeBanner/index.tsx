import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import styles from "./style.module.css";

export default function HomeBanner() {
  return (
    <div className="homeBg">
      <header className={clsx(styles.heroBanner, "ytvContainer orange")}>
        <div className="ytvContainerInner orange">
          <div className={clsx("row", styles.homeRow)}>
            <div className={clsx("col col--8", styles.lOrder)}>
              <Heading as="h1" className={styles.hero_title}>What's Sitekick Remastered?</Heading>
              <p className={styles.hero_subtitle}>
                Sitekick, an online game originally developed for YTV.com in 2003, was discontinued in 2015 due to legacy code limitations. Sitekick Remastered aims to preserve the original game's assets and history while delivering an enhanced, modernized version.
                <br /><br />
                Created by fans, for fans. Sitekick Remastered is a completely free game, containing no advertisements, subscriptions, microtransactions, or any other form of monetization.
                <br /><br />
                Sitekick Remastered is an independent project and is not affiliated with YTV Canada Inc. or Corus Entertainment Inc.
              </p>
              <div className="row" style={{ justifyContent: "center" }}>
                <Link to="/download" className="button button--lg margin--sm">
                  Play now! 🕹️
                </Link>
                <div className={styles.spacer} />
                <Link to="https://discord.com/sitekickremastered" className="button button--lg button--blurple margin--sm">
                  Join Discord
                </Link>
              </div>
            </div>
            <div className={clsx("col col--4 row--align-center", styles.rOrder)} style={{ display: "flex" }}>
              <div className={styles.heroPanelPicture}>
                <img className={styles.heroPanelImage} src={useBaseUrl("/img/home/blob4.svg")} alt="Background blob for sitekicks" />
                <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickLeft}`} src={useBaseUrl("/img/home/sitekick.png")} alt="A standard, yellow sitekick" />
                <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickRight}`} src={useBaseUrl("/img/home/authicer.png")} alt="Our purple mod sitekick, authicer" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

