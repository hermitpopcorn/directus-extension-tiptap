import { Node, mergeAttributes } from "@tiptap/core";
import type { ExtensionMeta } from "./index";

export type VideoAttributes = {
  src?: string;
  width?: string | number;
  height?: string | number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: VideoAttributes) => ReturnType;
    };
  }
}

export const Video = Node.create({
  name: "video",
  inline: true,
  group: "inline",
  selectable: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: "video",
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
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "video",
            attrs: options,
          });
        },
    };
  },
});

const extension: ExtensionMeta = {
  name: "video",
  title: "Video",
  package: "File Library",
  group: "node",
  defaults: {},
  options: [],
  load() {
    return Video;
  },
};

export default extension;
