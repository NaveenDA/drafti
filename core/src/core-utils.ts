import * as MarkdownIt from "markdown-it";

export class CoreUtils {
  public static compile(markdown: string) {
    const md = new MarkdownIt();
    return md.render(markdown);
  }

  public static truncateOnWord(str: string, limit: number): string {
    const trimmable =
      "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF";
    const reg = new RegExp("(?=[" + trimmable + "])");
    const words = str.split(reg);
    let count = 0;
    return words
      .filter(word => {
        count += word.length;
        return count <= limit;
      })
      .join("");
  }
}
