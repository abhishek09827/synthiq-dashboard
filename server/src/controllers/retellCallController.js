import retellClient from '../config/retell.js';

const RetellCallController = {
  // Fetch and update calls from Retell
  async fetchAndUpdateCalls(req, res) {
    try {
      const userId = req.auth.id;
      const {agent_id} = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const calls = await retellClient.listCalls({agent_id : agent_id});
      if (!calls) {
        return res.status(200).json({ message: 'No new calls to update.' });
      }

      // Pass calls to service for Supabase upsert operation
      await CallService.upsertCalls(calls);

      res.status(200).json({ message: 'Calls fetched and updated successfully.' });
    } catch (error) {
      console.error('Error fetching and updating calls:', error);
      if (error.response && error.response.data) {
        return res.status(500).json({ error: 'Error fetching and updating calls', details: error.response.data.message });
      } else {
        return res.status(500).json({ error: 'Error fetching and updating calls', details: error.message });
      }
    }
  },

  // Get a call
  async getCall(req, res) {
    try {
      const callId = req.params.callId;
      if (!callId) {
        return res.status(400).json({ error: 'Call ID is required' });
      }

      const call = await retellClient.getCall(callId);
      if (!call) {
        return res.status(404).json({ error: 'Call not found' });
      }

      res.status(200).json(call);
    } catch (error) {
      console.error('Error fetching call:', error);
      if (error.response && error.response.data) {
        return res.status(500).json({ error: 'Error fetching call', details: error.response.data.message });
      } else {
        return res.status(500).json({ error: 'Error fetching call', details: error.message });
      }
    }
  },

  // List calls
  async listCalls(req, res) {
    try {
      const {id} = req.body;
      const calls = await retellClient.listCalls({agent_id : id});
      if (!calls) {
        return res.status(200).json({ message: 'No calls found.' });
      }

      res.status(200).json(calls);
    } catch (error) {
      console.error('Error listing calls:', error);
      if (error.response && error.response.data) {
        return res.status(500).json({ error: 'Error listing calls', details: error.response.data.message });
      } else {
        return res.status(500).json({ error: 'Error listing calls', details: error.message });
      }
    }
  },
};

export default RetellCallController;
