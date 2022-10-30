import * as cdk from 'aws-cdk-lib';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  AllowedMethods,
  Distribution,
  PriceClass,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  Effect,
  OpenIdConnectProvider,
  Policy,
  PolicyStatement,
  Role,
  WebIdentityPrincipal,
} from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { cloudfrontSpaErrorResponses } from './cloudfront-spa-error-responses';

export interface WebsiteStackProps extends cdk.StackProps {
  certificateArn: string;
}

export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const siteBucket = new Bucket(this, 'WebsiteS3Bucket', {
      bucketName: 'littil-staging-website',
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
        'staging.littil.org',
      ],
      certificate: Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
    });

    new CfnOutput(this, 'CloudfrontDistributionId', {value: distribution.distributionId});
    new CfnOutput(this, 'CloudfrontDomainName', {value: distribution.domainName});

    /* Publish to S3 statement. */
    const s3Statement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        's3:PutObject',
      ],
      resources: [
        siteBucket.bucketArn + '/*',
      ],
    });

    /* Invalidate Cloudfront distribution statement. */
    const cloudfrontStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'cloudfront:CreateInvalidation',
      ],
      resources: [
        'arn:aws:cloudfront::*:distribution/' + distribution.distributionId,
      ],
    });

    const accountId = this.account;
    const issuer = 'token.actions.githubusercontent.com';
    const gitHubOrg = 'Devoxx4Kids-NPO';
    const githubRepoName = 'littil-frontend';
    const openIdConnectProviderArn = `arn:aws:iam::${accountId}:oidc-provider/${issuer}`;

    const deploymentRole = new Role(this, 'WebsiteDeploymentRole', {
      roleName: 'LITTIL-NL-staging-website-deploy',
      assumedBy: new WebIdentityPrincipal(openIdConnectProviderArn, {
        StringLike: {
          [`${issuer}:sub`]: `repo:${gitHubOrg}/${githubRepoName}:*`,
        },
        StringEquals: {
          [`${issuer}:aud`]: 'sts.amazonaws.com',
        },
      }),
    });

    const publishWebsitePolicy = new Policy(this, 'LITTIL-NL-staging-publish-policy');
    publishWebsitePolicy.addStatements(s3Statement, cloudfrontStatement);
    publishWebsitePolicy.attachToRole(deploymentRole);
  }
}
