import { IBook } from "../types/books.interface";

export class BookDto {

  id!: string;
  coverImageUrl!: string;
  title!: string;
  author!: string;
  publishedYear!: number;
  isbn!: string;
  editorial!: string;
  language!: string;
  description!: string;
  genre!: string;
  availableCopies!: number;
  takenBy!: string[];

  async fromDocument(bookDoc: any): Promise<IBook[]> {
    const bookDto = bookDoc.map((doc: any) => {
      const bookDto = new BookDto();
      bookDto.id = doc._id?.toString?.();
      bookDto.coverImageUrl = doc.coverImageUrl;
      bookDto.title = doc.title;
      bookDto.author = doc.author;
      bookDto.publishedYear = doc.publishedYear;
      bookDto.isbn = doc.isbn;
      bookDto.editorial = doc.editorial;
      bookDto.language = doc.language;
      bookDto.description = doc.description;
      bookDto.genre = doc.genre;
      bookDto.availableCopies = doc.availableCopies;
      bookDto.takenBy = doc.takenBy;
      return bookDto;
    });
    return bookDto;
  }
}
