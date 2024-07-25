// blogdata.ts

export interface Blog {
    id: number;
    title: string;
    content: string;
    categories: string[];
    date: string;
  }
  
  export const blogs: Blog[] = [
    { id: 1, title: 'Web Development Tips', content: 'Tips and tricks for web development to enhance your skills and build efficient web applications.', categories: ['Web Development', 'Programming'], date: 'Monday Jan 20, 2024' },
    { id: 2, title: 'Graphic Design Basics', content: 'An introduction to graphic design principles, tools, and techniques for creating compelling visuals.', categories: ['Graphic Design', 'Art & Design'], date: 'Wednesday Jan 22, 2024' },
    { id: 3, title: 'Data Science Techniques', content: 'Explore various techniques used in data science, including data manipulation, visualization, and statistical analysis.', categories: ['Data Science', 'Technology'], date: 'Friday Jan 24, 2024' },
    { id: 4, title: 'Digital Marketing Strategies', content: 'Learn effective strategies for digital marketing, including SEO, social media, and content marketing.', categories: ['Digital Marketing', 'Business'], date: 'Monday Jan 27, 2024' },
    { id: 5, title: 'Content Writing Guide', content: 'A comprehensive guide to content writing, covering structure, style, and SEO best practices for engaging content.', categories: ['Content Writing', 'Writing', 'Digital Marketing'], date: 'Wednesday Jan 29, 2024' },
    { id: 6, title: 'SEO Best Practices', content: 'Discover the best practices for SEO to improve your website’s visibility and ranking on search engines.', categories: ['SEO', 'Marketing', 'Digital Marketing'], date: 'Friday Jan 31, 2024' },
    { id: 7, title: 'Photography Tips', content: 'Enhance your photography skills with tips on composition, lighting, and editing techniques for stunning photos.', categories: ['Photography', 'Art & Design'], date: 'Monday Feb 3, 2024' },
    { id: 8, title: 'Project Management Skills', content: 'Develop essential project management skills, including planning, execution, and team management to successfully complete projects.', categories: ['Project Management', 'Business'], date: 'Wednesday Feb 5, 2024' },
    { id: 9, title: 'Cybersecurity Basics', content: 'An introduction to cybersecurity, covering fundamental concepts and practices to protect systems and data from threats.', categories: ['Cybersecurity', 'Technology'], date: 'Friday Feb 7, 2024' },
    { id: 10, title: 'Mobile App Development', content: 'A beginner’s guide to mobile app development, including tools, frameworks, and best practices for creating mobile applications.', categories: ['Mobile Development', 'Programming'], date: 'Monday Feb 10, 2024' },
    { id: 11, title: 'UI/UX Design Principles', content: 'Understand the principles of UI/UX design, including user-centered design, usability, and creating intuitive interfaces.', categories: ['UI/UX Design', 'Art & Design'], date: 'Wednesday Feb 12, 2024' },
    { id: 12, title: 'Artificial Intelligence', content: 'Explore the world of artificial intelligence, its applications, and how it’s transforming various industries.', categories: ['AI', 'Technology', 'Machine Learning'], date: 'Friday Feb 14, 2024' },
    { id: 13, title: 'Social Media Marketing', content: 'Learn how to leverage social media platforms for marketing, including strategies for engagement and growth.', categories: ['Social Media', 'Marketing', 'Digital Marketing'], date: 'Monday Feb 17, 2024' },
    { id: 14, title: 'Finance for Entrepreneurs', content: 'Financial tips and strategies for entrepreneurs to manage and grow their business effectively.', categories: ['Finance', 'Business'], date: 'Wednesday Feb 19, 2024' },
    { id: 15, title: 'Creative Writing Tips', content: 'Improve your creative writing skills with tips on storytelling, character development, and writing techniques.', categories: ['Creative Writing', 'Writing'], date: 'Friday Feb 21, 2024' },
    { id: 16, title: 'Machine Learning Basics', content: 'Get started with machine learning, including algorithms, tools, and techniques to build predictive models.', categories: ['Machine Learning', 'Technology'], date: 'Monday Feb 24, 2024' },
    { id: 17, title: 'Public Speaking Skills', content: 'Enhance your public speaking skills with tips on delivery, audience engagement, and overcoming stage fright.', categories: ['Public Speaking', 'Communication'], date: 'Wednesday Feb 26, 2024' },
    { id: 18, title: 'E-commerce Strategies', content: 'Effective strategies for running a successful e-commerce business, including marketing, customer service, and technology.', categories: ['E-commerce', 'Business'], date: 'Friday Feb 28, 2024' },
    { id: 19, title: 'Video Editing Techniques', content: 'Techniques for editing videos, including software tips, editing workflows, and creating professional-quality content.', categories: ['Video Editing', 'Art & Design'], date: 'Monday Mar 2, 2024' },
    { id: 20, title: 'Python Programming', content: 'A guide to getting started with Python programming, including basics, libraries, and applications.', categories: ['Python', 'Programming'], date: 'Wednesday Mar 4, 2024' }
    // Add more blogs as needed
  ];
  