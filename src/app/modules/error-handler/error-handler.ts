import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";

export interface SimpleHttpError {
  status: number;
  message: string;
}

export class HttpErrorHandler implements ErrorHandler {
  public handleError(error: HttpErrorResponse): SimpleHttpError {
    switch (error.status) {
      case 500:
        return { status: error.status, message: 'Сервер не доступен, попробуйте перезагрузить страницу.' };
      case 404:
        return { status: error.status, message: 'Запрашиваемая информация не найдена' }
      default:
        return { status: 0, message: 'Неизвестная ошибка' }
    }
  }
}
