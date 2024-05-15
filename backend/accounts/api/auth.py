from ninja_extra import ControllerBase, http_post
from ninja_extra.controllers.base import api_controller
from ninja_jwt.schema_control import SchemaControl
from ninja_jwt.settings import api_settings

schema = SchemaControl(api_settings)


class TokenObtainPairController(ControllerBase):
    token_path = "/"
    token_refresh_path = "/refresh/"
    auto_import = False

    @http_post(
        token_path,
        response=schema.obtain_pair_schema.get_response_schema(),
        url_name="token",
    )
    def obtain_token(self, user_token: schema.obtain_pair_schema):
        user_token.check_user_authentication_rule()
        return user_token.to_response_schema()

    @http_post(
        token_refresh_path,
        response=schema.obtain_pair_refresh_schema.get_response_schema(),
        url_name="token_refresh",
    )
    def refresh_token(self, refresh_token: schema.obtain_pair_refresh_schema):
        return refresh_token.to_response_schema()


class TokenVerificationController(ControllerBase):
    token_verify_path = "/verify/"
    auto_import = False

    @http_post(
        token_verify_path,
        response={200: schema.verify_schema.get_response_schema()},
        url_name="token_verify",
    )
    def verify_token(self, token: schema.verify_schema):
        return token.to_response_schema()


class TokenBlackListController(ControllerBase):
    token_blacklist_path = "/blacklist/"
    auto_import = False

    @http_post(
        token_blacklist_path,
        response={200: schema.blacklist_schema.get_response_schema()},
        url_name="token_blacklist",
    )
    def blacklist_token(self, refresh: schema.blacklist_schema):
        return refresh.to_response_schema()


@api_controller('token', tags=['token'])
class JWTController(
    TokenObtainPairController,
    TokenVerificationController,
    TokenBlackListController
):
    pass
