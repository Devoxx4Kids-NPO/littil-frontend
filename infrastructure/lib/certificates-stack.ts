import { Stack, StackProps } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export interface CertificateStackProps extends StackProps {
  domains: string[];
}

export class CertificatesStack extends Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    if (props.domains.length < 1) {
      throw new Error('Cannot request a certificate without at least one domain name');
    }
    const domain = props.domains[0];
    const otherDomains = props.domains.slice(1);

    this.certificate = new Certificate(this, 'FrontendCertificate', {
      domainName: domain,
      subjectAlternativeNames: otherDomains,
      validation: CertificateValidation.fromDns(),
    });
  }
}
