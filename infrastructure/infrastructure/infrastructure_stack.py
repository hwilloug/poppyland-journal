from aws_cdk import (
    CfnParameter,
    Stack,
    aws_lambda as lambda_,
    aws_s3 as s3
)
from constructs import Construct

from infrastructure.infrastructure.frontend_stack import FrontendStack

class InfrastructureStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        app_name = CfnParameter(self, "AppName", type="string", default="poppyland-journal")
        domain = CfnParameter(self, "Domain", type="string", default="journal.poppyland.dev")


        FrontendStack(self, "FrontendStack", app_name=app_name, domain=domain)