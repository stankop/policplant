import email
import json
from functools import reduce
from django.shortcuts import render

#from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import PlantImage
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
from django.views.decorators.cache import cache_page


@api_view(['GET'])
def getRoutes(request):
    return Response("Hello")

@api_view(['GET'])
def getAllCategories(request):
    
    categoriess = PlantCategory.objects.all()
    product = Product._meta.get_fields()
    my_model_fields = [field for field in Product._meta.get_fields()]
    for f in my_model_fields:
        if f.name == 'mesto_sadnje':
            mesto_sadnje= [x for (x, y) in f.choices]
        elif f.name == 'vreme_cvetanja':
            vreme_cvetanja= [x for (x, y) in f.choices]
        elif f.name == 'orezivanje':
            orezivanje= [x for (x, y) in f.choices]
        elif f.name == 'place_of_planting':
            place_of_planting= [x for (x, y) in f.choices]
        elif f.name == 'privlaci_insekte':
            privlaci_insekte= [x for (x, y) in f.choices]
        elif f.name == 'brzina_rasta':
            brzina_rasta = [x for (x,y) in f.choices]
        elif f.name == 'type_of_plant':
            type_of_plant = [x for (x,y) in f.choices]
        # elif f.name == 'color':
        #     color = [x for (x,y) in f.choices]
        elif f.name == 'vre_cve':
            vre_cve = [x for (x,y) in f.choices]
    #serializerCategory = PlantCategorySerializer(categoriess, many= True)

    return Response({'place_of_planting': place_of_planting,'brzina_rasta': brzina_rasta,'privlaci_insekte': privlaci_insekte,'orezivanje': orezivanje, 'vre_cve': vre_cve,'mesto_sadnje': mesto_sadnje, 'place_of_planting': place_of_planting, 'type_of_plant': type_of_plant})

@api_view(['GET'])
def getProducts(request):
    query = request.GET.get('keyword')
    
    if query == 'null' or query == None:
        query = ''
    
    products = Product.objects.all().order_by('name')
    print('Broj biljaka je:', len(products))
    #products = Product.objects.filter(name__icontains=query).order_by('name')
    print(products)
    page = request.GET.get('page')
    paginator = Paginator(products, 10)
    
    # try:
    #     products = paginator.page(page)
    # except PageNotAnInteger:
    #     products = paginator.page(1)
    # except EmptyPage:
    #     products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    elif page == 'null':
        page = 1
    elif page == 'undefined':
        page = 1
    elif page == '':
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
    data2 = request.FILES
    user = request.user
    
    product = Product.objects.create(
        user=user,
        name=data['name'],
        botanicki_naziv=data['botanicki_naziv'],
        hesteg=data['hesteg'],
        vre_cve=data['vre_cve'],
        orezivanje=data['orezivanje'],
        privlaci_insekte=data['privlaci_insekte'],
        brzina_rasta=data['brzina_rasta'],
        prezimljava=data['prezimljava'],
        sirina_biljke=data['sirina_biljke'],
        velicina_slanja=data['velicina_slanja'],
        #image='stanko.jpg',
        price = data['price'],
        countInStock =data['countInStock'],
        description = data['description'],
        color=data['color'],
        mesto_sadnje=data['mesto_sadnje'],
        place_of_planting= data['place'],
        type_of_plant=data['type'],
        high=data['high'],
        prodajno_mesto=bool(data['prodajno_mesto']),
        novo = bool(data['novo']),
        popust = data['popust']
    )

    if type(data['category']) == str:
        category = PlantCategory.objects.get(name=data['category'])
        product.category.add(category)
        product.save()
    else:
        for x in data['category']:
            category = PlantCategory.objects.get(name=x)
            product.category.add(category)
            product.save()
    
    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['DELETE'])
#@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id = pk)
    print('Ovo je product:', product)
    if(product):
        product.delete()
        return Response("There is a error.")
    return Response("Product deleted.")

@api_view(['PUT'])
#@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    print('Data', type(data['price']))
    product = Product.objects.get(_id = pk)
    product.category.clear()
    product.save()
    if not isinstance(data['category'], list):
        category  = PlantCategory.objects.get(name__icontains=data['category'])
        product.category.add(category)
        product.save()
    else:
        for x in data['category']:
            category = PlantCategory.objects.get(name=x)
            product.category.add(category)
            product.save()
    product.name = data['name']
    product.botanicki_naziv=data['botanicki_naziv']
    product.hesteg=data['hesteg']
    product.vre_cve=data['vre_cve']
    product.orezivanje=data['orezivanje']
    product.privlaci_insekte=data['privlaci_insekte']
    product.brzina_rasta=data['brzina_rasta']
    product.prezimljava=data['prezimljava']
    product.sirina_biljke=data['sirina_biljke']
    product.velicina_slanja=data['velicina_slanja']
    #product.image=data['image']
    product.price = data['price']
    product.countInStock =data['countInStock']
    product.description = data['description']
    product.color=data['color']
    product.mesto_sadnje=data['mesto_sadnje']
    product.place_of_planting= data['place']
    product.type_of_plant=data['type']
    product.high=data['high']
    product.prodajno_mesto=bool(data['prodajno_mesto'])
    product.novo = bool(data['novo'])
    product.popust = data['popust']
    product.save()


    serilizer = ProductSerializer(product, many = False)
    return Response(serilizer.data)

