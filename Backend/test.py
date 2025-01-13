import mysql.connector

try:
    connection = mysql.connector.connect(
        user='testUser',
        password='testUserPassword',
        host='localhost',
        database='trivia_data'
    )
    print("Connected successfully!")
except Exception as e:
    print(f"Error: {e}")
