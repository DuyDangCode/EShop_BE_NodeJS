# EShop Backend (Node.js)

## Overview
**EShop Backend NodeJS** is a backend service for an e-commerce platform specializing in electronic products. This project provides a robust and scalable API for managing users, products, carts, vouchers, and orders. It is designed to handle high concurrent purchases efficiently and includes various essential functionalities to enhance the e-commerce experience.

## Features
- **CRUD Operations**: Manage users, products, carts, vouchers, and orders.
- **High Concurrent Purchase Handling**: Implements pessimistic locking using Redis to prevent conflicts in simultaneous purchases.
- **Product Search**: Utilizes MongoDB's text indexing for efficient product search.
- **Image Uploading**: Integrates with Cloudinary for image storage and management.
- **Logging System**: Implements Winston for structured logging and monitoring.

## Tech Stack
- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Caching & Locking**: Redis
- **File Storage**: Cloudinary
- **Logging**: Winston

## API Documentation
Explore the full API documentation in Postman: [EShop API Documentation](https://documenter.getpostman.com/view/26918732/2sA3JGf3wq)

## Getting Started
### Clone the repository
```sh
git clone https://github.com/DuyDangCode/EShop_BE_NodeJS.git
```

### Install dependencies
```sh
npm install
```

### Start the server
```sh
npm run start
```

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact ndt.duy.dev@gmail.com.

