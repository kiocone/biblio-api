export interface IBook {
  id: number;
  coverImageUrl: string | undefined;
  title: string;
  author: string;
  publishedYear: string;
  isbn: string | undefined;
  editorial: string | undefined;
  language: string | undefined;
  description: string | undefined;
  genre: string | undefined;
  availableCopies: number;
  takenBy: string | undefined;
}