export enum ErrorMessages {
  AppStartupFail = 'Unable to start the app!',
  CreateFail = 'Unable to save entry to DB!',
  GetFail = 'Unable to retrieve data from DB!',
  UpdateFail = 'Unable to update data in DB!',
  DeleteFail = 'Unable to delete entry from DB!',
  DuplicateEntryFail = 'User already exists!',
  PasswordMismatchFail = 'Passwords must match!',
  Generic = 'Something went wrong!',
	NotFound = 'Unable to find the requested resource!',
  UncaughtException = 'Uncaught Exception thrown!',
  UnhandledRejection = 'Unhandled Exception thrown!'
}
