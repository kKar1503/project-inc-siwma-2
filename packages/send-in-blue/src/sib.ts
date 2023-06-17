import SibApiV3Sdk from 'sib-api-v3-sdk';

const sibClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = sibClient.authentications['api-key'];

export function changeAPIKey(key: string) {
  apiKey.apiKey = key;
}

export default SibApiV3Sdk;
