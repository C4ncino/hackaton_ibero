"""
Generate a random JWT secret key
"""

import os

# Generar una clave secreta aleatoria
secret_key = os.urandom(24)

# Imprimir la clave secreta
print(secret_key.hex())
