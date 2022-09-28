#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { CertificatesStack } from '../lib/certificates-stack';
import { WebsiteStack, WebsiteStackProps } from '../lib/website-stack';
import { DemoWebsiteStack, DemoWebsiteStackProps } from "../lib/demo-website-stack";

const app = new cdk.App();

const certificateStackProps = {
  env: {
    region: 'us-east-1',
  },
};
new CertificatesStack(app, 'CertificatesStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  certificateArn: 'arn:aws:acm:us-east-1:680278545709:certificate/4609da7e-e70b-4ff8-98dd-d05d18a190ea',
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);

const demoWebsiteStackProps: DemoWebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  demoCertificateArn: 'arn:aws:acm:us-east-1:680278545709:certificate/19e577c6-e75c-48f2-ad51-0296b95578b3',
};
new DemoWebsiteStack(app, 'DemoWebsiteStack', demoWebsiteStackProps);
