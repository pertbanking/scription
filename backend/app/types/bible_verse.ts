import { Book } from "./bible_book";

export class VerseRef {
  readonly book: Book;
  readonly chapter: number;
  readonly verse: number;
  readonly suffix?: string;

  /**
   *
   * @param book The book
   * @param chapter The chapter
   * @param verse The verse
   * @param suffix The suffix (can be 'a' or 'b' or something else)
   */
  constructor(book: Book, chapter: number, verse: number, suffix?: string) {
    this.book = book;
    this.chapter = Math.trunc(chapter);
    this.verse = Math.trunc(verse);
    this.suffix = suffix;
  }
}

export class Footnote {
  _id: number;
  readonly position: number;
  readonly text: string;

  /**
   *
   * @param id        The ID of this footnote (i.e. 1, 2, etc.), to differentiate it from other
   *                  footnotes
   * @param position  The character position of the footnote within the verse (indexed by 0)
   * @param text      The text of the footnote
   */
  constructor(id: number, position: number, text: string) {
    this._id = Math.trunc(id);
    this.position = Math.trunc(position);
    this.text = text;
  }

  /**
   * Get the ID of this footnote (footnote IDs are mutable because sometimes they should be changed
   * to make room for footnotes that come before)
   */
  get id() {
    return this._id;
  }

  /**
   * Set the ID of this footnote
   */
  set id(id: number) {
    this._id = Math.trunc(id);
  }
}

export class Verse {
  readonly ref: VerseRef;
  readonly text: string;
  readonly footnotes: Footnote[];

  /**
   * @param ref       Reference
   * @param text      Verse text
   * @param footnotes Verse footnotes
   */
  constructor(ref: VerseRef, text: string, footnotes: Footnote[]) {
    this.ref = ref;
    this.text = text;
    this.footnotes = footnotes;
  }
}
