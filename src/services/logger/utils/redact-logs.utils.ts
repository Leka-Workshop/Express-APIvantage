import { SensitiveKeys } from '../enum/sensitive-keys.enum';
import { SpecialMessages } from '../../../shared/enums/messages/special-messages.enum';

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];

// Used to obscure senstitive information from logs, such as passwords
const redactLogData = (data: any): any => {

  // to avoid calling redact function on native Mongoose/MongoDB model
  // we check if !data.constructor.name.startsWith('model')

  if (typeof data === 'object' && data !== null && !data.constructor.name.startsWith('model')) {
    if (Array.isArray(data)) {
      return data.map(item => redactLogData(item));
    }

    const redactedData: any = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        redactedData[key] = SpecialMessages.Redacted;
      } else {
        // Recursively redact sensitive keys within nested objects
        redactedData[key] = redactLogData(data[key]);
      }
    }

    return redactedData;
  } else {
    return data;
  }
};

export default redactLogData;
