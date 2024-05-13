from accounts.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import TestCase


class UserModelTests(TestCase):

    def test_get_user_model(self):
        auth_model = get_user_model()
        self.assertEqual(settings.AUTH_USER_MODEL, 'accounts.User')
        self.assertEqual(auth_model, User)
