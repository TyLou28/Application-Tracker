from django.contrib import admin
from .models import User
from.forms import userChangeForm, userCreationForm
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class adminUser(UserAdmin):
    add_form = userCreationForm
    form = userChangeForm

    list_display = (
        "id",
        "first_name",
        "last_name",
        "email"
    )

    model = User
    # Change ordering, as my user model doesn't have a username
    ordering = ['email']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )