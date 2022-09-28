import * as cdk from 'aws-cdk-lib';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, Distribution, PriceClass, ViewerProtocolPolicy, } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { cloudfrontSpaErrorResponses } from "./cloudfront-spa-error-responses";

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

    const distribution = new Distribution(this, 'WebsiteCloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(siteBucket),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: cloudfrontSpaErrorResponses,
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
