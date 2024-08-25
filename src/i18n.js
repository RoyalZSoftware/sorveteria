const TRANSLATE_DIRECTIVE = 'i18n';

translations = {};

function addTranslations(translationsObj) {
  translations = {...translations, ...translationsObj};
}

function translate(key, params = {}) {
  const paths = key.split('.');
  let translation = translations[paths[0]];
  for (let i = 1; i < paths.length; i++) {
    translation = translation[paths[i]];
  }

  const translationParams = Object.keys(params);

  return translationParams.reduce((prev, curr) => {
    
    return prev.replace(`{${curr}}`, params[curr]);
  }, translation);
}

function translateDirectives() {
  const directives = document.querySelectorAll('[' + TRANSLATE_DIRECTIVE + ']');
  directives.forEach((directive) => {
    const p = directive.getAttribute("i18n-p");
    let params = undefined;
    if (!!p) {
      params = p.split(';').reduce((prev, curr) => {
        const kv = curr.split(':');
        prev[kv[0]] = kv[1];
        return prev;
      }, {});
    }
    try {
      directive.innerText = translate(directive.getAttribute(TRANSLATE_DIRECTIVE), params);
    } catch {
      console.error("Could not be translated: ", directive);
    }
  });
}
