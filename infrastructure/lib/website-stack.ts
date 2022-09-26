import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  AllowedMethods,
  Distribution,
  ErrorResponse,
  PriceClass,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface WebsiteStackProps extends cdk.StackProps {
  certificateArn: string;
}

export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const siteBucket = new Bucket(this, 'WebsiteS3Bucket', {
      bucketName: 'littil-acc-website',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /* Error responses for SPA (Angular). */
    const errorResponses: ErrorResponse[] = [
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

    const distribution = new Distribution(this, 'WebsiteCloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(siteBucket),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses,
      // Price class 100: USA, Canada, Europe, & Israel
      priceClass: PriceClass.PRICE_CLASS_100,
      defaultRootObject: 'index.html',
      domainNames: [
        'acc.littil.org',
      ],
      certificate: Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
    });

    new CfnOutput(this, 'CloudfrontDistributionId', {value: distribution.distributionId});
    new CfnOutput(this, 'CloudfrontDomainName', {value: distribution.domainName});
  }
}
