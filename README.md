# Stock App

Stock App is a comprehensive full-stack web application designed to simplify and streamline inventory management for businesses of all sizes. The project includes both frontend and backend components, providing a user-friendly interface and a robust set of features.

## Frontend

### Description

The frontend of Stock App is built using React and incorporates various libraries for enhanced functionality and aesthetics. It includes features such as a responsive dashboard, purchase and sales tracking, management of supplier firms and product brands, and a user authentication system. Additionally, the project implements dark mode, a Categories page, and an account menu for users to manage their information.

### Usage

The frontend is designed to simplify inventory management. Users can log in to access the dashboard, track and record product transactions, manage product-related data, and monitor overall business performance.

### Project GIF

![Project Snapshot](/assets/stockapp.gif)

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A React UI framework for creating responsive designs.
- **Redux**: A state management library to efficiently manage application data.
- **Axios**: A library for making HTTP requests.
- **Formik and Yup**: Used for form creation and validation.
- **Toastify**: Enhances user experience with notifications.
- **Custom Hooks**: Created for encapsulating logic and enhancing code reusability.
- **Google Firebase**: Used for Google login integration.
- **Redux-Persist**: Manages user and token data persistence.
- **Mui Data-Grid**: Enables data table functionality with update, delete, and edit capabilities.
- **Responsive Drawer:** Utilizes Material-UI to create a responsive sidebar menu.
- **Rechart Structure:** Utilizes the Rechart library for data visualization.

### Contributing

Contributions to the project are welcome. If you have suggestions or improvements, feel free to contribute to the development.

### Demo

Access the live demo of the project [here](https://stockapp-green.vercel.app/).

### Contact

If you have questions or suggestions, please feel free to reach out:

- [LinkedIn Profile](https://www.linkedin.com/in/imoguz)
- [Email Address](mailto:imoguz0510@gmail.com)

## Backend (StockAPI)

### Description

StockAPI is the backend component of Stock App, providing a robust API for managing inventory-related data. Built with MongoDB, Mongoose, and Express, it includes models for Brand, Category, Firm, Purchase, Sale, and a specialized user model for Google login integration. The backend supports advanced querying, JWT for authentication, Nodemailer for email services, and a logger for efficient log management.

### Features

- **Models:**

  - Brand
  - Category
  - Firm
  - Purchase
  - Sale
  - User (Google login integration)

- **Technologies:**

  - MongoDB and Mongoose
  - Express
  - JWT (JSON Web Tokens)
  - Nodemailer
  - Logger

- **Advanced Querying:**
  The API supports advanced querying for efficient data retrieval.

- **Documentation:**
  - Swagger
  - ReDoc
  - JSON

### Technologies Used

#### MongoDB and Mongoose

MongoDB serves as the database, and Mongoose is used as the ODM for Node.js and MongoDB.

#### Express

Express is the web application framework used to build scalable APIs.

#### JWT (JSON Web Tokens)

JSON Web Tokens are employed for secure user authentication and authorization.

#### Nodemailer

Nodemailer is integrated for email services, allowing the application to send emails for various functionalities.

#### Logger

A logging mechanism is implemented using a logger for effective log management.

### Models

- **Brand:** Represents a brand in the stock management system.
- **Category:** Represents a category for organizing products.
- **Firm:** Represents a firm or company related to the stock.
- **Purchase:** Tracks information about stock purchases.
- **Sale:** Tracks information about stock sales.
- **User:** Includes a specialized user model for Google login integration.

### Authentication

The project uses JSON Web Tokens (JWT) for user authentication and authorization. The user model is extended to support Google login.

### Advanced Querying

The API supports advanced querying for efficient data retrieval.

### API Documentation

Explore the API documentation in various formats:

- [Swagger](#swagger)
- [ReDoc](#redoc)
- [JSON](#json)

Feel free to clone the repository and customize the project according to your requirements.
