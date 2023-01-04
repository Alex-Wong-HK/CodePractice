//@ts-nocheck
import { DeliveryStream } from "@aws-cdk/aws-kinesisfirehose-alpha";
import {
    S3Bucket,
    Compression,
} from "@aws-cdk/aws-kinesisfirehose-destinations-alpha";
import { Duration, RemovalPolicy, Size } from "aws-cdk-lib";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface IFirehoseConstruct {}

export class Firehose extends Construct {
    lambdaFunctionRole: Role;
    deliverySteam: DeliveryStream;
    constructor(scope: Construct, id: string, props: IFirehoseConstruct) {
        super(scope, id);

        const dataBucket = new Bucket(this, "DataBucket", {
            autoDeleteObjects: true,
            removalPolicy: RemovalPolicy.DESTROY,
        });
        dataBucket.grantPublicAccess("public/*");

        this.deliverySteam = new DeliveryStream(
            this,
            "TransactionDeliveryStream",
            {
                destinations: [
                    new S3Bucket(dataBucket, {
                        dataOutputPrefix: "log/transaction/!{timestamp:yyyy/MM/dd}/",
                        errorOutputPrefix:
                            "log/transaction/!{firehose:error-output-type}/!{timestamp:yyyy/MM/dd}/",
                        compression: Compression.GZIP,
                        bufferingInterval: Duration.seconds(300),
                        bufferingSize: Size.mebibytes(3),
                    }),
                ],
            }
        );
        this.lambdaFunctionRole = new Role(this, "lambdaRole", {
            assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
        });
        this.deliverySteam.grantPutRecords(this.lambdaFunctionRole);
        dataBucket.grantReadWrite(this.lambdaFunctionRole);
    }
}
