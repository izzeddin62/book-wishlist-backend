export type BookProperties = {
  id: number
  title: string,
  author: string,
  owner: number,
  description: string,
  genres: string[],
  imageUrl: string | null,
  done: boolean
};

export class Book {
  id: number;
  title: string;
  author: string;
  owner: number;
  description: string;
  genres: string[];
  imageUrl: string | null;
  done: boolean;
  constructor(data: BookProperties) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.owner = data.owner;
    this.description = data.description;
    this.genres = data.genres;
    this.imageUrl = data.imageUrl;
    this.done = data.done;
  }

  getBookProperties(): BookProperties {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      owner: this.owner,
      description: this.description,
      genres: this.genres,
      imageUrl: this.imageUrl,
      done: this.done
    };
  }
}
