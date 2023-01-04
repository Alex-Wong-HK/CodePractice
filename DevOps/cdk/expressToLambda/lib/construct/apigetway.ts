//@ts-nocheck
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Lambda } from "./lambda";

interface IConstructProps {
    lambdaConstruct: Lambda;
}

export class ApiGateWay extends Construct {
    public readonly httpApi: apigateway.LambdaRestApi;

    constructor(scope: Construct, id: string, props: IConstructProps) {
        super(scope, id);

        this.httpApi = new apigateway.LambdaRestApi(this, "HelloWorldAPI", {
            handler: props.lambdaConstruct.functions.lambda,
        });
    }
}
