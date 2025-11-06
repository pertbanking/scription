/**
 * Enumeration of all 66 books of the Bible
 *
 * Values are lowercase strings suitable for API queries and display.
 * The enum includes all books from the Protestant canon:
 * - Old Testament: Genesis through Malachi (39 books)
 * - New Testament: Matthew through Revelation (27 books)
 *
 * Numbered books (e.g., 1 Samuel, 2 Corinthians) use the format "1 samuel", "2 corinthians".
 *
 * @example
 * ```typescript
 * const book = Book.Genesis;  // "genesis"
 * const book2 = Book.FirstCorinthians;  // "1 corinthians"
 * const parsed = Book.toBook("john");  // Book.John
 * ```
 */
export enum Book {
  Genesis = "genesis",
  Exodus = "exodus",
  Leviticus = "leviticus",
  Numbers = "numbers",
  Deuteronomy = "deuteronomy",
  Joshua = "joshua",
  Judges = "judges",
  Ruth = "ruth",
  FirstSamuel = "1 samuel",
  SecondSamuel = "2 samuel",
  FirstKings = "1 kings",
  SecondKings = "2 kings",
  FirstChronicles = "1 chronicles",
  SecondChronicles = "2 chronicles",
  Ezra = "ezra",
  Nehemiah = "nehemiah",
  Esther = "esther",
  Job = "job",
  Psalms = "psalms",
  Proverbs = "proverbs",
  Ecclesiastes = "ecclesiastes",
  SongOfSolomon = "song of solomon",
  Isaiah = "isaiah",
  Jeremiah = "jeremiah",
  Lamentations = "lamentations",
  Ezekiel = "ezekiel",
  Daniel = "daniel",
  Hosea = "hosea",
  Joel = "joel",
  Amos = "amos",
  Obadiah = "obadiah",
  Jonah = "jonah",
  Micah = "micah",
  Nahum = "nahum",
  Habakkuk = "habakkuk",
  Zephaniah = "zephaniah",
  Haggai = "haggai",
  Zechariah = "zechariah",
  Malachi = "malachi",
  Matthew = "matthew",
  Mark = "mark",
  Luke = "luke",
  John = "john",
  Acts = "acts",
  Romans = "romans",
  FirstCorinthians = "1 corinthians",
  SecondCorinthians = "2 corinthians",
  Galatians = "galatians",
  Ephesians = "ephesians",
  Philippians = "philippians",
  Colossians = "colossians",
  FirstThessalonians = "1 thessalonians",
  SecondThessalonians = "2 thessalonians",
  FirstTimothy = "1 timothy",
  SecondTimothy = "2 timothy",
  Titus = "titus",
  Philemon = "philemon",
  Hebrews = "hebrews",
  James = "james",
  FirstPeter = "1 peter",
  SecondPeter = "2 peter",
  FirstJohn = "1 john",
  SecondJohn = "2 john",
  ThirdJohn = "3 john",
  Jude = "jude",
  Revelation = "revelation",
}

export namespace Book {
  /**
   * Convert a string to a Book enum value
   * @param str The string to convert (case-insensitive)
   * @returns The corresponding Book enum value
   * @throws Error if the string doesn't match any book
   */
  export function toBook(str: string): Book {
    const normalized = str.toLowerCase().trim();

    // Find the enum value that matches the string
    for (const [_, value] of Object.entries(Book)) {
      if (value === normalized) {
        return value as Book;
      }
    }

    throw new Error(`Unknown book: "${str}"`);
  }
}
