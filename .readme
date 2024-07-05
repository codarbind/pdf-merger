# PDF Merger API

This API allows you to merge two PDF files into a single PDF file. It is built using Node.js, Express, and `pdf-lib`.

## Table of Contents

- [PDF Merger API](#pdf-merger-api)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoint](#api-endpoint)
  - [Error Handling](#error-handling)
  - [License](#license)

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)

### Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install the required dependencies:

    ```sh
    npm install
    ```

3. Create the necessary directories:

    ```sh
    mkdir uploads
    ```

## Usage

1. Start the server:

    ```sh
    npm start
    ```

    The server will start running on port 5000 (or the port specified in the environment variable `PORT`).

2. Use a tool like Postman or `curl` to send a POST request to the `/merge` endpoint with two PDF files.

    Example `curl` command:

    ```sh
    curl -F "pdf1=@path/to/your/first.pdf" -F "pdf2=@path/to/your/second.pdf" http://localhost:5000/merge -o merged.pdf
    ```

    This command sends a POST request with two PDF files and saves the merged PDF as `merged.pdf`.

## API Endpoint

### POST /merge

- **Description**: Merges two PDF files into one.
- **Request**: Multipart/form-data with two files.
  - `pdf1`: The first PDF file.
  - `pdf2`: The second PDF file.
- **Response**: 
  - On success: The merged PDF file is returned as a download.
  - On error: A JSON response with an error message.

#### Example Request

```sh
curl -F "pdf1=@path/to/first.pdf" -F "pdf2=@path/to/second.pdf" http://localhost:5000/merge -o merged.pdf
```

## Error Handling

- If exactly two PDF files are not uploaded, the server responds with a 400 status code and a message: "Please upload exactly 2 PDF files."
- If an internal server error occurs, the server responds with a 500 status code and a JSON message: "something went wrong - check all inputs."



