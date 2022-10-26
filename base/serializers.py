from rest_framework import serializers
#from django.contrib.auth.models import User
from .models import PlantCategory, Product, Order, OrderItem, UserAccount
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    colorChoises = serializers.SerializerMethodField(read_only=True)
    placeChoises = serializers.SerializerMethodField(read_only=True)
    floweringChoises = serializers.SerializerMethodField(read_only=True)
    highChoises = serializers.SerializerMethodField(read_only=True)
    type_of_plantChoises = serializers.SerializerMethodField(read_only=True)
    #category = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

   
    def get_colorChoises(self, obj):
        color = [e.value for e in obj.Color]
        return color
    
    def get_placeChoises(self, obj):
        place = [e.value for e in obj.Place]
        return place
    
    def get_floweringChoises(self, obj):
        flow = [e.value for e in obj.Flowering]
        return flow
    
    def get_highChoises(self, obj):
        high = [e.value for e in obj.High]
        return high
    
    def get_type_of_plantChoises(self, obj):
        type_of_plant = [e.value for e in obj.Type]
        return type_of_plant

    # def get_type_of_plantChoises(self, obj):
    #     type_of_plant = [e.value for e in obj.Type]
    #     return type_of_plant
    
    


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only= True)
    _id = serializers.SerializerMethodField(read_only= True)
    isAdmin = serializers.SerializerMethodField(read_only= True)

    class Meta:
        model = UserAccount
        fields = [
            '_id', 'user_name', 'email', 'name', 'isAdmin'
        ]
    
    def get_name(self, obj):
        name = obj.first_name 
        if name == '':
            name = obj.email
        return name

    def get__id(self, obj):
        _id = obj.id 
        return _id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = UserAccount

        fields =  [
            'id','user_name','email', 'isAdmin', 'token'
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =  OrderItem
        fields =  '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only= True)
    user = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model =  Order
        fields =  '__all__'
    
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
class PlantCategorySerializer(serializers.ModelSerializer):
    productNumber = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = PlantCategory
        fields =  [
            '_id','name','description', 'image', 'productNumber'
        ]
    def get_productNumber(self, obj):
        productNumber = len(obj.product_set.all())
        return str(productNumber)
       
