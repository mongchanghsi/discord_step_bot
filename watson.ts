import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

const api_key: string = process.env.API_KEY || '';
const service_url: string = process.env.SERVICE_URL || '';
const assistant_id: string = process.env.ASSISTANT_ID || '';

const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: new IamAuthenticator({ apikey: api_key }),
  serviceUrl: service_url,
  disableSslVerification: true,
});

let text: string = ''; // response text from watson assistant

const getMessage = async (req: string, sessionId: string): Promise<string> => {
  try {
    const res = await assistant.message({
      input: { message_type: 'text', text: req },
      assistantId: assistant_id,
      sessionId,
    });
    if (!res || !res.result || !res.result.output || !res.result.output.generic)
      return 'Error';
    // We can filter into the intent via res.result.output.intents.intent
    let temp: any = res.result.output.generic[0];
    // Assuming that accurately gotten result, no suggestions
    text = JSON.stringify(temp.text);
    return text;
  } catch (error) {
    console.log('unsuccessful call');
    console.log(error);
    return 'Error in getMessage';
  }
};

export const callAssistant = async (req: string): Promise<string> => {
  try {
    const sessionId = (
      await assistant.createSession({ assistantId: assistant_id })
    ).result.session_id;
    const responseText: string = await getMessage(req, sessionId);
    return responseText;
  } catch (error) {
    console.log(error);
    return 'Error in callAssistant';
  }
};
