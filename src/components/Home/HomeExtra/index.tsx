import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

import styles from "./style.module.css";

export default function HomeExtra(): ReactNode {
  return (
    <section>
      <div className={clsx("row", styles.extraCardContainer)}>

        {/* Join the Team card */}
        <div className={clsx("col ytvContainer purple", styles.extraCard)}>
          <div className="ytvContainerInner purple">
            <h1>Join the Team!</h1>
            <div className={clsx("row", styles.extraCardContent)}>
              <div className="col col--5">
                <img src={useBaseUrl("/img/home/propaganda.png")} alt="Sitekick 'I Want You' poster with Carlos" />
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
        <div className={clsx("col ytvContainer green", styles.extraCard)}>
          <div className="ytvContainerInner green">
            <h1 >Multi-Device Support</h1>
            <div className={clsx("row", styles.extraCardContent)}>
              <div className={clsx("col", styles.lOrder)}>
                <p>Sitekick Remastered is available on Google Play and the Microsoft Store. MacOS and Linux users can play using an Android emulator.</p>
                <p><b>iOS support is not planned at this time.</b></p>
              </div>
              <div className={clsx("col", styles.rOrder)}>
                <img src={useBaseUrl("/img/home/devices.png")} alt="Picture of devices sitekick is available on (Mobile, Desktop, Smart Fridge, etc.)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
