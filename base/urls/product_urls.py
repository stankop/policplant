from django.urls import path
from base.views import product_views as views


urlpatterns = [
    
    path('', views.getProducts, name = 'products'),
    path('getAllProducts/', views.getAllProducts, name = 'getAllproducts'),
    path('categoryProducts/<str:pk>/', views.getProductsByCategoryId, name = 'category_products'),
    path('<str:pk>/reviews', views.createProductReview, name = 'create-review'),

    path('changestate/', views.changeStatusValue, name = 'change_state_value'),
    path('create/', views.createProduct, name = 'create_product'),
    path('upload/', views.uploadImage, name = 'image-upload'),
    path('<str:pk>', views.getProduct, name = 'product'),
    
    path('update/<str:pk>/', views.updateProduct, name = 'update_product'),
    path('delete/<str:pk>', views.deleteProduct, name = 'delete_product'),
    path('carusel/top/', views.getTopProducts, name='top-products'),
    path('allcategories/', views.getAllCategories, name='get_categories'),
    path('categories/', views.getCategories, name='get_categories'),
    path('filter/', views.getFilterProducts, name='get_filter_products'),
    path('filterGornja/', views.getGornjaPretragaProducts, name='get_filter_gornja_products'),
]