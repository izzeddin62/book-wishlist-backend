export type BookProperties = {
  id: number
  title: string,
  author: string,
  owner: number,
  description: string,
  genres: string[],
  imageUrl: string | null
};

export class Book {
  id: number;
  title: string;
  author: string;
  owner: number;
  description: string;
  genres: string[];
  imageUrl: string | null;
  constructor(data: BookProperties) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.owner = data.owner;
    this.description = data.description;
    this.genres = data.genres;
    this.imageUrl = data.imageUrl;
  }

  getBookProperties(): BookProperties {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      owner: this.owner,
      description: this.description,
      genres: this.genres,
      imageUrl: this.imageUrl
    };
  }
}
