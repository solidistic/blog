import { Remarkable } from "remarkable";
import hljs from "highlight.js";
// import hljs from "highlight.js/lib/highlight";
// import javascript from "highlight.js/lib/languages/javascript";
// import xml from "highlight.js/lib/languages/xml";

// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("html", xml);

hljs.configure({
  languages: ["javascript", "html"]
});

const md = new Remarkable("full", {
  html: false,
  breaks: true,
  linkify: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        console.log(lang);
        return hljs.highlight(lang, str).value;
      } catch (error) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (error) {}

    return "";
  }
});

export default md;