@api_view(['POST'])
def getFilterProducts(request):
    data = request.data
    color = str(data['color']).lower()
    search = [str(data['color']).lower()]
    if data['color']:
        if 'ž' or 'z' in str(data['color']).lower():
            search.append(str(data['color']).lower())
            search.append(str(data['color']).lower().replace('ž','z'))
            search.append(str(data['color']).lower().replace('z','ž'))

        if 'č' or 'c' in str(data['color']).lower():
            search.append(str(data['color']).lower())
            search.append(str(data['color']).lower().replace('č','c'))
            search.append(str(data['color']).lower().replace('c','č'))
            
        if 'š' or 's' in str(data['color']).lower():
            search.append(str(data['color']).lower())
            search.append(str(data['color']).lower().replace('š','s'))
            search.append(str(data['color']).lower().replace('s','š'))
            
    print('Search:', search)
    
    products = Product.objects.filter((Q(pk__gte=0) if (data['search'] == '' or data['search'] == [] or data['search'] == None) else Q(name__icontains=data['search']) | Q(hesteg__icontains=data['search']))
            & (Q(pk__gte=0) if (data['keyword'] == '' or data['keyword'] == None) else Q(name__icontains=data['keyword']))
            & (Q(pk__gte=0) if (data['color'] == [] or data['color'] == '' or data['color'] == None)  else (reduce(operator.or_,(Q(color__icontains=x) for x in search))))
            & (Q(pk__gte=0) if (data['flow'] == [] or data['flow'] =='' or data['flow'] ==None) else (reduce(operator.or_,(Q(mesto_sadnje__icontains=x) for x in ( y['value'] for y in data['flow'])))))
            & (Q(pk__gte=0) if (data['type'] == [] or data['type'] == '' or data['type'] == None) else (reduce(operator.or_,(Q(type_of_plant__icontains=x) for x in ( y['value'] for y in data['type'])))))
            & (Q(pk__gte=0) if (data['category'] == [] or data['category'] == '' or data['category'] == None) else (reduce(operator.or_,(Q(category__name__icontains=x) for x in ( y['value'] for y in data['category']))))) ).order_by('name')
    print("Final:",products)

   
    serializer = ProductSerializer(products, many= True)
    return Response({'products': serializer.data} )

@api_view(['GET'])
def getProductsByCategoryId(request, pk):
    
    products = PlantCategory.objects.get(pk=pk).products.order_by('name')
    print('Broj biljaka po Categoriji je:', len(products))
    #products = Product.objects.filter(name__icontains=query).order_by('name')
    print('Products:', products)

    serializer = ProductSerializer(products, many= True)
    return Response({'products': serializer.data })

@api_view(['POST'])
def changeStatusValue(request):
    data = request.data
    message = ''
    try:
        product_id = int(data['product_id'])
        value = int(data['value'])
        product = Product.objects.get(_id = product_id)
        product.countInStock = value
        product.save()
    except Product.DoesNotExist:
        return Response({message:'Greska u upitu podataka'})
    except Exception as e:
        return Response({ message: 'Neka druga greska'})
    

    
    return Response({message: 'Uspesno izmena stanja' })


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    
    images_data = json.loads(data['items'])
    images = request.FILES.getlist('images')

    product = Product.objects.get(_id=product_id)

    PlantImage.objects.filter(product_id=product_id).exclude(image__in=[x['name'] for x in images_data]).delete()

    if images:
        for image in images:
            if image.name in [x['name'] for x in images_data]:
                PlantImage.objects.create(product=product , image=image, order=0)

    

    current_images = PlantImage.objects.filter(product_id=product_id)
    for index, image_name in enumerate([x['name'] for x in images_data]):
        print('image:',image_name)
        
        try:
            product_image = current_images.filter(image__icontains=image_name.split('.')[0]).first()
        except PlantImage.DoesNotExist:
            product_image = None
        if product_image:
            product_image.order = index
            product_image.save()

    # if not request.FILES.getlist('images'):
    #     imagesStay=[]
    #     if request.data.get('images', False):
    #         imagesStay = [int(x) for x in str(data['images']).split(',')]
        
    #     PlantImage.objects.filter(product_id=product_id).exclude(id__in=imagesStay).delete()
    #     for index, image_id in enumerate(imagesStay):
    #         stay_image = PlantImage.objects.get(id=image_id)
    #         if not PlantImage.DoesNotExist:
    #             pass
    #         stay_image.order = index
    #         stay_image.save()

    # else:
    #     #PlantImage.objects.filter(product_id = product_id).delete()
    #     images = request.FILES.getlist('images')
       
    #     for index, image in enumerate(images):
    #         PlantImage.objects.create(product=product , image=image, order=index)
    product.save()
    return Response(data={'message':'Image was uploaded'})

