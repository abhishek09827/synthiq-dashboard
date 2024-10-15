# Call Management API

This project is a Call Management API built with Express.js. It provides endpoints to fetch, update, and export call logs.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/abhishek09827/synthiq-trial.git
    ```
2. Navigate to the project directory:
    ```sh
    cd call-analytics
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. The server will be running at `http://localhost:3000`.

## API Routes

### Fetch and Update Calls
- **GET** `/poll`
    - Description: Fetch and update call data.
    - Controller: `CallController.fetchAndUpdateCalls`

### Get Analytics
- **GET** `/analytics`
    - Description: Retrieve call analytics data.
    - Controller: `CallController.getAnalytics`

### Fetch Call Logs
- **GET** `/call-logs`
    - Description: Fetch call logs with filtering and sorting options.
    - Controller: `CallController.getCallLogs`

### Export Call Logs to CSV
- **GET** `/call-logs/export/csv`
    - Description: Export call logs to a CSV file.
    - Controller: `CallController.exportCallLogsCSV`

### Export Call Logs to Excel
- **GET** `/call-logs/export/excel`
    - Description: Export call logs to an Excel file.
    - Controller: `CallController.exportCallLogsExcel`

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
