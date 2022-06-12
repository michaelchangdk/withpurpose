import { ImgW100 } from "../styledcomponents/images";
import { H1 } from "../styledcomponents/typography";
import { urlFor } from "../client";

const myPortableTextComponents = {
    types: {
      image: ({ value }) => (
        <ImgW100
          src={urlFor(value.asset._ref).url()}
          alt={value.asset._ref}
        />
      ),
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    block: {
      blockquote: ({ children }) => (
        <blockquote style={{ fontSize: "18px" }}>{children}</blockquote>
      ),
      h1: ({children}) => <H1>{children}</H1>
    },

    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            style={{ color: "#000", textDecoration: "underline" }}
          >
            {children}
          </a>
        );
      },
    },
  };

export default myPortableTextComponents;