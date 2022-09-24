#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { CertificateStack } from '../lib/certificate-stack';
import { WebsiteStack, WebsiteStackProps } from '../lib/website-stack';

const app = new cdk.App();

const certificateStackProps = {
  env: {
    region: 'us-east-1',
  },
};
const certificateStack = new CertificateStack(app, 'CertificateStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'us-west-1',
  },
  certificate: certificateStack.certificate,
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);
