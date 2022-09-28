import { ErrorResponse } from "aws-cdk-lib/aws-cloudfront";
import { Duration } from "aws-cdk-lib";

/* Error responses for SPA (Angular). */
export const cloudfrontSpaErrorResponses: ErrorResponse[] = [
  {
    httpStatus: 404,
    ttl: Duration.seconds(10),
    responseHttpStatus: 200,
    responsePagePath: '/index.html',
  },
  {
    httpStatus: 403,
    ttl: Duration.seconds(10),
    responseHttpStatus: 200,
    responsePagePath: '/index.html',
  },
];
