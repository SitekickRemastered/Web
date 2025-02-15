import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="footer__container">
        <div className="social__links">
          <a href="https://discord.sitekickremastered.com" className="discord__logo">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a href="https://github.com/SitekickRemastered/" className="github__logo">
            <FontAwesomeIcon icon={faGithub} />
            </a>
          <a href="https://www.instagram.com/sitekickremastered/" className="instagram__logo">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com/SitekickGame" className="twitter__logo">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://www.youtube.com/channel/UCZQ0gBa3SbxwfQ5zp4029PQ" className="youtube__logo">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <hr />
        {links}
        <hr />
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
