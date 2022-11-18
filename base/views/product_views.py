import email
from functools import reduce
from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import PlantCategorySerializer
from base.models import PlantCategory
from base.models import Product
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers  import make_password
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist
import operator
from django.db.models import Q


@api_view(['GET'])
def getRoutes(request):
    return Response("Hello")

@api_view(['GET'])
def getAllCategories(request):
    
    categoriess = PlantCategory.objects.all()
    product = Product._meta.get_fields()
    my_model_fields = [field for field in Product._meta.get_fields()]
    for f in my_model_fields:
        if f.name == 'flowering_time':
            flowering_time= [x for (x, y) in f.choices]
        elif f.name == 'vreme_cvetanja':
            vreme_cvetanja= [x for (x, y) in f.choices]
        elif f.name == 'orezivanje':
            orezivanje= [x for (x, y) in f.choices]
        elif f.name == 'place_of_planting':
            place_of_planting= [x for (x, y) in f.choices]
        elif f.name == 'prezimljava':
            prezimljava= [x for (x, y) in f.choices]
        elif f.name == 'privlaci_insekte':
            privlaci_insekte= [x for (x, y) in f.choices]
        elif f.name == 'brzina_rasta':
            brzina_rasta = [x for (x,y) in f.choices]
        elif f.name == 'type_of_plant':
            type_of_plant = [x for (x,y) in f.choices]
        elif f.name == 'color':
            color = [x for (x,y) in f.choices]
    serializerCategory = PlantCategorySerializer(categoriess, many= True)

    return Response({'categories': serializerCategory.data,'place_of_planting': place_of_planting,'prezimljava': prezimljava,'brzina_rasta': brzina_rasta,'privlaci_insekte': privlaci_insekte,'orezivanje': orezivanje,'vreme_cvetanja': vreme_cvetanja, 'flowering_time': flowering_time, 'place_of_planting': place_of_planting, 'type_of_plant': type_of_plant, 'color':color})

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
    return Response({'products': serializer.data, 'page':page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getCategories(request):
    
    categories = PlantCategory.objects.all()
    serializer = PlantCategorySerializer(categories, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.all()[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist as e:
        return Response(data={"detail":f"Ne postoji product sa ID: {pk}"}, status=status.HTTP_404_NOT_FOUND)
   
    

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
        # review = Review.objects.create(
        #     user=user,
        #     product= product,
        #     name=user.first_name,
        #     rating= data['rating'],
        #     comment= data['comment']
        # )
        # reviews = product.review_set.all()
        product.numReviews = len(10)

        total = 0
        for i in 10:
            total += i.rating
        product.rating = total / len(10)
        product.save()
        return Response({'detail':'Review Added'})
        
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data= request.data
    user = request.user
    category= PlantCategory.objects.get(name=data['category'])
    product = Product.objects.create(
        user=user,
        name=data['name'],
        image=data['image'],
        price = data['price'],
        brand = data['brand'],
        countInStock =data['countInStock'],
        description = data['description'],
        color=data['color'],
        flowering_time=data['flow'],
        place_of_planting= data['place'],
        type_of_plant=data['type'],
        high=data['high'],
        category=category
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
    product.color = data['color']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    
    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['POST'])
def getFilterProducts(request):
    data = request.data
    print('data:',data)

    products = Product.objects.filter((Q(pk__gte=0) if data['search'] == '' else (Q(name__icontains=data['search']) or Q(hesteg__icontains=data['search'])))
            & (Q(pk__gte=0) if (data['color'] == [] or data['color'] == '')  else (reduce(operator.or_,(Q(color__icontains=x) for x in ( y['value'] for y in data['color'])))))
            & (Q(pk__gte=0) if (data['flow'] == [] or data['flow'] =='') else (reduce(operator.or_,(Q(flowering_time__icontains=x) for x in ( y['value'] for y in data['flow'])))))
            & (Q(pk__gte=0) if (data['high'] == [] or data['high'] =='') else (reduce(operator.or_,(Q(high__icontains=x) for x in ( y['value'] for y in data['high'])))))
            & (Q(pk__gte=0) if (data['type'] == [] or data['type'] == '') else (reduce(operator.or_,(Q(type_of_plant__icontains=x) for x in ( y['value'] for y in data['type'])))))
            & (Q(pk__gte=0) if (data['category'] == [] or data['category'] == '') else (reduce(operator.or_,(Q(category__name__icontains=x) for x in ( y['value'] for y in data['category']))))) ).order_by('name')
    print("Final:",products)

   
    serializer = ProductSerializer(products, many= True)
    return Response({'products': serializer.data} )


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

