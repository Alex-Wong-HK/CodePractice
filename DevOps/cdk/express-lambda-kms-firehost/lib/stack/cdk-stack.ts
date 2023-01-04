//@ts-nocheck
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiGateWay } from "../construct/apigetway";
import { Firehose } from "../construct/firehost";
import { Lambda } from "../construct/lamdba";
import { SecretManager } from "../construct/secret-manager";

export class CdkWryeStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const firehose = new Firehose(this, "Firehost", {});
        const kms = new SecretManager(this, "SecretManager", {});
        const lambdaConstruct = new Lambda(this, "Lambda", {
            secretManagerConstruct: kms,
            firehoseRole: firehose,
        });
        const wryeApi = new ApiGateWay(this, "ApiGateway", {
            lambdaConstruct,
        });
    }
}
