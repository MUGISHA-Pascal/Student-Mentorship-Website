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
  
  export type ImageOption = {
    value: string;
    label: string;
    preview: string;
  };
  
  export type UploadedImage = {
    file: File;
    preview: string;
    name: string;
  };