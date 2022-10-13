


from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
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
        user,a = UserAccount.objects.get_or_create(
            email=data['email'],
            defaults={
                'user_name':data['name'],
                'password':make_password(data['password'] if data['password'] else 'ok'),
            'place':data['place'],
            'address':data['address'],
            'self_phone':data['self_phone'],
            'fix_phone':data['fix_phone']
            }
            
        )
        user.save()
    except:
        return Response({'detail': f'Duplicate User - email {data_email} alredy in use.'}, status=status.HTTP_400_BAD_REQUEST)
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

        for i in orderItems:
            product = Product.objects.get(_id=i['id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )
            # 5 update Stock
            product.countInStock -= item.qty
            product.save()
        
    serializer = OrderSerializer(order, many=False)

    #sending message
    send_email(order.totalPrice, order._id, orderItems, data_email)

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



def send_email(total, orderNum, orderi,data_email, mail_to=None, admin_mail=None):
    subject, from_email, to = 'PolicPlant', 'PolicPlant Company', data_email
    text_content = 'Hvala vam sto kupujete kod nas.'
    html_content = rf'''<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">

body, table, td, a {{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
table, td {{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}}
img {{-ms-interpolation-mode: bicubic;}}

img {{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}}
table {{border-collapse: collapse !important;}}
body {{ height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }}


a[x-apple-data-detectors] {{
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}}

@media screen and (max-width: 480px) {{
    .mobile-hide {{
        display: none !important;
    }}
    .mobile-center {{
        text-align: center !important;
    }}
}}
div[style*="margin: 16px 0;"] {{ margin: 0 !important; }}
</style>
<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">


<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
            <tr>
                <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
               
                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                        <tr>
                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">PolicPlant</h1>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                        <tr>
                            <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                    <tr>
                                        <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                            <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Plants &nbsp;</a></p>
                                        </td>
                                        <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                            <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
              
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                            <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                Hvala vam sto ste narucili kod nas!
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                            <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                Mozete otici na pocetnu stranicu i naruciti vase biljke ponovo.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-top: 20px;">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                        Order Confirmation #
                                    </td>
                                    <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                        { orderNum }
                                    </td>
                                </tr>

                                 
                                    <tr>
                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                            Ovde ide Naziv biljke iz ordera
                                        </td>
                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                            Cena u din
                                        </td>
                                    </tr>
                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-top: 20px;">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                        TOTAL
                                    </td>
                                    <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                       { total} DIN
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
                </td>
            </tr>
             <tr>
                <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                    <tr>
                        <td align="center" valign="top" style="font-size:0;">
                            <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">

                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                    <tr>
                                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                            <p style="font-weight: 800;">Adresa kupca</p>
                                            <p>Vojvode Supljikca 20<br>2 sprat<br>Novi Sad, NS 21000</p>

                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                    <tr>
                                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                            <p style="font-weight: 800;">Datum isporuke</p>
                                            <p>Januar 15,2023</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
                
            </tr>
            <tr>
                <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                        <td align="center">
                            <img src="logo-footer.png" width="37" height="37" style="display: block; border: 0px;"/>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                            <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                Budisava 114<br>
                                NS, NS 21242
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                            <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                Ukoliko vi niste narucili ovu Narudzbu obratite se molim Vas na mail: s_polic@yahoo.com <a href="#" target="_blank" style="color: #777777;">unsusbscribe</a>.
                            </p>
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>
        </td>
    </tr>
</table>
    
</body>
</html>
'''
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    
    # <div >
    #         <span>Ukupan iznos: </span>
    #         <span><strong>RSD {total}</strong></span>
    #     </div>
    #     <div >
    #         <span>Order number: </span>
    #         <span>{orderNum}</span>
    #     </div>
    #     <div>
    #         <p>Vase poruzdzbina je poslata na obradu. Mozete se vratiti na pocetnu stranu i  kreirati novu porudzbinu ukoliko zelite.</p>
    #     </div>
    #     <div >
    #         <button >Close</button>

    # </div>
    
    # subject = 'PolicPlant'
    # message = ' Hvala vam sto kupujete kod nas. '
    # email_from = 'PolicPlant Company' 
    # recipient_list = ['s_polic@yahoo.com',]
    # send_mail( subject, message, email_from, recipient_list )