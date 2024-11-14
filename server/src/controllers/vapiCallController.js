// src/controllers/callController.js
import client from "../config/vapi.js";
import fs from "fs"
export default class VapiCallController {
  // Start a call
  static async startCall(req, res) {
    try {
      const response = await client.calls.create({assistantId: "68735401-3eb9-463c-bee1-7cb08ae74792"});
      res.status(200).json(response);
    } catch (error) {
      console.error("Error starting call:", error);
      res.status(500).json({ error: "Failed to start call" });
    }
  }
  // List recent calls
  static async listCalls(_req, res) {
    try {
      const response = await client.calls.list();
      res.status(200).json(response);
    } catch (error) {
      console.error("Error listing calls:", error);
      res.status(500).json({ error: "Failed to list calls" });
    }
  }
  // Update a file's metadata
  // Update a file's metadata
  static async updateFile(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // Data to update (e.g., { fileIds: ["newFileId"] })
  
      // Construct the API endpoint URL
      const url = `https://api.vapi.ai/assistant/${id}`;
  
      // Fetch the model from the endpoint for the particular assistant id
      const modelResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const modelData = await modelResponse.json();
  
      // Prepare the request options
      const options = {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "model": {
            "provider": "anyscale",
            "model": modelData.model.model,
            "knowledgeBase": {
              "provider": "canonical",
              "fileIds": updateData.fileIds
            }
          }
        })
      };
  
      // Make the request to the Vapi API to update the file metadata
      const response = await fetch(url, options);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ error: "Failed to update file metadata" });
    }
  }
  // Make a call to the Vapi API to fetch a file by its ID
  static async fetchAssistantById(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      
      const response = await fetch(`https://api.vapi.ai/assistant/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ error: "Failed to fetch file" });
    }
  }
  // Function to fetch a file from the Vapi API
  static async fetchFile(req, res) {
    try {
      
      const response = await fetch(`https://api.vapi.ai/file`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ error: "Failed to fetch file" });
    }
  }
  // Function to upload a file to the Vapi API
  static async uploadFile(req, res) {
    try {
      // Read the file stream
      console.log(req.file);
      
      const fileStream = fs.createReadStream(req.file.path);
  
      // Use the VapiClient to upload the file
      const response = await client.files.create({
        file: fileStream,
        filename: req.file.originalname, // Set your filename here
        contentType: "application/pdf"             // Specify the MIME type
      });
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  }
}
