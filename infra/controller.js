import { InternalServerError, MethodNotAllowed } from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicObjectError = new MethodNotAllowed();
  response.status(publicObjectError.statusCode).json(publicObjectError);
}

function onErrorHandler(error, request, response) {
  const publicObjectError = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.log(publicObjectError);

  response.status(publicObjectError.statusCode).json(publicObjectError);
}

const controller = {
  errorHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHandler,
  },
};

export default controller;
