from ninja_extra import NinjaExtraAPI

from accounts.api import JWTController

api = NinjaExtraAPI(
    title="ORKUZ REST API",
    description="REST API written for the purpose of the final paper.",
    version="0.1.0",
    docs_url="/docs/"
)
api.register_controllers(JWTController)
