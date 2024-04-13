from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from .base import Base


class EmergencyContact(Base):
    """
    EmergencyContact Model
    """

    __tablename__ = 'emergency_contacts'

    Id = Column(Integer(), primary_key=True)
    IdUser = Column(Integer(), ForeignKey('users.Id'), nullable=False)
    Name = Column(String(20), nullable=False)
    LastName = Column(String(30), nullable=False)
    Relation = Column(String(20), nullable=False)
    PhoneNumber = Column(String(10), nullable=False)
    Email = Column(String(50), default="")
    CreationDate = Column(TIMESTAMP(), nullable=False, default=dt.now())

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "IdUser": self.IdUser,
            "Name": self.Name,
            "LastName": self.LastName,
            "Relation": self.Relation,
            "Email": self.Email,
            "PhoneNumber": self.PhoneNumber,
        }, self.Id
