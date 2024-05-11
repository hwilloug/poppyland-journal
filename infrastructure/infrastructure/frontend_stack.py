from aws_cdk import (
    CfnParameter,
    Stack,
    aws_lambda as lambda_,
    aws_s3 as s3,
    aws_iam as iam,
    aws_cloudfront as cloudfront
)
from constructs import Construct

class FrontendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        frontend_bucket = s3.Bucket(
            self, "WebAppS3Bucket",
            bucket_name= f"{app_name.value_as_string}-frontend",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
        )

        origin = cloudfront.IOrigin(self, f"{kwargs.get("app_name")}-web-app-s3-origin")

        oai = cloudfront.CfnOriginAccessControl(
            self, "WebAppOriginAccessControl",
            origin_access_control_config=cloudfront.CfnOriginAccessControl.OriginAccessControlConfigProperty(
                name=f"{kwargs.get("app_name")}-web-app-origin-access-control",
                origin_access_control_origin_type="s3",
                signing_behavior="always",
                signing_protocol="sigv4"
            )
        )

        cloudfront_distribution = cloudfront.Distribution(
            self, "CloudFrontDistribution",
            enabled=True,
            origin=origin.S3Origin(frontend_bucket),
            default_behavior= cloudfront.BehaviorOptions(
                allowed_methods=cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                origin_request_policy=cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.HTTPS_ONLY
            ),
            price_class=cloudfront.PriceClass.PRICE_CLASS_ALL,
            domain_names=[kwargs.get("domain")],
            default_root_object="index.html",
        )

        frontend_bucket.add_to_resource_policy(
            iam.PolicyStatement(
                actions=["s3:GetObject"],
                effect=iam.Effect.ALLOW,
                resources=[frontend_bucket.bucket_arn],
            ).add_condition("StringEquals", {"aws:SourceArn": ""})
        )