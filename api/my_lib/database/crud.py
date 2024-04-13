from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import os
import json

from .clash import Clash
from .example import Example
from .game_question import Game_Question
from .game import Games
from .paragraph import Paragraph
from .question import Questions
from .shortcut_game import Shortcut_Game
from .shortcut import Shortcuts
from .user import User
from .level import Level
from .queue import Queue
from .clash_question import Clash_Question

from .base import Base

TABLE_CLASS_MAP = {
     'clash': Clash,
     'example': Example,
     'game_question': Game_Question,
     'games': Games,
     'level': Level,
     'paragraph': Paragraph,
     'questions': Questions,
     'shortcut_game': Shortcut_Game,
     'shortcuts': Shortcuts,
     'user': User,
     'queue': Queue,
     'clash_questions': Clash_Question
}

class DB_interface:
     def __init__(self) -> None:
          db_url = os.getenv('DB_URL')
          db_name = os.getenv('DB_NAME')
          db_user = os.getenv('DB_USER')
          db_password = os.getenv('DB_PASSWORD')
          db_type = os.getenv('DB_TYPE')
          
          self.db_url = ''

          if db_url != '':
               self.db_url = db_url
          else:
               if db_type == '0':
                    self.db_url = f"postgresql://{db_user}:{db_password}@localhost/{db_name}"
               elif db_type == '1':
                    self.db_url = f"postgresql+psycopg2://{db_user}:{db_password}@localhost/{db_name}"

          print(self.db_url)
          self.engine = create_engine(self.db_url, echo=False)

          Session = sessionmaker(bind=self.engine)
          
          self.session = Session()

          Base.metadata.create_all(self.engine)

          data = self.session.query(Questions).all()

          if len(data) == 0:
               with open('data_dump.json', 'r') as f:
                    data = json.load(f)

               for question in data["questions"]:
                    self.session.add(Questions(**question))
               
               for level in data["levels"]:
                    self.session.add(Level(**level))
               self.session.commit()

               for shortcut in data["shortcuts"]:
                    self.session.add(Shortcuts(**shortcut))

               for paragraph in data["paragraphs"]:
                    self.session.add(Paragraph(**paragraph))
               
               for example in data["examples"]:
                    self.session.add(Example(**example))

               self.session.commit()

     # --- Create -----------
     def crate_table_row(self, table_name, row_info):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               row = table_class(**row_info)
               self.session.add(row)
               self.session.commit()

               return True, row

          return False, None
     

     # --- Read -------------
     def read_all_table(self, table_name):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               data = self.session.query(table_class).all()

               return data if len(data) > 0 else []


     def read_by_id(self, table_name, id):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               data = self.session.query(table_class).filter(table_class.Id == id).first()
               return data
     

     def read_level(self, prestige):
          data = self.session.query(Level).filter(
               Level.MinimumPrestige <= prestige
          ).filter(
               Level.MaximumPrestige >= prestige
          ).first()

          return data     

     
     def read_all_by_foreign_key(self, table_name, column_name, id):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               data = self.session.query(table_class).filter_by(column_name = id)

               return data if len(data) > 0 else []


     # --- Update -----------
     def update_table_row(self, table_name, id, row_info):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               data = self.session.query(table_class).filter(table_class.Id == id).first()

               for key, value in row_info.items():
                    setattr(data, key, value)
               self.session.commit()

               return data


     # --- Delete -----------
     def delete_table_row(self, table_name, id):
          table_class = TABLE_CLASS_MAP.get(table_name.lower())

          if table_class:
               try: 
                    data = self.session.query(table_class).filter(table_class.Id == id).first()
                    self.session.delete(data)
                    self.session.commit()
               
                    return True
               
               except:
                    return False


     def try_login(self, username, password) -> tuple[bool, User]:
          user = self.session.query(User).filter(User.Username == username).filter(User.Password == password).first()

          if user != None:
               return True, user
          else:
               return False, user


     def exist_user(self, username) -> bool:
          user = self.session.query(User).filter(User.Username == username).first()

          return user != None

# crate_Table('level', **{'Name': 'Bronce', 'MinimumPrestige': 0, 'MaximumPrestige': 100})