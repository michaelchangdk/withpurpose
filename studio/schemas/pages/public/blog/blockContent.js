import React from "react";

const pinktextIcon = () => (
  <span style={{ fontWeight: "bold", color: "#e93a7d" }}>P</span>
);

const pinktextRender = (props) => (
  <span style={{ color: "#e93a7d", fontWeight: 500 }}>{props.children}</span>
);

const purpletextIcon = () => (
  <span style={{ fontWeight: "bold", color: "#6356d7" }}>P</span>
);

const purpletextRender = (props) => (
  <span style={{ color: "#6356d7", fontWeight: 500 }}>{props.children}</span>
);

const bluetextIcon = () => (
  <span style={{ fontWeight: "bold", color: "#5491e3" }}>P</span>
);

const bluetextRender = (props) => (
  <span style={{ color: "#5491e3", fontWeight: 500 }}>{props.children}</span>
);

const centerblockRender = (props) => (
  <div style={{ textAlign: "center", width: "80%", margin: "0 auto" }}>
    {props.children}
  </div>
);

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        {
          title: "Center Block",
          value: "centerblock",
          blockEditor: { render: centerblockRender },
        },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          {
            title: "Purple Text",
            value: "purpletext",
            blockEditor: {
              icon: purpletextIcon,
              render: purpletextRender,
            },
          },
          {
            title: "Pink Text",
            value: "pinktext",
            blockEditor: {
              icon: pinktextIcon,
              render: pinktextRender,
            },
          },
          {
            title: "Blue Text",
            value: "bluetext",
            blockEditor: {
              icon: bluetextIcon,
              render: bluetextRender,
            },
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "image",
      options: { hotspot: true },
    },
  ],
};
