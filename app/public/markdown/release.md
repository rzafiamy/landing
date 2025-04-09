# Release Notes for MAKIX AI Chatbot v1.1 🚀

## Introduction
Welcome to the release notes for MAKIX AI Chatbot version 1.1. This update brings significant improvements in scalability, infrastructure, and performance, making the application ready for large-scale deployment and production use 🌟.

## Major Updates

### **1. Scalability and Deployment** 📈

- **Multi-Instance Deployment**: The application can now be deployed with multiple instances, allowing for horizontal scaling. This is achieved through Dockerization, enabling easy deployment on one, two, three, four, five, or even hundreds of servers 🖥️.
- **Ease of Deployment**: The deployment process is simplified with `git clone` and `docker-compose up`, ensuring a seamless setup 🔧.
- **Separation of Logic**: The application has been modularized into distinct servers for different functionalities:
  - **Inference Server**: Handles the core AI processing 🧠.
  - **Tools Server**: Manages various tools and utilities 🛠️.
  - **Database Server**: Manages all database operations 🗄️.
- **Instance Duplication**: This modular approach allows for easy duplication of instances, enhancing scalability and reliability 🔄.

### **2. File Storage and Management** 🗄️

- **Open-Source Storage**: User files are now stored in Minio, an open-source storage solution equivalent to Amazon S3. This ensures scalability and reliability for mass deployment 🌐.
- **Known Issue**: There is a minor bug in the generation of images on mobile devices. Our team is actively working on resolving this issue 📱.

### **3. Performance Improvements** 🏋️

- **VRAM Management**: Significant efforts have been made to optimize VRAM usage on the server side, which will be beneficial for production environments, ensuring smoother and more efficient operations 💻.

## Conclusion

Version 1.1 of the MAKIX AI Chatbot is a major step forward in terms of scalability, performance, and readiness for production. With these updates, the application is now better equipped to handle large-scale deployments and provide a robust, reliable service 🎉.