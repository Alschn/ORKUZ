import factory
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

factory.Faker._DEFAULT_LOCALE = 'pl_PL'

DEFAULT_USER_FACTORY_PASSWORD = 'test'

User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    username = factory.LazyAttribute(
        lambda o: "%s_%s" % (o.first_name, o.last_name)
    )
    email = factory.LazyAttributeSequence(
        lambda o, n: "%s.%s.%s@example.com" % (o.first_name, o.last_name, n)
    )
    is_active = True
    password = factory.PostGenerationMethodCall(
        'set_password',
        DEFAULT_USER_FACTORY_PASSWORD
    )
