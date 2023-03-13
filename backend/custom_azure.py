from storages.backends.azure_storage import AzureStorage

class AzureMediaStorage(AzureStorage):
    account_name = 'policplantblob' # <storage_account_name>
    account_key = 'ZCAcsEMU3Bt5ri5qOzQ2eovSAN3n3yQ+Wjo34ebazn39/xIYz0yHy6XVyKktxgZNyQmHSCARM26I+AStZ9tAwg==' # <storage_account_key>
    azure_container = 'policplant-container'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'djangoaccountstorage' # <storage_account_name>
    account_key = 'your_key_here' # <storage_account_key>
    azure_container = 'static'
    expiration_secs = None