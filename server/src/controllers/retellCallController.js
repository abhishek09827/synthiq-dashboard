import retellClient from '../config/retell.js';

import { supabase } from '../config/supabaseClient.js';
import CallService from '../services/callService.js';
const RetellCallController = {
  // Fetch and update calls from Retell
  async fetchAndUpdateCalls(req, res) {
    try {
      // Fetch calls from external API
      const userId = req.auth.id;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      const { data: user, error: userError } = await supabase.from('users').select('agent_id').eq('id', userId).single();
      if (userError) {
        return res.status(500).json({ error: 'Error fetching user token', details: userError.message });
      }
      if (!user || !user.agent_id) {
        return res.status(403).json({ error: 'Unauthorized: No token found for user' });
      }
      const response = await retellClient.call.list({agent_id : user.agent_id});
      
      const calls = response;
      let maxUpdatedAt = await CallService.maxUpdatedAtRetell(req.auth.id);
      let filteredCalls;
  
      if (maxUpdatedAt && !isNaN(Date.parse(maxUpdatedAt))) {
        // Compare the first call's endedAt with maxUpdatedAt
        const firstCallEndedAt = new Date(calls[0].end_timestamp);
        const maxUpdatedAtDate = new Date(maxUpdatedAt);
        if (firstCallEndedAt > maxUpdatedAtDate) {
          filteredCalls = calls.filter(call => call.end_timestamp > maxUpdatedAt).map(call => ({
            call_type:call.call_type,
            
          access_token: call.access_token,
            call_id:call.call_id,
            agent_id:call.agent_id,
            call_status:call.call_status,
            metadata:call.metadata,
            retell_llm_dynamic_variables:call.retell_llm_dynamic_variables,
            opt_out_sensitive_data_storage:call.opt_out_sensitive_data_storage,
            start_timestamp:call.start_timestamp,
            end_timestamp:call.end_timestamp,
            transcript:call.transcript,
            transcript_object:call.transcript_object,
            transcript_with_tool_calls:call.transcript_with_tool_calls,
            recording_url:call.recording_url,
            public_log_url:call.public_log_url,
            e2e_latency:call.e2e_latency,
            llm_latency:call.llm_latency,
            llm_websocket_network_rtt_latency:call.llm_websocket_network_rtt_latency,
            disconnection_reason:call.disconnection_reason,
            call_analysis:call.call_analysis,
            call_cost: call.call_cost !== undefined ? call.call_cost : null,
            user_id: userId
          }));
        } else {
          // If maxUpdatedAt is after the first call's endedAt, do not upsert
          return res.status(200).json({ message: 'No new calls to update.' });
        }
      } else {
        filteredCalls = calls.map(call => ({
          call_type:call.call_type,
          access_token: call.access_token,
            call_id:call.call_id,
            agent_id:call.agent_id,
            call_status:call.call_status,
            metadata:call.metadata,
            retell_llm_dynamic_variables:call.retell_llm_dynamic_variables,
            opt_out_sensitive_data_storage:call.opt_out_sensitive_data_storage,
            start_timestamp:call.start_timestamp,
            end_timestamp:call.end_timestamp,
            transcript:call.transcript,
            transcript_object:call.transcript_object,
            transcript_with_tool_calls:call.transcript_with_tool_calls,
            recording_url:call.recording_url,
            public_log_url:call.public_log_url,
            e2e_latency:call.e2e_latency,
            llm_latency:call.llm_latency,
            llm_websocket_network_rtt_latency:call.llm_websocket_network_rtt_latency,
            disconnection_reason:call.disconnection_reason,
            call_analysis:call.call_analysis,
            call_cost: call.call_cost !== undefined ? call.call_cost : null,
    user_id: userId
        }));
      }
      // Pass calls to service for Supabase upsert operation

      await CallService.upsertCallsRetell(filteredCalls);
  
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
      const calls = await retellClient.call.list({agent_id : id});
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
