import { HTTPMethods } from '../../../shared/enums/http/http-methods.enum';
import { ErrorMessages } from '../../../shared/enums/messages/error-messages.enum';
import { SuccessMessages } from '../../../shared/enums/messages/success-messages.enum';

// Returns Generic HTTP Successful messages
export const getSuccessfulHTTPResponseMessage = (responseMethod: HTTPMethods): string => {
  switch (responseMethod) {
    case HTTPMethods.POST:
      return SuccessMessages.CreateSuccess;
    case HTTPMethods.GET:
      return SuccessMessages.GetSuccess;
    case HTTPMethods.PUT || HTTPMethods.PATCH:
      return SuccessMessages.UpdateSuccess;
    case HTTPMethods.DELETE:
      return SuccessMessages.DeleteSuccess;
    default:
      return SuccessMessages.GenericSuccess;
  }
}

// Returns Generic HTTP Failed messages
export const getUnSuccessfulHTTPResponseMessage = (responseMethod: HTTPMethods): string => {
  switch (responseMethod) {
    case HTTPMethods.POST:
      return ErrorMessages.CreateFail;
    case HTTPMethods.GET:
      return ErrorMessages.GetFail;
    case HTTPMethods.PUT || HTTPMethods.PATCH:
      return ErrorMessages.UpdateFail;
    case HTTPMethods.DELETE:
      return ErrorMessages.DeleteFail;
    default:
      return ErrorMessages.Generic;
  }
}
