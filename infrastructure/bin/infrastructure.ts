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
new CertificateStack(app, 'CertificateStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  certificateArn: 'arn:aws:acm:us-east-1:680278545709:certificate/db1f2a30-9a52-4bf3-9595-c522d68c215d',
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);
