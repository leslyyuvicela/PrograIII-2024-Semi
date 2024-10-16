import crud_academico
db = crud_academico.crud()

class crud_usuario:
    def consultar(self):
        #return db.consultar("SELECT * FROM alumnos WHERE nombre like '%" + buscar["buscar"] + "%'")
        return db.consultar("SELECT * FROM usuarios")

    def administrar(self, datos):
        sql = """
            INSERT INTO usuarios (usuario, clave, nombre, direccion, telefono)
            VALUES (%s, %s, %s, %s, %s) 
        """
        valores = (datos["usuario"], datos["clave"], datos["nombre"], datos["direccion"], datos["telefono"])
        if(datos["accion"] == "nuevo"):	
            sql = """
                INSERT INTO usuarios (usuario, clave, nombre, direccion, telefono)
                VALUES (%s, %s, %s, %s, %s) 
            """
            valores = (datos["usuario"], datos["clave"], datos["nombre"], datos["direccion"], datos["telefono"])
        elif(datos["accion"] == "modificar"):
            sql = """
                UPDATE usuarios
                    SET usuario = %s, clave = %s, nombre = %s, direccion = %s, telefono = %s
                WHERE idUsuario = %s
            """
            valores = (datos["usuario"], datos["clave"], datos["nombre"], 
                    datos["direccion"], datos["telefono"], datos["idUsuario"])
        elif(datos["accion"] == "eliminar"):
            sql = """
                DELETE FROM usuarios
                WHERE idUsuario = %s
            """
            valores = (datos["idUsuario"],)
        return db.procesar_consultas(sql, valores)