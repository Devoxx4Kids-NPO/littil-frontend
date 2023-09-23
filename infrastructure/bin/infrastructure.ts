#!/usr/bin/env node
import { Fn } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { CertificatesStack, CertificateStackProps } from '../lib/certificates-stack';
import { WebsiteStack, WebsiteStackProps } from '../lib/website-stack';

const app = new cdk.App();

const littilEnvironment: string | undefined = app.node.tryGetContext('environment');
if (!littilEnvironment) {
  throw new Error('Please specify an environment (staging or production)');
}

const crossStackReferenceExportNames = {
  websiteCertificateArn: 'apiCertificateArn',
};

const domains = littilEnvironment === 'staging' ?
  ['staging.littil.org']
  : [
    'littil.org',
    'prod.littil.org',
  ];

const certificateStackProps: CertificateStackProps = {
  env: {
    region: 'us-east-1',
  },
  domains,
  websiteCertificateArnExportName: crossStackReferenceExportNames.websiteCertificateArn,
};
new CertificatesStack(app, 'WebsiteCertificatesStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  littilEnvironment,
  domains,
  certificateArn: 'arn:aws:acm:us-east-1:367915668564:certificate/b0ab5655-f229-4605-a38d-06042c69e07a'//Fn.importValue(crossStackReferenceExportNames.websiteCertificateArn),
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);
