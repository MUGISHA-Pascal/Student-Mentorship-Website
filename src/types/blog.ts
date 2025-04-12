export interface Blog {
    // id: string;
    // title: string;
    // slug: string;
    // description: string;
    // writer: string;
    // dateCreated: string;
    // image?: string;
    // category?: string;
    // isNew?: boolean;
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    dateCreated: string;
    image?: string;
    isNew?: boolean;
    userId: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
    };
  }

//   export interface Blogg {
//     id: string;
//     title: string;
//     slug: string;
//     description: string;
//     category: string;
//     dateCreated: string;
//     image?: string;
//     isNew?: boolean;
//     userId: string;
//     user: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         role: string;
//     };
// }
  
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