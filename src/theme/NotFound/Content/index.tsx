import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main 
    className={clsx('container margin-vert--xl padding-vert--xl', className)} >
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              404: Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We searched from here to dimension 34, but we couldn't find what you were looking for.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              If you think this is an error, please let us know through our contact page!
            </Translate>
          </p>
        </div>
      </div>
    </main>
  );
}
