#pip install mysql-connector-python
import mysql.connector
from mysql.connector import Error

class crud:
    def __init__(self):
        print("Conectando a la base de datos...")
        self.conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="cuenta mdb",
            database="db_academica",
            charset = "utf8",
            collation = "utf8mb4_general_ci",
            port = 33061
        )
        if self.conexion.is_connected():
            print("Conectado")
        else:
            print("No se ha podido conectar")
    def consultar(self, sql):
        cursor = self.conexion.cursor(dictionary=True)
        cursor.execute(sql)
        return cursor.fetchall()
    
    def procesar_consultas(self, sql, valores):
        try:
            cursor = self.conexion.cursor()
            cursor.execute(sql, valores)
            self.conexion.commit()
            #mostrar el resultado de consulta
            
            return "ok"
        except Error as e:
            return str(e)