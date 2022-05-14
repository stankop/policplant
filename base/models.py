from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here
class Product(models.Model):

    class Category(models.TextChoices):
        LEKOVITO = 'Lekovito Bilje',_('Lekovito Bilje')
        CVETNICE = 'Cvetnice',_('Cvetnice')
        BOBICASTO = 'Bobicasto Voce', _('Bobicasto Voce')
        SOBNO = 'Sobno Svece', _('Sobno Svece')
        PENJACICE = 'Penjacice',_ ('Penjacice')
        DEFAULT = 'Zelena Biljka',_('Zelena Biljka')
    
    class Color(models.TextChoices):
        CRNA = 'Crna',_('CRNA')
        PLAVA = 'Plava',_('PLAVA')
        ROZA = 'Roza', _('ROZA')
        CRVENA = 'Crvena', _('CRVENA')
        SARENA = 'Sarena',_ ('SARENA')
        LJUBICASTA = 'Ljubicasta',_('LJUBICASTA')
        DEFAULT = 'Zelena',_('Zelena')

    class Place(models.TextChoices):
        SAKSIJA = 'SAKSIJA',_('SAKSIJA')
        ZARDINJERA = 'ZARDINJERA',_('ZARDINJERA')
        BASTA = 'BASTA', _('BASTA')
        OGRADA = 'OGRADA', _('OGRADA')
        VISECASAKSIJA = 'VISECA SAKSIJA',_ ('VISECA SAKSIJA')
        POLUSENKA = 'POLUSENKA',_('POLUSENKA')
        DEFAULT = 'VECA SAKSIJA',_('VECA SAKSIJA')

    class Flowering(models.TextChoices):
        JAKOSUNCE = 'JAKO SUNCE',_('JAKO SUNCE')
        POLUSENKA = 'POLUSENKA', _('POLUSENKA')
        SENKA = 'SENKA', _('SENKA')
        DEFAULT = 'SUNCE',_('SUNCE')
        

    category = models.CharField(max_length=20, choices=Category.choices, default=Category.DEFAULT)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField( null=True, blank= True, default='/default.jpg')
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
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    def __str__(self) -> str:
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null= True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null= True)
    name = models.CharField(max_length=200, null=True, blank= True)
    rating = models.IntegerField(null=True, blank= True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable= False)

    def __str__(self) -> str:
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null= True)
    paymentMethod = models.CharField(max_length=200, null=True, blank= True)
    taxPrice =  models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    shippingPrice =  models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    totalPrice =  models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
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

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank= True)
    city = models.CharField(max_length=200, null=True, blank= True)
    postalCode = models.CharField(max_length=200, null=True, blank= True)
    country = models.CharField(max_length=200, null=True, blank= True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places= 2, null=True, blank= True)
    _id = models.AutoField(primary_key=True, editable= False)

    def __str__(self) -> str:
        return str(self.address)

