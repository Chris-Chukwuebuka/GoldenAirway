# Golden Airways Courier

## Overview

Golden Airways Courier is a logistics management system designed for tracking and managing parcels. The system includes functionalities for creating parcels, updating parcel statuses, retrieving parcel status, and viewing all parcels.

## Features

- Create a new parcel
- Update parcel status
- Retrieve parcel status by tracking number
- Get a list of all parcels

## Technologies Used

- **Backend**: Node.js, Express, Mongoose
- **Frontend**: React.js, Redux Toolkit, Axios
- **Styling**: Bootstrap, Tailwind CSS
- **Animations**: Framer Motion
- **Chatbot**: Tidio
- **Email Service**: Custom email service

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/golden-airways-courier.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd golden-airways-courier
    ```

3. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

4. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

5. **Set up environment variables:**

    Create a `.env` file in both the `backend` and `frontend` directories and add your environment variables. For example:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE_API_KEY=your_email_service_api_key
    ```

6. **Start the backend server:**

    ```bash
    cd ../backend
    npm start
    ```

7. **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

## Usage

- **Create a Parcel:** Navigate to the admin dashboard and use the "Create Parcel" form.
- **Update Parcel Status:** Use the update button on the admin dashboard to change the status of a parcel.
- **Track Parcel:** Use the tracking feature on the user side to view parcel status.

## API Endpoints

- **POST /api/admin/parcels** - Create a new parcel
- **PUT /api/admin/parcels/:id/status** - Update parcel status by ID
- **GET /api/parcels/:trackingNumber** - Get parcel status by tracking number
- **GET /api/parcels** - Get a list of all parcels

## Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes. For more detailed instructions, refer to our [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact us at [support@yourcompany.com](mailto:support@yourcompany.com).
