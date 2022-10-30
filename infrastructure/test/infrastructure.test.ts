import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Website from '../lib/website-stack';

test('S3 bucket and Cloudfront distribution created', () => {
  const app = new cdk.App();
  // WHEN
  const props = {
    env: {
      region: 'eu-west-1',
    },
    certificateArn: 'arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-ab12-cd34-ef56-abcdefg12345',
  };
  const stack = new Website.WebsiteStack(app, 'WebsiteStack', props);

  // THEN
  const template = Template.fromStack(stack);

  template
    .hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'littil-acc-website',
    });

  template
    .hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [
          'staging.littil.org',
        ],
      },
    });
});
