import email
from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers  import make_password
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status= status.HTTP_400_BAD_REQUEST)
    else:
        # 1 create Order

        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
            )
        # 2 create Shipping adddress

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )
        # 4 create order items and set order to orderItem relationship

        for i in orderItems:
            product = Product.objects.get(_id = i['id'])
            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )
            # 5 update Stock
            product.countInStock -= item.qty
            product.save()
        
    serializer = OrderSerializer(order, many= False)
        
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(requeste, pk):
    user = requeste.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer  = OrderSerializer(order, many= False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not Authorized to view this order'}, status= status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order doesnt exist'}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serilazier = OrderSerializer(orders, many = True)
    return Response(serilazier.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    
    orders = Order.objects.all()
    serilazier = OrderSerializer(orders, many = True)
    return Response(serilazier.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(requeste, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("Order was paid")


