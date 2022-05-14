
from django.http import JsonResponse
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review
from rest_framework_simplejwt.tokens import RefreshToken

class ReviewtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields =  '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only= True)
    categoryChoises = serializers.SerializerMethodField(read_only= True)
    colorChoises = serializers.SerializerMethodField(read_only= True)
    placeChoises = serializers.SerializerMethodField(read_only= True)
    floweringChoises = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Product
        fields =  '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewtSerializer(reviews, many=True)
        return serializer.data
    
    def get_categoryChoises(self, obj):
        category = [e.value for e in obj.Category]
        return category
    
    def get_colorChoises(self, obj):
        color = [e.value for e in obj.Color]
        return color
    
    def get_placeChoises(self, obj):
        place = [e.value for e in obj.Place]
        return place
    
    def get_floweringChoises(self, obj):
        flow = [e.value for e in obj.Flowering]
        return flow


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only= True)
    _id = serializers.SerializerMethodField(read_only= True)
    isAdmin = serializers.SerializerMethodField(read_only= True)

    class Meta:
        model = User
        fields =  [
            '_id','username','email', 'name', 'isAdmin'
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
        model = User

        fields =  [
            'id','username','email', 'name', 'isAdmin', 'token'
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields =  '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =  OrderItem
        fields =  '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only= True)
    shippingAddress = serializers.SerializerMethodField(read_only= True)
    user = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model =  Order
        fields =  '__all__'
    
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
         
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many= False).data
        except:
            address = False
        return address
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

