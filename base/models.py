from django.db import models
from django.utils import timezone
#from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from multiselectfield import MultiSelectField

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

class Akcija(models.Model):

    class Opcija(models.TextChoices):
        POPUST = 'Popust', _('Popust')
        DEFAULT = 'Akcija', _('Akcija')

    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=20,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    procenat = models.IntegerField(null=True, blank=True, default=0)
    
    def __str__(self):
        return str(self.name)

class PlantCategory(models.Model):

    class Category(models.TextChoices):
        TRAJNICE = 'Trajnice-perene', _('Trajnice-perene')
        PENJACICE_I_PUZAVICE = 'Penjačice i Puzavice', _ ('Penjačice i Puzavice')
        UKRASNO_ZBUNJE = 'Ukrasno žbunje', _('Ukrasno žbunje')
        ZACINSKO_I_AROMATICNO_BILJE = 'Začinsko i aromatično bilje',_('Začinsko i aromatično bilje')
        UKRASNE_TRAVE = 'Ukrasne trave', _ ('Ukrasne trave')
        SEDUMI_I_CUVARKUCE = 'Sedumi i čuvarkuće', _ ('Sedumi i čuvarkuće')
        LISCARI = 'Lišćari', _ ('Lišćari')
        CETINARI = 'Četinari', _ ('Četinari')
        BILJKE_ZA_HLAD = 'Biljke za hlad', _ ('Biljke za hlad')
        SADNICE_VOCA = 'Sadnice voća', _ ('Sadnice voća')
        PROIZVODI_NA_AKCIJI = 'Proizvodi na akciji', _('Proizvodi na akciji')
        DEFAULT = 'Ostalo', _('Ostalo')

    name = models.CharField(max_length=50, choices=Category.choices, default=Category.DEFAULT, unique=True)
    _id = models.AutoField(primary_key=True, editable=False)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/default.jpg')
    order = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.name)

