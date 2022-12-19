import * as cdk from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class CertificatesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const certificateProps = {
      domainName: 'staging.littil.org',
      validation: CertificateValidation.fromDns(),
    };
    new Certificate(this, 'FrontendCertificate', certificateProps);

    const demoCertificateProps = {
      domainName: 'demo.littil.org',
      validation: CertificateValidation.fromDns(),
    };
    new Certificate(this, 'DemoCertificate', demoCertificateProps);
  }
}
