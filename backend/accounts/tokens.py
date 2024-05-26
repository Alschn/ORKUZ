from django.contrib.auth.models import AbstractUser
from ninja_jwt.tokens import RefreshToken as BaseRefreshToken, Token


class RefreshToken(BaseRefreshToken):

    @classmethod
    def for_user(cls, user: "AbstractUser") -> Token:
        token = super().for_user(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
