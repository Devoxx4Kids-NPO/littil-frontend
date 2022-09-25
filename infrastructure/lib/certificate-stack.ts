import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class CertificateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const certificateProps = {
      domainName: 'acc.littil.org',
      validation: CertificateValidation.fromDns(),
    };
    const certificate = new Certificate(this, 'FrontendCertificate', certificateProps);

    new CfnOutput(this, 'CertificateArn', {value: certificate.certificateArn});
  }
}
