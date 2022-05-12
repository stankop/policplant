from django.urls import path
from base.views import user_views as views
from django.contrib.auth import views as auth_views


urlpatterns = [
    
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name = 'user-profile'),
    
    path('register/', views.registerUser, name = 'register'),
    path('profile/update/', views.updateUserProfile, name = 'user-profile-update'),
    path('', views.getUsers, name = 'users'),
    path('<str:pk>/', views.getUserById, name = 'user-update'),
    path('update/<str:pk>/', views.updateUser, name = 'get-user'),
    path('delete/<str:pk>/', views.deleteUser, name = 'user-delete'),
]