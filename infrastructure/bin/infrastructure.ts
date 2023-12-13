#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CertificatesStack, CertificateStackProps } from '../lib/certificates-stack';
import { WebsiteStack, WebsiteStackProps } from '../lib/website-stack';

const app = new cdk.App();

const littilEnvironment: string | undefined = app.node.tryGetContext('environment');
if (!littilEnvironment) {
  throw new Error('Please specify an environment (staging or production)');
}

const domainConfig = littilEnvironment === 'staging' ?
  {
    certificates: ['staging.littil.org'],
    availableAt: ['staging.littil.org'],
  }
  : {
    certificates: [
      'littil.org',
      'www.littil.org',
      'prod.littil.org',
    ],
    availableAt: [
      'www.littil.org'
    ],
  };

const certificateStackProps: CertificateStackProps = {
  env: {
    region: 'us-east-1',
  },
  crossRegionReferences: true,
  domains: domainConfig.certificates,
};
const certificateStack = new CertificatesStack(app, 'WebsiteCertificatesStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  crossRegionReferences: true,
  littilEnvironment,
  domains: domainConfig.availableAt,
  certificate: certificateStack.certificate,
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);
