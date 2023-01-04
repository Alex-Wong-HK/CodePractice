//@ts-nocheck
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { Key } from "aws-cdk-lib/aws-kms";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

interface IConstructProps {}

export class SecretManager extends Construct {
    public readonly encryptionKey: Key;
    public readonly ApiEnv: Secret;
    constructor(scope: Construct, id: string, props: IConstructProps) {
        super(scope, id);

        this.encryptionKey = new Key(this, "EncryptionKey", {
            enableKeyRotation: true,
            pendingWindow: Duration.days(7),
        });
        const globalSecretProps = {
            removalPolicy: RemovalPolicy.DESTROY,
            encryptionKey: this.encryptionKey,
        };

        this.ApiEnv = new Secret(this, "HelloWorldSecret", {
            ...globalSecretProps,
            secretName: "/HelloWorld_API/ENV",
        });
    }
}
