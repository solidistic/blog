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

const md = new Remarkable({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        console.log(lang);
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return "";
  }
});

export default md;
