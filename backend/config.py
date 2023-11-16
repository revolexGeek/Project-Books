"""
Настройка конфигурации для запуска
"""
import os

# db_user = "crawler"
# db_password = "{!fl4g_3nv_1s_b3tt3r}"
# db_server = "database"
# db_name = "books"

db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")
db_server = os.environ.get("DB_SERVER")
db_name = os.environ.get("DB_NAME")

scrapy_start_location = os.environ.get("SCRAPY_START_LOCATION")
# scrapy_start_location = r"C:\\Users\\revolex\\Desktop\\books\\books"
# import os
#
# db_user = os.getenv("DB_USER", "postgres")
# db_password = os.getenv("DB_PASSWORD", "{th4ts_c00l!}")
# db_server = os.getenv("DB_SERVER", "localhost")
# db_name = os.getenv("DB_NAME", "books")
