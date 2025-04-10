import { Blog } from "../types/blog";

export const blogs: Blog[] = [
    {
        id: "1",
        title: "Upgrading Our Platform for a Better Experience",
        slug: "upgrading-our-platform-for-a-better-experience",
        description: `
**Welcome to the future!**

We are thrilled to announce major upgrades to our platform. These changes are designed to **enhance your experience**, making it faster, more reliable, and easier to navigate.

Here's what's new:
- **Modern Interface**: Enjoy a cleaner, more intuitive design.
- **Faster Access**: Improved speed across all devices.
- **Seamless Navigation**: Find what you need, effortlessly.

We are committed to **continuous improvement** and your feedback is always welcome!

Thank you for being part of our journey. 🚀
    `,
        writer: "Irembo Team",
        dateCreated: "2025-01-10",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        category: "Platform Updates",
        isNew: true,
    },
    {
        id: "2",
        title: "Introducing Our New Mobile App",
        slug: "introducing-our-new-mobile-app",
        description: `
**Experience the power of mobility!**

Today marks a significant milestone as we launch our new mobile application. Designed with **user experience** at its core, our app brings all the functionality of our platform right to your fingertips.

## Key Features

- **Instant Notifications**: Stay updated with real-time alerts.
- **Offline Mode**: Access key features even without internet connectivity.
- **Biometric Authentication**: Enhanced security with fingerprint and face recognition.
- **Streamlined Processes**: Complete tasks in fewer steps than ever before.

## User Feedback

During our beta testing phase, users reported a **94% satisfaction rate**, with particular praise for the intuitive interface and responsive design.

> "The new app has transformed how I interact with the platform. Everything I need is now just a tap away!" - Sarah K.

We've built this app based on your feedback and are committed to **continuous improvement**. Future updates will bring even more features and refinements.

Download now and experience the difference!
    `,
        writer: "Development Team",
        dateCreated: "2025-01-15",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        category: "Product Launch",
        isNew: true,
    },
    {
        id: "3",
        title: "Security Updates: Keeping Your Data Safe",
        slug: "security-updates-keeping-your-data-safe",
        description: `
**Your security is our priority.**

In an ever-evolving digital landscape, we understand the importance of robust security measures. We're pleased to announce our latest security enhancements designed to **protect your data** and provide peace of mind.

## Recent Enhancements

- **Advanced Encryption**: We've implemented end-to-end encryption across all communications.
- **Two-Factor Authentication**: Added additional verification steps for sensitive operations.
- **Threat Monitoring**: Our new AI-powered system detects and prevents suspicious activities in real-time.
- **Regular Security Audits**: Independent experts review our systems quarterly.

## Best Practices

We recommend all users take the following steps:

1. **Update your password** regularly
2. **Enable two-factor authentication** for your account
3. **Monitor your account activity** for any unauthorized access
4. **Report suspicious emails** or communications immediately

Our dedicated security team works around the clock to ensure your information remains safe. We adhere to international standards and best practices in data protection.

Remember, security is a shared responsibility. Together, we can maintain a secure environment for everyone.
    `,
        writer: "Security Team",
        dateCreated: "2025-01-05",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        category: "Security",
        isNew: false,
    }
];