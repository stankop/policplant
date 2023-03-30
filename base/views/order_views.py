


from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import PlantImage
from email_sending import send_template_email
from base.models import Product, Order, OrderItem, UserAccount
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
#from django.contrib.auth.models import User
from django.contrib.auth.hashers  import make_password
from rest_framework import status
from datetime import datetime

from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMultiAlternatives


@api_view(['POST'])
def addOrderItems(request):
    data = request.data
    data_email = data['email']
    try:
        user,a = UserAccount.objects.update_or_create(
            email=data['email'],
            defaults={
                'user_name':data['name'],
                'password':make_password('ok'),
                'place':data['place'],
                'address':data['address'],
                'self_phone':data['self_phone'],
                'fix_phone':data['fix_phone']
            }
            
        )
        user.save()
    except Exception as e:
        return Response({'detail': f'Duplicate User - email {data_email} alredy in use.Or problem with: {e}'}, status=status.HTTP_400_BAD_REQUEST)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1 create Order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['placanje'],
            taxPrice=0,
            #shippingPrice = data['shippingPrice'],
            totalPrice=data['ukupno']
            )
        # 2 create Shipping adddress

        # shipping = ShippingAddress.objects.create(
        #     order = order,
        #     address = data['shippingAddress']['address'],
        #     city = data['shippingAddress']['city'],
        #     postalCode = data['shippingAddress']['postalCode'],
        #     country = data['shippingAddress']['country']
        #)
        # 4 create order items and set order to orderItem relationship
        itemi = []
        for i in orderItems:
            product = Product.objects.get(_id=i['id'])
            #images = PlantImage.objects.all().values()
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image="stanko.jpg"
            )
            itemi.append(item)
            # 5 update Stock
            product.countInStock -= item.qty
            product.save()
        
    serializer = OrderSerializer(order, many=False)

    #sending message
    send_template_email(
        template='email.html',
        to=data_email,
        subj='RasadnikEma',
        order=order,
        itemi=itemi)

    return Response(serializer.data)


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getOrderById(requeste, pk):
    user = requeste.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer  = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not Authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({'detail': 'Order doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serilazier = OrderSerializer(orders, many = True)
    return Response(serilazier.data)


@api_view(['GET'])
#@permission_classes([IsAdminUser])
def getOrders(request):
    
    orders = Order.objects.all()
    serilazier = OrderSerializer(orders, many = True)
    return Response(serilazier.data)


@api_view(['PUT'])
#@permission_classes([IsAuthenticated])
def updateOrderToPaid(requeste, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("Order was paid")



# def send_email( order, itemi,data_email, mail_to=None, admin_mail=None):
#     subject, from_email, to = 'PolicPlant', 'PolicPlant Company', data_email
#     text_content = 'Hvala vam sto kupujete kod nas.'
#     html_content = rf'''
#                     '''
#     msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
#     msg.attach_alternative(html_content, "text/html")
#     msg.send()
    
    
    
 