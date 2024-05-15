from accounts.api import JWTController
from accounts.tests.factories import UserFactory
from core.api import api
from django.test import TestCase
from ninja_extra import status
from ninja_extra.testing import TestClient
from ninja_jwt.tokens import RefreshToken

namespace = f'api-{api.version}'


class JWTAuthViewsTests(TestCase):
    token_path = JWTController.token_path
    token_refresh_path = JWTController.token_refresh_path
    token_verify_path = JWTController.token_verify_path

    def setUp(self):
        self.client = TestClient(JWTController)

    def test_login(self):
        username, password = 'testuser', 'testpassword'
        UserFactory(username=username, password=password)

        response = self.client.post(
            self.token_path, json={
                'username': username,
                'password': password
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response_json)
        self.assertIn('refresh', response_json)

    def test_login_account_does_not_exist(self):
        response = self.client.post(
            self.token_path, json={
                'username': 'testuser',
                'password': 'testpassword'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.json())

    def test_login_invalid_password(self):
        username, password = 'testuser', 'testpassword'
        UserFactory(username=username, password=password)

        response = self.client.post(
            self.token_path, json={
                'username': username,
                'password': 'invalidpassword'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.json())

    def test_login_missing_username(self):
        response = self.client.post(
            self.token_path, json={
                'password': 'testpassword'
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response_json)
        self.assertIn('username', response_json)
        self.assertEqual(response_json['code'], 'invalid')

    def test_verify_token(self):
        username, password = 'testuser', 'testpassword'
        UserFactory(username=username, password=password)

        token_response = self.client.post(
            self.token_path, json={
                'username': 'testuser',
                'password': 'testpassword'
            }
        )
        token = token_response.json()['access']

        response = self.client.post(
            self.token_verify_path, json={
                'token': token
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_json, {})

    def test_verify_token_invalid(self):
        response = self.client.post(
            self.token_verify_path, json={
                'token': 'invalid'
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response_json)
        self.assertEqual(response_json['code'], 'token_not_valid')

    def test_refresh_token(self):
        username, password = 'testuser', 'testpassword'
        UserFactory(username=username, password=password)

        token_response = self.client.post(
            self.token_path, json={
                'username': username,
                'password': password
            }
        )
        refresh_token = token_response.json()['refresh']

        response = self.client.post(
            self.token_refresh_path, json={
                'refresh': refresh_token
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response_json)
        self.assertIn('refresh', response_json)

    def test_refresh_token_invalid(self):
        response = self.client.post(
            self.token_refresh_path, json={
                'refresh': 'invalid'
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response_json)
        self.assertEqual(response_json['code'], 'token_not_valid')

    def test_refresh_token_blacklisted(self):
        username, password = 'testuser', 'testpassword'
        UserFactory(username=username, password=password)

        token_response = self.client.post(
            self.token_path, json={
                'username': username,
                'password': password
            }
        )
        refresh_token = token_response.json()['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()

        response = self.client.post(
            self.token_refresh_path, json={
                'refresh': refresh_token
            }
        )
        response_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response_json)
        self.assertEqual(response_json['code'], 'token_not_valid')
