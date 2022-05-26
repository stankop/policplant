from django.contrib import admin
from .models import *
from .models import UserAccount
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea

# Register your models here.

class UserAdminConfig(UserAdmin):
    search_fields = ('email','user_name','first_name')
    ordering = ('-start_date',)
    list_display = ('email','user_name', 'first_name', 'is_active','is_staff')
    fieldsets = (
        (None,{'fields':('email','user_name','first_name',)}),
        ('Permissions',{'fields':('is_staff', 'is_active')}),
       
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )

admin.site.register(UserAccount, UserAdminConfig)
admin.site.register(Product)
#admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
#admin.site.register(ShippingAddress)


