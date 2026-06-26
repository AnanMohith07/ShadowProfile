from database.db import get_connection


class UserModel:

    @staticmethod
    def create_user(full_name, email, password_hash):
        connection = get_connection()
        if connection is None:
            return False
        cursor = connection.cursor()
        query = """
            INSERT INTO users
            (full_name, email, password_hash)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (full_name, email, password_hash))
        connection.commit()
        cursor.close()
        connection.close()
        return True
    

    @staticmethod
    def get_user_by_email(email):
        connection = get_connection()
        if connection is None:
            return None
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT *
            FROM users
            WHERE email=%s
        """
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        return user
    

    @staticmethod
    def get_user_by_id(user_id):
        connection = get_connection()
        if connection is None:
            return None
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT *
            FROM users
            WHERE user_id=%s
        """
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        return user