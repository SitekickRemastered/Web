import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./style.module.css";

export default function HomeExtra(): ReactNode {
  return (
    <section>
      <div className={`row ${styles.extraCardContainer}`}>

        {/* Join the Team card */}
        <div className={`col ytvContainer purple ${styles.extraCard}`}>
          <div className="ytvContainerInner purple">
            <Heading as="h1">Join the Team!</Heading>
            <div className={`row ${styles.extraCardContent}`}>
              <div className="col col--5">
                {/*<img src={useBaseUrl("/img/home/propaganda.png")} alt="Sitekick 'I Want You' poster with Carlos" />*/}
                <img src={useBaseUrl("/img/home/kablooey_repair.png")} alt="Dr. Frantic repairing Kablooey by ItsStephJM" className="border-radius-50"/>
              </div>
              <div className="col col--7">
                <p>Are you a programmer, artist, animator, writer, or web designer looking to contribute?</p>
                <Link
                  className="button margin--sm"
                  to="/docs/development/join_the_team">
                  Learn more!
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Device Support card */}
        <div className={`col ytvContainer green ${styles.extraCard}`}>
          <div className="ytvContainerInner green">
            <Heading as="h1" >Multi-Device Support</Heading>
            <div className={`row ${styles.extraCardContent}`}>
              <div className="col">
                <p>Sitekick Remastered is available on Google Play and the Microsoft Store.</p>
                <Link
                  className="button margin--sm"
                  to="/docs/tutorials/downloading">
                    More info
                </Link>
              </div>
              <div className="col">
                <img className={styles.imgTwo} src={useBaseUrl("/img/home/devices.png")} alt="Picture of devices sitekick is available on (Mobile, Desktop, Smart Fridge, etc.)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
