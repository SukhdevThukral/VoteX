# **Online Voting System**

Welcome to the Online Voting System, a cutting-edge application facilitating secure and anonymous voting for the Lok Sabha Elections. *[Link to the website](https://sukhdevthukral.github.io/online-voting/sign-up.html)*

## Overview

This application securely collects and encrypts Aadhaar and PAN card details, saving them as hashed values in the cloud. Our system ensures the confidentiality and integrity of the voting process using modern web technologies and advanced security measures.

## ⚠ Caution
This project aims to enhance voting transparency by restricting database access to authorized admins with specific credentials. It ensures secure and reliable voting for organizations like corporations, NGOs, schools, and administrative bodies. The project is currently in the prototype/experimental phase. Currently, I have used three dummy Aadhaar cards (`123456789012` , `987654321098` and `987654321099`) and a few dummy PAN card numbers (`ABC1234567` , `XYZ9876543` and `"XYZ9876546`) for demonstration purposes only. In a production environment, this setup will be replaced by a secure database designed to handle credentials from multiple organizations.The program collect and encrypt crucial credentials, which are only decrypted in the backend. *This process ensures the identities of users are matched with their hashed votes after registration.*

Voters use these credentials to cast their votes for various parties. The votes are hashed with SHA-256 and stored on Firebase, ensuring anonymity and preventing any disclosure of individual voting preferences. _Our goal is to develop a system where only the application can use these tamper-proof hashes to count votes for each party accurately._

Inspired by the Lok Sabha elections in India, the project features a voting theme that covers different political parties.

## 📝 Note

I have been actively enhancing the project with plans to transition to a blockchain-based system for greater security and transparency. Additionally, I aim to introduce a custom voting page builder, allowing organizations to tailor their voting interfaces to their specific needs.

_**Note:** While blockchain technology is not yet implemented, I continue working towards a complete shift to enhance the security and reliability of the voting system._

![Logo](https://i.postimg.cc/c1tdQg7W/votex.png)

## 🛠 Tech Stack

Our project utilizes a range of modern web technologies to deliver a simple yet powerful application:

- **HTML**: Provides the foundational structure of the application.
- **CSS**: Enhances the visual appeal with styling.
- **JavaScript**: Adds interactivity and dynamic functionality.
- **Firebase**: Manages authentication and securely stores data in the cloud.
- **CryptoJS**: Handles data encryption and ensures secure information management.

The project is designed for simplicity while offering a smooth and effective user experience.

## Features

- **SHA-256 Hashing**: Ensures secure and immutable data hashing, maintaining integrity.
- **Encryption and Decryption**: Protects sensitive information with encryption and allows secure decryption.
- **Firebase Integration**: Provides robust authentication and secure data storage.
- **Interactive User Interface**: Built with HTML, CSS, and JavaScript to offer an engaging experience.

## 📷 Screenshots

![App Screenshot](https://i.postimg.cc/MKyxFCrr/Screenshot-2024-08-27-223939.png)
![App Screenshot](https://i.postimg.cc/PrGTKXKw/Screenshot-2024-08-27-223954.png)
![App Screenshot](https://i.postimg.cc/Vvt11psv/Screenshot-2024-08-27-224011.png)

## Roadmap

### **Current Phase**
- **Demonstration Setup**: Using sample Aadhaar and PAN card numbers.
- **Basic Functionality**: Collecting, encrypting, and hashing votes with SHA-256.

### **Upcoming Features**
- **Secure Database Integration**: Upgrade to a secure database for credential management.
- **Blockchain Transition**: Implement a blockchain system for enhanced security and transparency.

### **Future Enhancements**
- **Custom Voting Page Builder**: Develop a tool for creating customizable voting interfaces.
- **Enhanced Security Features**: Add advanced security measures and refine encryption.

### **Long-Term Goals**
- **Full Blockchain Integration**: Complete transition to blockchain for improved security.
- **Scalability and Performance Optimization**: Enhance the system to handle larger datasets and users efficiently.

Stay tuned for updates as we continue to improve and expand this project!

## 📝 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🚀 About Me

Hi, I'm Sukhdev Thukral, a high school junior passionate about full stack web development, Python, AI, and ML. I created this project as a fun and engaging way to explore and apply my skills in a real-world context.

I'm always on the lookout for new challenges and opportunities to learn. This project reflects my love for technology and practical application. Feel free to reach out if you want to discuss web development, AI, or ML!

## Feedback

For any feedback or inquiries, please contact me at [sukhdev.steam@gmail.com](mailto:sukhdev.steam@gmail.com).