class Product(models.Model):
    

    # class Color(models.TextChoices):
    #     CRNA = 'Crna', _('CRNA')
    #     BELA = 'BELA', _('BELA')
    #     BEZ = 'BEZ', _('BEZ')
    #     ZUTA = 'ZUTA', _('ZUTA')
    #     ZLATNA = 'ZLATNA', _('ZLATNA')
    #     LILA = 'LILA', _('LILA')
    #     NARANDZASTA = 'NARANDZASTA', _('NARANDZASTA')
    #     PURPURNA = 'PURPURNA', _('PURPURNA')
    #     RUZICASTA = 'RUZICASTA', _('RUZICASTA')
    #     SIVA = 'SIVA', _('SIVA')
    #     BRAON = 'BRAON', _('BRAON')
    #     SARENA = 'SARENA', _('SARENA')
    #     PLAVA = 'PLAVA', _('PLAVA')
    #     ROZA = 'ROZA', _('ROZA')
    #     CRVENA = 'CRVENA', _('CRVENA')
    #     LJUBICASTA = 'LJUBICASTA', _('LJUBICASTA')
    #     DEFAULT = 'ZELENA', _('ZELENA')

    class Place(models.TextChoices):
        SAKSIJA = 'SAKSIJA', _('SAKSIJA')
        ZARDINJERA = 'ZARDINJERA', _('ZARDINJERA')
        BASTA = 'BASTA', _('BASTA')
        OGRADA = 'OGRADA', _('OGRADA')
        VISECASAKSIJA = 'VISECA SAKSIJA', _ ('VISECA SAKSIJA')
        POLUSENKA = 'POLUSENKA', _('POLUSENKA')
        DEFAULT = 'VECA SAKSIJA', _('VECA SAKSIJA')

    class Mesto_Sadnje(models.TextChoices):
        SUNCE = 'sunce', _('sunce')
        POLUSENKA = 'polusenka', _('polusenka')
        DEFAULT = 'hlad', _('hlad')

    # class Vreme_Cvetanja(models.TextChoices):
    #     JANUAR = 'JANUAR', _('JANUAR')
    #     FEBRUAR = 'FEBRUAR', _('FEBRUAR')
    #     MART = 'MART', _('MART')
    #     APRIL = 'APRIL', _('APRIL')
    #     MAJ = 'MAJ', _('MAJ')
    #     JUN = 'JUN', _('JUN')
    #     JUL = 'JUL', _('JUL')
    #     AVGUST = 'AVGUST', _('AVGUST')
    #     SEPTEMBAR = 'SEPTEMBAR', _('SEPTEMBAR')
    #     OKTOBAR = 'OKTOBAR', _('OKTOBAR')
    #     NOVEMBAR = 'NOVEMBAR', _('NOVEMBAR')
    #     DEFAULT = 'DECEMBAR', _('DECEMBAR')

    VREME_CVETANJA = (('januar', 'januar'),
              ('februar', 'februar'),
              ('mart', 'mart'),
              ('april', 'april'),
              ('maj', 'maj'),
              ('jun', 'jun'),
              ('jul', 'jul'),
              ('avgust', 'avgust'),
              ('septembar', 'septembar'),
              ('oktobar', 'oktobar'),
              ('novembar', 'novembar'),
              ('decembar', 'decembar'))
    
    MESTO_SADNJE = (('sunce', 'sunce'),
              ('polusenka', 'polusenka'),
              ('hlad', 'hlad'))
    class Orezivanje(models.TextChoices):
        PRAZNA = '', _('')
        DA = 'da', _('da')
        DEFAULT = 'ne', _('ne')

    class Privlaci_Insekte(models.TextChoices):
        PRAZNA = '', _('')
        DA = 'da', _('da')
        DEFAULT = 'ne', _('ne')
        

    class Brzina_Rasta(models.TextChoices):
        PRAZNA = '', _('')
        BRZORASTUCE = 'brzorastuće', _('brzorastuće')
        SREDNJERASTUCE = 'srednje brzine', _('srednje brzine')
        DEFAULT = 'spororastuće',_('spororastuće')
    
    class Type(models.TextChoices):
        PRAZNA = '', _('')
        ZIMZELANA = 'zimzelena', _('zimzelena')
        LISTOPADNA = 'listopadna', _('listopadna')
        VISEGODISNJA = 'višegodišnja', _('višegodišnja')
        DEFAULT = 'delimično zimzelena',_('delimično zimzelena')
        

    #category = models.CharField(max_length=20, choices=PlantCategory.Category.choices, default=PlantCategory.Category.DEFAULT)
    
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True)
    
    name = models.CharField(max_length=100, null=True, blank=True, unique=True)
    hesteg = models.CharField(max_length=400, null=True, blank=True)
    #image = models.ImageField(null=True, blank=True, default='/default.jpg')
    description = models.TextField(null=True, blank=True)
    price = models.PositiveIntegerField( null=True, blank=True, default=0)
    countInStock = models.PositiveIntegerField(null=True, blank=True, default=0)
    
    #karakteristike
    color = models.CharField(max_length=250, null=True, blank=True)
    #mesto_sadnje = models.CharField(max_length=250, choices=Mesto_Sadnje.choices, default=Mesto_Sadnje.DEFAULT)
    mesto_sadnje = MultiSelectField(choices=MESTO_SADNJE,max_choices=3)
    place_of_planting = models.CharField(max_length=250, choices=Place.choices, default=Place.DEFAULT)
    #vreme_cvetanja = models.CharField(max_length=50, choices=Vreme_Cvetanja.choices, default=Vreme_Cvetanja.DEFAULT)
    vre_cve = MultiSelectField(choices=VREME_CVETANJA,max_choices=6)
    orezivanje = models.CharField(max_length=250,choices=Orezivanje.choices, default=Orezivanje.DEFAULT)
    privlaci_insekte = models.CharField(max_length=250,choices=Privlaci_Insekte.choices, default=Privlaci_Insekte.DEFAULT)
    brzina_rasta = models.CharField(max_length=250,choices=Brzina_Rasta.choices, default=Brzina_Rasta.DEFAULT)
    prezimljava = models.CharField(max_length=250, null=True, blank=True)
    high = models.CharField(max_length=250,  null=True, blank=True )
    botanicki_naziv = models.CharField(max_length=300, null=True, blank=True)
    velicina_slanja = models.CharField(max_length=250,  null=True, blank=True )
    type_of_plant = models.CharField(max_length=250, choices=Type.choices, default=Type.DEFAULT)
    sirina_biljke = models.CharField(max_length=250,  null=True, blank=True )
    category = models.ManyToManyField(PlantCategory, related_name='products')
    prodajno_mesto = models.BooleanField(null=True, blank=True, default=False)
    novo = models.CharField(max_length=550,  null=True, blank=True)
    popust = models.CharField(max_length=550,  null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)

class PlantImage(models.Model):
    product = models.ForeignKey(Product,related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True, default='/default.jpg')
    order = models.IntegerField(null=True, blank=True, default=0)

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

