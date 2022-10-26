from django.db import models
from django.utils import timezone
#from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here

class UserAccountManager(BaseUserManager):
    """
    This is UserAccount Manager class for UserAccount main User class
    """

    def create_superuser(self, email, user_name, first_name,
                         password, **other_fields):
        """
        This is createsuperuser method
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, place=None, address=None, self_phone=None,fix_phone=None, **other_fields)


    def create_user(self, email, user_name, 
                    first_name, password, place,
                    address, self_phone,fix_phone, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name,place=place, address=address, 
                          self_phone=self_phone, fix_phone=fix_phone, **other_fields)
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=False)
    place = models.CharField(max_length=150,null= True, blank=True)
    address = models.CharField(max_length=150,null= True, blank=True)
    self_phone = models.CharField(max_length=150,null= True, blank=True)
    fix_phone = models.CharField(max_length=150,null= True, blank=True)
    first_name = models.CharField(max_length=150,null= True, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return str(self.user_name)

class PlantCategory(models.Model):

    class Category(models.TextChoices):
        LEKOVITO = 'Lekovito Bilje', _('Lekovito Bilje')
        CVETNICE = 'Cvetnice', _('Cvetnice')
        BOBICASTO = 'Bobicasto Voce', _('Bobicasto Voce')
        SOBNO = 'Sobno Svece', _('Sobno Svece')
        PENJACICE = 'Penjacice', _ ('Penjacice')
        DEFAULT = 'Zelena Biljka', _('Zelena Biljka')

    name = models.CharField(max_length=20, choices=Category.choices, default=Category.DEFAULT)
    _id = models.AutoField(primary_key=True, editable=False)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/default.jpg')
   

    def __str__(self):
        return str(self.name)

class Product(models.Model):
    
    class Color(models.TextChoices):
        CRNA = 'Crna', _('CRNA')
        PLAVA = 'Plava', _('PLAVA')
        ROZA = 'Roza', _('ROZA')
        CRVENA = 'Crvena', _('CRVENA')
        SARENA = 'Sarena',  _ ('SARENA')
        LJUBICASTA = 'Ljubicasta', _('LJUBICASTA')
        DEFAULT = 'Zelena', _('Zelena')

    class Place(models.TextChoices):
        SAKSIJA = 'SAKSIJA', _('SAKSIJA')
        ZARDINJERA = 'ZARDINJERA', _('ZARDINJERA')
        BASTA = 'BASTA', _('BASTA')
        OGRADA = 'OGRADA', _('OGRADA')
        VISECASAKSIJA = 'VISECA SAKSIJA', _ ('VISECA SAKSIJA')
        POLUSENKA = 'POLUSENKA', _('POLUSENKA')
        DEFAULT = 'VECA SAKSIJA', _('VECA SAKSIJA')

    class Flowering(models.TextChoices):
        JAKOSUNCE = 'JAKO SUNCE', _('JAKO SUNCE')
        POLUSENKA = 'POLUSENKA', _('POLUSENKA')
        SENKA = 'SENKA', _('SENKA')
        DEFAULT = 'SUNCE', _('SUNCE')

    class High(models.TextChoices):
        SREDNJA = '50-100cm', _('50-100cm')
        VISOKA = '100cm +', _('100cm +')
        DEFAULT = '0-50cm',_('0-50cm')
    
    class Type(models.TextChoices):
        ZIMZELANA = 'ZIMZELANA', _('ZIMZELANA')
        DEFAULT = 'LISTOPADNA',_('LISTOPADNA')
        

    #category = models.CharField(max_length=20, choices=PlantCategory.Category.choices, default=PlantCategory.Category.DEFAULT)
    category = models.ForeignKey(PlantCategory, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/default.jpg')
    brand = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    color = models.CharField(max_length=20, choices=Color.choices, default=Color.DEFAULT)
    flowering_time = models.CharField(max_length=20, choices=Flowering.choices, default=Flowering.DEFAULT)
    place_of_planting = models.CharField(max_length=20, choices=Place.choices, default=Place.DEFAULT)
    high = models.CharField(max_length=20, choices=High.choices, default=High.DEFAULT)
    type_of_plant = models.CharField(max_length=20, choices=Type.choices, default=Type.DEFAULT)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class Order(models.Model):
    user = models.ForeignKey(UserAccount, on_delete = models.SET_NULL, null= True)
    paymentMethod = models.CharField(max_length=200, null=True, blank = True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null= True, blank= True )
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null= True, blank= True )
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable= False) 

    def __str__(self) -> str:
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null= True)
    order = models.ForeignKey(Order, on_delete = models.SET_NULL, null= True)
    name = models.CharField(max_length=200, null=True, blank= True)
    qty = models.IntegerField(null=True, blank= True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    image = models.CharField(max_length=200, null=True, blank= True)
    _id = models.AutoField(primary_key=True, editable= False)

    def __str__(self) -> str:
        return str(self.name)

