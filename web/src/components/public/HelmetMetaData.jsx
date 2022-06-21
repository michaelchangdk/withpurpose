import React from "react";
import { Helmet } from "react-helmet";
// import { useLocation } from "react-router-dom";

const HelmetMetaData = ({url, image, title, excerpt, hashtags}) => {
    // console.log("HELMETMETADATA", "url", url, "title", title, "image", image, "hashtags", hashtags)
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta
                property="url"
                content={url}
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={excerpt} />
            <meta name="description" content={excerpt} />
            <meta property="image" content={image} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="With Purpose - Accelerating Women Entrepreneurs in the Nordics"/>
            <meta name="twitter:description" content="We help women founders in the Nordics to build, run, and grow their startups."/>
            <meta name="twitter:image" content={image}></meta>
            {/* Facebook */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={excerpt} />
            <meta property="og:hashtag" content={hashtags} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta
                property="og:url"
                content={url}
            />
            <meta property="og:site_name" content="With Purpose" />
            <meta property="og:description" content={excerpt} />
        </Helmet>
    );
}

export default HelmetMetaData;
