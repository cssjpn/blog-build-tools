'use strict';

const regex = /(<blockquote>[\n|\s]*<p>\[!)(NOTE|IMPORTANT|WARNING|TIP)\]([^]*?)<\/p>[\n|\s]*<\/blockquote>/gm;

//transformation rules
//see https://docs.microsoft.com/ja-jp/contribute/markdown-reference
const alertConfig = {
  "NOTE": {
    className: "is-info",
    ja: "Note", //original docs use "注意" as Note,
    en: "Note",
    ko: "참고"
  },
  "TIP": {
    className: "is-success",
    ja: "ヒント",
    en: "Tip",
    ko: "팁"
  },
  "IMPORTANT": {
    className: "is-important",
    ja: "重要",
    en: "Important",
    ko: "중요"
  },
  "CAUTION": {
    className: "is-caution",
    ja: "注意事項",
    en: "Caution",
    ko: "주의"
  },
  "WARNING": {
    className: "is-warning",
    ja: "警告",
    en: "Warning",
    ko: "경고"
  }
}

hexo.extend.filter.register('after_post_render', function (data) {
  const { config } = this;

  let lang = config.language;
  if (alertConfig.NOTE[lang] === null) {
    lang = "en";
  }

  data.content = data.content.replace(regex, function(match, _, p2, p3){
    const alert = alertConfig[p2];
    const title = alert[lang];
    const className = alert.className;
    
    const content = p3.split('<br>');

    if(content[0] === ""){
      //delete first empty line
      content.shift();
    }

    //generate p tags
    const p = '<p>' + content.join('</p><p>') + '</p>';

    return `<div class="alert ${className}"><p class="alert-title">${title}</p>${p}</div>`;
  });
  return data;
});