import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, Distribution, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, Policy, PolicyStatement, Role, WebIdentityPrincipal } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { cloudfrontSpaErrorResponses } from './cloudfront-spa-error-responses';

export interface WebsiteStackProps extends StackProps {
  littilEnvironment: string;
  certificate: Certificate;
  domains: string[],
}

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const siteBucket = new Bucket(this, 'WebsiteS3Bucket', {
      bucketName: 'littil-' + props.littilEnvironment + '-website',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const websiteConfigBucket = new Bucket(this, 'WebsiteConfigS3Bucket', {
      bucketName: 'littil-' + props.littilEnvironment + '-website-config',
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
      additionalBehaviors: {
        '/config.js': {
          origin: new S3Origin(websiteConfigBucket),
          compress: true,
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        }
      },
      errorResponses: cloudfrontSpaErrorResponses,
      // Price class 100: USA, Canada, Europe, & Israel
      priceClass: PriceClass.PRICE_CLASS_100,
      defaultRootObject: 'index.html',
      domainNames: props.domains,
      certificate: props.certificate,
    });

    /* Sync to S3 statement. */
    const s3Statement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        's3:ListBucket',
        's3:ListObjectsV2',
        's3:PutObject',
        's3:DeleteObject',
        's3:GetBucketLocation',
        's3:GetObject',
      ],
      resources: [
        siteBucket.bucketArn,
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
