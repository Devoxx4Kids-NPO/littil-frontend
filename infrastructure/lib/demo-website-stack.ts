import * as cdk from "aws-cdk-lib";
import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AllowedMethods, Distribution, PriceClass, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { cloudfrontSpaErrorResponses } from "./cloudfront-spa-error-responses";

export interface DemoWebsiteStackProps extends cdk.StackProps {
  demoCertificateArn: string;
}

export class DemoWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DemoWebsiteStackProps) {
    super(scope, id, props);

    /* Demo website. */
    const demoSiteBucket = new Bucket(this, 'DemoWebsiteS3Bucket', {
      bucketName: 'littil-acc-website-demo',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const demoDistribution = new Distribution(this, 'DemoWebsiteCloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(demoSiteBucket),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: cloudfrontSpaErrorResponses,
      // Price class 100: USA, Canada, Europe, & Israel
      priceClass: PriceClass.PRICE_CLASS_100,
      defaultRootObject: 'index.html',
      domainNames: [
        'demo.littil.org',
      ],
      certificate: Certificate.fromCertificateArn(this, 'Certificate', props.demoCertificateArn),
    });

    new CfnOutput(this, 'DemoCloudfrontDistributionId', {value: demoDistribution.distributionId});
    new CfnOutput(this, 'DemoCloudfrontDomainName', {value: demoDistribution.domainName});
  }
}
