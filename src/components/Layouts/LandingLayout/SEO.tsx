import Head from "next/head";

import React from "react";

const SEO = ({
  description,
  image,
  title,
  twitterCard,
  noindex,
}: Partial<SEOobject>) => (
  <Head>
    <title key="title">{title || "My Native Tree"}</title>
    <meta name="title" content={title || "My Native Tree"} key="metatitle" />
    <meta
      name="description"
      content={
        description ||
        "My Native Tree: A Secure platform to preserve your family history for generations to come"
      }
      key="description"
    />

    <meta
      property="og:title"
      content={title || "My Native Tree"}
      key="og:title"
    />
    <meta
      property="og:description"
      content={
        description ||
        "My Native Tree: A Secure platform to preserve your family history for generations to come"
      }
      key="og:description"
    />
    {image && <meta property="og:image" content={image} key="og:image" />}
    <meta property="og:site_name" content="My Native Tree" key="og:site_name" />
    <meta property="og:type" content="website" key="og:type" />

    <meta
      name="twitter:title"
      content={title || "My Native Tree"}
      key="twitter:title"
    />
    <meta
      name="twitter:description"
      content={
        description ||
        "My Native Tree: A Secure platform to preserve your family history for generations to come"
      }
      key="twitter:description"
    />
    {image && <meta name="twitter:image" content={image} key="twitter:image" />}
    <meta
      name="twitter:card"
      content={twitterCard || "summary"}
      key="twitter:card"
    />
    <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" />
    <meta
      httpEquiv="Cross-Origin-Opener-Policy"
      content="same-origin-allow-popups"
    />
    {/* <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" /> */}

    {noindex && <meta name="robots" content="noindex" key="noindex" />}
  </Head>
);

export default SEO;
