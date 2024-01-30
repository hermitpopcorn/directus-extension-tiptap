import { Node, mergeAttributes } from "@tiptap/core";
import type { ExtensionMeta } from "./index";

export type YouTubeAttributes = {
  src?: string;
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtube: {
      setYouTube: (options: YouTubeAttributes) => ReturnType;
    };
  }
}

export const YouTube = Node.create({
  name: "youtube",
  inline: true,
  group: "inline",
  selectable: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      allowFullscreen: {
        default: false,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setYouTube:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "youtube",
            attrs: options,
          });
        },
    };
  },
});

const extension: ExtensionMeta = {
  name: "youtube",
  title: "YouTube Embed",
  package: "Custom",
  group: "node",
  defaults: {},
  options: [],
  load() {
    return YouTube;
  },
};

export default extension;
