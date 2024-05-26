from typing import Dict

from accounts.tokens import RefreshToken
from django.contrib.auth.models import AbstractUser
from ninja_jwt.schema import TokenObtainPairInputSchema as BaseTokenObtainPairInputSchema


class TokenObtainPairInputSchema(BaseTokenObtainPairInputSchema):
    @classmethod
    def get_token(cls, user: AbstractUser) -> Dict:
        values = {}
        refresh = RefreshToken.for_user(user)
        values["refresh"] = str(refresh)
        values["access"] = str(refresh.access_token)
        return values
