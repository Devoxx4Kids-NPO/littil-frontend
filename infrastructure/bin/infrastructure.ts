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
new CertificatesStack(app, 'WebsiteCertificatesStack', certificateStackProps);

const websiteStackProps: WebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  // Hard code certificate ARN, because we can't create certificates dynamically in the same stack (certs need to be in us-east-1 region)
  certificateArn: 'arn:aws:acm:us-east-1:680278545709:certificate/b3627a31-8c1f-4d6a-a7aa-eeb6678d8a3f',
};
new WebsiteStack(app, 'WebsiteStack', websiteStackProps);

const demoWebsiteStackProps: DemoWebsiteStackProps = {
  env: {
    region: 'eu-west-1',
  },
  demoCertificateArn: 'arn:aws:acm:us-east-1:680278545709:certificate/a34331bc-0447-4dba-b7e2-228199227048',
};
new DemoWebsiteStack(app, 'DemoWebsiteStack', demoWebsiteStackProps);
