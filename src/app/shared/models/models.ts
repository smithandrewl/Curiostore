export interface Collection {
    id:          number;
    name:        string;
    description: string;
}

export class Item {
  constructor(
    public id:          number,
    public name:        string,
    public description: string
  ) {}
}
