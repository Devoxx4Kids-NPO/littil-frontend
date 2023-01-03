# LITTIL Front-end CDK project

This node project contains an AWS CDK (Cloud Development Kit) project. Infrastructure-as-code is written in Typescript, compiled, then synthesized to CloudFormation templates (YAML). These templates can be deployed using the CDK CLI.

## Stacks

CDK apps are composed of stacks (analogous to CloudFormation stacks), containing resources.

Two stacks exist, a certificate stack, to be deployed to us-east-1, and a website stack, to be deployed to eu-west-1.

### US region
The NL LITTIL infrastructure needs to run in eu-west-1, but because of the deployment using CloudFront, the certificate needs to be available in us-east-1. This is because CloudFront deploys to CDN edges worldwide, and us-east-1 is the region AWS chose to be available for resources like certificates.

## Commands
```bash
npm run build # Compile TypeScript code
npm run test # Run tests
npm run cdk:list # List stacks
npm run cdk:synth:acc # Synthesize all stacks for deployment to acc (e.g. urls will change between environments)
npm run cdk:deploy:acc # Deploy all stacks
```

## Bootstrapping

To use the CDK, an AWS environment needs to be bootstrapped. To bootstrap a LITTIL AWS account, see the [littil-infrastructure](https://github.com/Devoxx4Kids-NPO/littil-infrastructure) repository.
