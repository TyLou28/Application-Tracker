from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User

class userCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = '__all__'

class userChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'