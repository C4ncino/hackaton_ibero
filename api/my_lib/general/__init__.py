"""
General functions
"""
# flake8: noqa
from .general import validate, crud_template, is_none
from my_lib.database import DatabaseInterface

database = DatabaseInterface()

URI = '/api/v1/'