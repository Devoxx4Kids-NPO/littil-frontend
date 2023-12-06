import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CertificatesStack } from '../lib/certificates-stack';
import { WebsiteStack } from '../lib/website-stack';

test('S3 bucket and Cloudfront distribution created', () => {
  const app = new cdk.App();

  const certProps = {
    env: {
      region: 'us-east-1',
    },
    crossRegionReferences: true,
    domains: ['local.littil.org'],
  };
  const certificateStack = new CertificatesStack(app, 'CertificateStack', certProps);

  // WHEN
  const props = {
    env: {
      region: 'eu-west-1',
    },
    crossRegionReferences: true,
    littilEnvironment: 'test',
    domains: ['local.littil.org'],
    certificate: certificateStack.certificate,
  };
  const stack = new WebsiteStack(app, 'WebsiteStack', props);

  // THEN
  const template = Template.fromStack(stack);

  template
    .hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'littil-test-website',
    });

  template
    .hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [
          'local.littil.org',
        ],
      },
    });
});
