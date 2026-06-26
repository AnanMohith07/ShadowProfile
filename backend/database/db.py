import mysql.connector
from mysql.connector import Error
from config import Config

def get_connection():
    """Creates and returns a connection to the MySQL database."""
    try:
        connection = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            port=Config.MYSQL_PORT,
            password=Config.MYSQL_PASSWORD, 
            database=Config.MYSQL_DB            
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Database Connection Error: {e}")
        return None