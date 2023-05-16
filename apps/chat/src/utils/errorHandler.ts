import { EventFile } from '@inc/types';

const handleError = (err: any) => {
  console.error('please handle me', err);
};

/**
 * Socket IO error handler wrapper
 */
const errorHandler = <T extends ReturnType<EventFile>['callback']>(event: T) => {
  return (param: any) => {
    try {
      console.log('run');
      event(param);
    } catch (error) {
      console.log('sync error caught');
      console.log({ error });
      handleError(error);
    }
  };
};

export default errorHandler;
