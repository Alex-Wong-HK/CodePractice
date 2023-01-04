//@ts-nocheck
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { RemovalPolicy } from "aws-cdk-lib";
import { ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { SecretManager } from "./secret-manager";
import { KinesisFirehose } from "./firehose";

interface IConstructProps {
    secretManagerConstruct: SecretManager;
    firehoseRole: KinesisFirehose;
}

interface IFunction {
    lambda: Lambda.Function;
}
export class Lambda extends Construct {
    public readonly functions: IFunction;
    public readonly layer: Lambda.LayerVersion;
    constructor(scope: Construct, id: string, props: IConstructProps) {
        super(scope, id);

        this.layer = new Lambda.LayerVersion(this, "Layer", {
            code: Lambda.Code.fromAsset(join(process.cwd(), "src/layer")),
            compatibleRuntimes: [Lambda.Runtime.NODEJS_16_X],
            removalPolicy: RemovalPolicy.DESTROY,
        });

        const codeDir = Lambda.Code.fromAsset(
            join(process.cwd(), "/src/function/dist/")
        );
        const nodejsProps = {
            runtime: Lambda.Runtime.NODEJS_16_X,
            code: codeDir,
            layers: [this.layer],
        };

        const environmentProps = {
            SECRET_ARN: props.secretManagerConstruct.ApiEnv.secretArn,
            DELIVERY_NAME: props.firehoseRole.wryeDeliverySteam.deliveryStreamName,
        };

        this.functions = {
            lambda: new Lambda.Function(this, "HelloWorldLambda", {
                functionName: "HelloWorld-api-Lambda",
                handler: "src/lambda.handler",
                role: props.firehoseRole.lambdaFunctionRole,
                ...nodejsProps,
                environment: { ...environmentProps },
            }),
        };
        new Array(...Object.values(this.functions)).forEach(
            (func: Lambda.Function) => {
                func.role?.addManagedPolicy(
                    ManagedPolicy.fromAwsManagedPolicyName(
                        "service-role/AWSLambdaVPCAccessExecutionRole"
                    )
                );
                func.role?.addManagedPolicy(
                    ManagedPolicy.fromAwsManagedPolicyName(
                        "CloudWatchLambdaInsightsExecutionRolePolicy"
                    )
                );
                func.addToRolePolicy(
                    new PolicyStatement({
                        actions: ["secretsmanager:GetSecretValue"],
                        resources: [props.secretManagerConstruct.ApiEnv.secretArn],
                    })
                );
                func.addToRolePolicy(
                    new PolicyStatement({
                        actions: ["kms:Decrypt"],
                        resources: [props.secretManagerConstruct.encryptionKey.keyArn],
                    })
                );
            }
        );
    }
}
