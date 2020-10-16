declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.po" {
  const data: import('ttag/types').LocaleData;
  export default data;
}

declare const t: typeof import('ttag').t;
declare const jt: typeof import('ttag').jt;
declare const msgid: typeof import('ttag').msgid;
declare const ngettext: typeof import('ttag').ngettext;