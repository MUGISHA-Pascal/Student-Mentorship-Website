export interface Blog {
    id: string;
    title: string;
    slug: string;
    description: string;
    writer: string;
    dateCreated: string;
    image?: string;
    category?: string;
    isNew?: boolean;
  }
  