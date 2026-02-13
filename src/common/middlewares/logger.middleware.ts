import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

const logger = new Logger('HTTP');

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { method, originalUrl } = req;

  logger.log(`[START] - [${method}] - [${originalUrl}]`);

  const start = Date.now(); // Lấy thời điểm bắt đầu

  // Lắng nghe sự kiện khi phản hồi đã được gửi xong
  res.on('finish', () => {
    const { statusCode } = res;
    const duration = Date.now() - start; // Tính toán độ trễ

    logger.log(
      `[END] - [${method}] - [${originalUrl}] - [${statusCode}] - [${duration}ms]`,
    );
  });

  next();
}
