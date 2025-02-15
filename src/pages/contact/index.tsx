import type { ReactNode } from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Contact(): ReactNode {
  return (
    <Layout title={`Contact`} description="Clickity-click, it's Sitekick!">
      <main className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <div>
          <h1>Contact Us</h1>
            <p>Have any questions, feedback, or want to share fan art? We'd love to hear from you!</p>
            <p>Feel free to reach out through the option below, or, if you prefer, you can email us directly at <a href="mailto:admin@sitekickremastered.com">admin@sitekickremastered.com</a></p>
          </div>
        </div>
        <div className={styles.kablooeyDiv}>
          <div>
            <h1>Message us on Discord</h1>
            <p>If you have a general question, you should join our <a className={styles.kablooeyA} href="http://discord.sitekickremastered.com/">Discord server</a> and ask a question in the <b>#general</b>, <b>#game-chat</b>, or <b>#sitekick-dev</b> channels.</p>
            <p>If you have a private question (ex. Account related questions, player reports, or security questions), please message our Modmail bot, Kablooey</p>
            <div>
              <a className="button" href="https://discordapp.com/channels/@me/653394550580183050">Message Kablooey!</a>
            </div>
          </div>
        </div>  
      </main>
    </Layout>
  );
}
