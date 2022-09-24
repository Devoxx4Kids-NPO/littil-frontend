import * as cdk from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Certificate(this, 'FrontendCertificate', {
      domainName: 'acc.littil.org',
      validation: CertificateValidation.fromDns(),
    });
  }
}
