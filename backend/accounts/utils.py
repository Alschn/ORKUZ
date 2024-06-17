from accounts.tokens import RefreshToken


def get_tokens_for_user(user) -> tuple[str, str]:
    """
    Get access and refresh tokens for a user.
    :param user: User instance
    :return: Tuple of access and refresh tokens
    """
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token  # type: ignore

    return str(access), str(refresh)
