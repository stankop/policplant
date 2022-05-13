import email
from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers  import make_password
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



@api_view(['GET'])
def getRoutes(request):
    return Response("Hello")

@api_view(['GET'])
def getProducts(request):
    print(f'Multi query:{request.GET}')
    query = request.GET.get('keyword')
    print('keyword:',query)
    if query == 'null' or query == None:
        query = ''
    print('keyword:',query)

    products = Product.objects.filter(name__icontains=query).order_by('name')
    print(products)
    page = request.GET.get('page')
    paginator = Paginator(products, 10)
    print('page:',page)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    elif page == 'null':
        page = 1
    elif page == 'undefined':
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many= True)
    return Response({'products':serializer.data, 'page':page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gt=2).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many= True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id = pk)
    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id = pk)
    data = request.data

    # 1 Reveiw alredy exist

    alredyExist = product.review_set.filter(user=user).exists()

    if alredyExist:
        content = {
            'detail':'Product alredy reviewed'
        }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0

    elif data['rating'] == 0:
        content = {
            'detail':'Please select rating'
        }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create Reveiw 
    else:
        review = Review.objects.create(
            user=user,
            product= product,
            name=user.first_name,
            rating= data['rating'],
            comment= data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response({'detail':'Review Added'})
        
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price = 0,
        brand = "Sample Brand",
        countInStock = 0,
        category= 'Sample Category',
        description = 'Sample Description...'
    )
    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id = pk)
    product.delete()
    return Response("Product deleted.")

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_id = pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    
    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

